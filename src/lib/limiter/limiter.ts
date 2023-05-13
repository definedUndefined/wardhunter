import axios from "axios";
import { Bucket } from "./bucket";
import { Parser } from "./parser";
import type { Region } from "@/lib/constants/platforms";
import type { RiotResponseHeaders, ScheduleParams } from "./types";

/**
 * Riot API rate limiter.
 * 
 * @todo Add explicit error handling.
 * 
 * @note
 * This class is used to limit the rate of requests to the Riot API.
 * - The limits are based on the headers that are returned by the Riot API.
 * - Requests are throttled using the [bottleneck](https://www.npmjs.com/package/bottleneck) package.
 * - The fist request to the Riot API will be sent without any rate limit, the following requests will be limited based on the headers.
 * - Requests will be retried up to 3 times if the service rate limit is exceeded, and once otherwise.
 * - Request that have been limited by an entity does not affect the rate limit of other entities.
 * e.g. If the application rate limit is exceeded for a given region, other regions queues will not be affected.
 * 
 * @see [Riot Documentation](https://hextechdocs.dev/rate-limiting/)
 */
export class RateLimiter {
    private cache = new Map<Region, Bucket>();

    /**
     * Gets the bucket for the given region.
     */
    private getBucket(region: Region): Bucket {
        if (this.cache.has(region)) {
            // Typescript, why is this cast necessary?
            return this.cache.get(region) as Bucket;
        }

        const bucket = new Bucket();

        this.cache.set(region, bucket);

        return bucket;
    }

    /**
     * Queues a request to the Riot API.
     * 
     * @param params Request options with the region and endpoint to request.
     * 
     * @returns The response data.
     * 
     * @throws {AxiosError} If the request fails.
     * 
     * @note Retries requests up to 3 times if the service rate limit is exceeded, and once otherwise.
     * @note Request that have been limited by an entity does not affect the rate limit of other entities.
     * 
     * @example
     * ```ts
     * const response = await rateLimiter.schedule({
     *    region: "euw1",
     *    endpoint: "summoner-v4.getSummonerByName",
     *    url: "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/wardhunter",
     * });
     * 
     * console.log(response);
     * ```
     */
    public async schedule<D = unknown>(params: ScheduleParams<D>) {
        const { region, endpoint, ...axiosConfig } = params;

        const bucket = this.getBucket(region);
        const methodLimiter = bucket.getMethodLimiter(endpoint);

        const response = await methodLimiter.schedule(() => axios.request<D>(axiosConfig));
        const headers = response.headers as RiotResponseHeaders;

        const { appLimits, methodLimits } = Parser.parseRiotHeaders(headers);

        bucket.setRegionLimits(appLimits);

        bucket.setMethodLimits(endpoint, methodLimits);

        return response;

    }
}