import type { Platform, Region } from "./constants/platforms";
import type { SuperJSONObject, JSONObject } from "superjson/dist/types";

export type { SuperJSONObject, JSONObject }

/**
 * Endpoint Template - the path of the riot API endpoint
 */
export type EndpointTemplate = `/${string}`

/**
 * Riot API Base URL - the base URL of the riot API
 * 
 * Must contain a __{region}__ placeholder
 */
export type RiotApiBaseURL = `https://${string}{region}${string}`;

/**
 * Template - the full URL of the riot API endpoint
 */
export type Template =  `${RiotApiBaseURL}${EndpointTemplate}`;

/**
 * Data Transfer Object - the data received from the API
 */
export type DTO = JSONObject | JSONObject[]

/**
 * Data Access Object - the data stored in the database
 */
export type DAO = SuperJSONObject | SuperJSONObject[]

/**
 * JSON with Routing - a JSON object with a region property
 */
export type JsonWithRouting = JSONObject & {
    region: Platform | Region;
}

/**
 * Date Fields - the fields of a generic type that are dates
 */
export type DateFields<T> = T extends Array<infer U> ? DateFields<U> : {
    [K in keyof T]: T[K] extends Date ? K : never;
}[keyof T];


/**
 * Require All or None - require all or none of the given keys
 * 
 * @see [Type Fest Library](https://github.com/sindresorhus/type-fest/blob/main/source/require-all-or-none.d.ts)
 */
export type RequireAllOrNone<ObjectType, KeysType extends keyof ObjectType = never> = (
	| Required<Pick<ObjectType, KeysType>>
	| Partial<Record<KeysType, never>> 
) &
Omit<ObjectType, KeysType>;