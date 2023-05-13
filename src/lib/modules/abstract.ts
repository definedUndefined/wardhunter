import type { DTO, DAO, JSONObject, RiotApiBaseURL, Template } from "@/lib/types";
import type { default as RateLimiter, ScheduleParams } from "@/lib/limiter";
import type { ModuleConstructorParams } from "./types";

/**
 * Abstract class used to create modules for the riot API
 * 
 * This class is used to define the `endpoint` decorator properly.
 * 
 * @typeParam T - DTO type received from the API
 * @typeParam D - DAO type stored in the database
 */
export abstract class AbstractModule<
    T extends DTO,
    D extends DAO
> {
    readonly ratelimiter: RateLimiter;
    readonly apikey: string;
    readonly baseURL: RiotApiBaseURL = "https://{region}.api.riotgames.com";

    constructor(params: ModuleConstructorParams) {
        this.ratelimiter = params.ratelimiter;
        this.apikey = params.apikey;

        if (params.baseURL) {
            this.baseURL = params.baseURL;
        }
    }

    /**
     * Base request method used to make requests to the riot API
     * 
     * @param params - the request parameters with routing value
     * 
     * @returns Axios response
     */
    public async request<D = unknown>(params: ScheduleParams<D>) {
        return this.ratelimiter.schedule<D>({
            ...params,
            headers: { "X-Riot-Token": this.apikey },
        })
    }

    /**
     * Abstract method used to store data in the database
     * 
     * @param data DTO data from the API
     * @param params Any additional parameters
     * 
     * @returns DAO data that has been stored in the database
     */
    public abstract store(data: T, params: JSONObject): Promise<D | null>;

    /**
     * Utility method used to resolve a template with parameters
     * 
     * @param template full URL template to resolve
     * @param params template parameters
     * 
     * @returns resolved template
     * 
     * @throws Error if a parameter is missing
     */
    public resolveTemplate(template: Template, params: JSONObject): string {
        return template.replace(/{\s*\w+\s*}/g, (match) => {
            const identifier = match.replace(/\s/g, "").slice(1, -1);

            if (!(identifier in params)) {
                throw new Error(`Missing parameter ${identifier}`);
            }

            const value = params[identifier];

            return typeof value === "string" ? value : JSON.stringify(value);
        })
    }
}