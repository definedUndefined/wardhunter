import type { default as RateLimiter } from "@/lib/limiter";
import type { RiotApiBaseURL, JSONObject } from "@/lib/types";
import type { Region, Platform } from "@/lib/constants/platforms";

/**
 * Module constructor parameters
 */
export type ModuleConstructorParams = {
    ratelimiter: RateLimiter;
    apikey: string;
    baseURL?: RiotApiBaseURL;
}

/**
 * Region routing params for any endpoint
 */
export type RegionRouting<T extends JSONObject = Record<string, never>> = T & {
    region: Region;
}

/**
 * Platform routing params for any endpoint
 */
export type PlatformRouting<T extends JSONObject = Record<string, never>> = T & {
    region: Platform;
}