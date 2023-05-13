import axios from "axios";
import Bottleneck from "bottleneck";
import type { RateLimit, RateLimitType, RiotResponseHeaders } from "./types";

/**
 * A bucket is a collection of limiters for a specific region.
 * 
 * Each bucket has a region limiter and a method limiter for each endpoint.
 * 
 * The region limiter is chained to each method limiter to ensure that the region limiter is always used first.
 */
export class Bucket {
    private regionLimiter: Bottleneck;
    private methodLimiters: Bottleneck.Group;

    constructor() {
        // Create the region limiter and set the riot limit handler.
        this.regionLimiter = new Bottleneck({
            maxConcurrent: 1,
            minTime: 1000 / 20,
        });

        this.setRiotLimitHandler(this.regionLimiter, "application");

        // Create the method limiters and set the riot limit handler.
        this.methodLimiters = new Bottleneck.Group({
            maxConcurrent: 1,
            minTime: 1000 / 20,
        });

        this.methodLimiters.on('created', (limiter) => {
            limiter.chain(this.regionLimiter);
            this.setRiotLimitHandler(limiter, "method");
        });
    }

    /**
     * Gets the bucket's method limiter for the given endpoint.
     */
    public getMethodLimiter(endpoint: string): Bottleneck {
        return this.methodLimiters.key(endpoint);
    }

    /**
     * Gets the bucket's region limiter.
     */
    public getRegionLimiter(): Bottleneck {
        return this.regionLimiter;
    }

    /**
     * Updates the method limiter with the given limits.
     * 
     * @param endpoint Key for the method limiter.
     * @param limits Method Rate limits from the Riot API headers.
     * 
     * @note The limit with the smallest window size is used.
     * As there is almost alway only one limit per endpoint, this is not a problem.
     * However, be aware that if there are multiple limits, this can be break on larger windows.
     */
    public setMethodLimits(endpoint: string, limits: RateLimit[]) {
        if(limits.length === 0) return;

        const methodLimiter = this.getMethodLimiter(endpoint);

        const { count, window } = limits.reduce((prev, curr) => prev.window < curr.window ? prev : curr);

        methodLimiter.updateSettings({
            maxConcurrent: 1,
            reservoir: count,
            reservoirRefreshAmount: count,
            reservoirRefreshInterval: window * 1000,
        });

        this.syncMethodLimiter(endpoint);
    }

    /**
     * Updates the region limiter with the given limits.
     * 
     * @param limits App Rate limits from the Riot API headers.
     */
    public setRegionLimits(limits: RateLimit[]) {
        if(limits.length === 0) return;

        this.regionLimiter = limits
        // sort limits by window size
        .sort((a, b) => a.window - b.window)
        // create a limiter for each limit
        .map(({ count, window }) => new Bottleneck({
            maxConcurrent: 1,
            reservoir: count,
            reservoirRefreshAmount: count,
            reservoirRefreshInterval: window * 1000,
        }))
        // chain limiters together
        .reduce((prev, curr) => prev.chain(curr));

        this.setRiotLimitHandler(this.regionLimiter, "application");
    }

    /**
     * Synchronize the target method limiter with the current bucket region limiter.
     * 
     * This is necessary to ensure that the method limiter is always chained to the region limiter.
     * 
     * @param endpoint Key for the method limiter.
     */
    public syncMethodLimiter(endpoint: string) {
        const methodLimiter = this.getMethodLimiter(endpoint);

        methodLimiter.chain(undefined);
        methodLimiter.chain(this.regionLimiter);
    }

    /**
     * Sets the riot limit handler for the given limiter.
     * 
     * This method should be called after a limiter is created to ensure that riot rate limit errors are handled correctly.
     * 
     * @param limiter Target limiter.
     * @param type Either __"application"__, __"method"__, or __"service"__. Used to determine which rate limit should be handled by the limiter.
     * 
     * @note This method retries requests up to 3 times if the service rate limit is exceeded, and once otherwise.
     */
    private setRiotLimitHandler(limiter: Bottleneck, type: RateLimitType) {
        limiter.on('failed', (error, info) => {
            // If the error is not an axios error, ignore it.
            if (!axios.isAxiosError(error)) {
                return;
            }
    
            const { retryCount } = info;
    
            const headers = error.response?.headers as RiotResponseHeaders
    
            const {
                'x-rate-limit-type': rateLimitType,
                'retry-after': retryAfter,
            } = headers;
    
            // Exponential backoff if retry-after header is not defined
            const wait = retryAfter ? parseInt(retryAfter) * 1000 : 2 ** retryCount * 1000;
    
            // Is current limiter concerned with the rate limit type that was exceeded?
            const currentLimiterTypeExceeded = rateLimitType === type;
    
            // If the application or method rate limit was exceeded, retry the request once.
            if (retryCount === 0 && currentLimiterTypeExceeded) {
                return wait;
            }
    
            // If the service rate limit was exceeded, retry the request up to 3 times.
            if (retryCount < 3 && rateLimitType === "service") {
                return wait;
            }
        })
    }
}