import type { AxiosRequestConfig } from 'axios';
import type { Region } from '@/lib/constants/platforms';

export type RateLimitType = "application" | "method" | "service";

export type RateLimit = {
    count: number;
    window: number;
}

export type RiotResponseHeaders = {
    /**
     * Included in any 429 response where the rate limit was enforced by the API infrastructure. 
     * Not included in any 429 response where the rate limit was enforced by the underlying service to which the request was proxied.
     */
    'x-rate-limit-type'?: RateLimitType,
    /**
     * Included in any 429 response where the rate limit was enforced by the API infrastructure. 
     * Not included in any 429 response where the rate limit was enforced by the underlying service to which the request was proxied.
     */
    'retry-after'?: string,
    /**
     * Included in the response for all API calls that enforce an application rate limit.
     * @see [Application Rate Limit Headers](https://github.com/CommunityDragon/HexDocs/blob/master/lol/riotapi/rate-limiting.md#application-headers)
     */
    'x-app-rate-limit': string,
    /**
     * Included in the response for all API calls that enforce a method rate limit.
     * @see [Application Rate Limit Headers](https://github.com/CommunityDragon/HexDocs/blob/master/lol/riotapi/rate-limiting.md#application-headers)
     */
    'x-app-rate-limit-count': string,
    /**
     * Included in the response for all API calls that enforce a method rate limit.
     * @see [Method Rate Limit Headers](https://github.com/CommunityDragon/HexDocs/blob/master/lol/riotapi/rate-limiting.md#method-headers)
     */
    'x-method-rate-limit': string,
    /**
     * Included in the response for all API calls that enforce a method rate limit.
     * @see [Method Rate Limit Headers](https://github.com/CommunityDragon/HexDocs/blob/master/lol/riotapi/rate-limiting.md#method-headers)
     */
    'x-method-rate-limit-count': string,
}

export type ScheduleParams<D = unknown> = AxiosRequestConfig<D> & {
    region: Region;
    endpoint: string;
}