import moment from "moment";
import { isRegion, getRegion } from "./constants/platforms";
import type { AbstractModule } from "./modules/abstract";
import type { DTO, DAO, EndpointTemplate, JsonWithRouting, DateFields, Template } from "./types";

/**
 * Decorator used to mark a method as an endpoint.
 * 
 * This decorator will handle the following:
 * - Caching
 * - Rate limiting
 * - Region routing
 * 
 * @param template Riot API endpoint template. This template will be resolved using the `params` object.
 * @param options (Optional) expiration params. If provided, the decorator will check if the cached data is still valid.
 * @param options.expiry The expiration time in seconds.
 * @param options.field The field to check for expiration. This field must be a `Date` object of the DAO.
 * 
 * @remarks
 * The `params` properties will be used to resolve the template. An error will be thrown if a property from the template is missing.
 * 
 * The `params` object must contain a `region` property. This property will be used to route the request to the correct region.
 * 
 * If data needs to be stored, the `params` object will be passed to the `store` method as the second argument.
 * 
 * @example
 * 
 * ```ts
 * // With no expiration time
 * .@endpoint("/lol/summoner/v4/summoners/by-name/{summonerName}")
 * async getSummonerByName({ summonerName, region }: SummonerByNameParams) {
 *     // get the data from the database
 * }
 * 
 * // With expiration time (24 hours)
 * .@endpoint("/lol/summoner/v4/summoners/by-name/{summonerName}", { expiry: 60 * 60 * 24, field: "revisionDate" })
 * async getSummonerByName({ summonerName, region }: SummonerByNameParams) {
 *    // get the data from the database
 * }
 * ```
 */
export function endpoint<
    R extends DAO,
    M extends AbstractModule<DTO, R>,
    K extends keyof M
>(
    template: EndpointTemplate,
    options?: {
        expiry: number;
        field: DateFields<R>
    }
) {
    return function decorator<P extends JsonWithRouting>(
        _target: M,
        endpoint: K,
        descriptor: M[K] extends (params: P, ...inputs: infer U) => Promise<R | null>
            ? TypedPropertyDescriptor<(params: P, ...inputs: U) => Promise<R | null>>
            : never
    ) {
        const originalHandler = descriptor.value;

        if (!originalHandler) {
            throw new Error("Endpoint handler not found.");
        }

        descriptor.value = async function (this: M, params: P, ...inputs: unknown[]): Promise<R | null> {

            /* ------------------------------- Cache logic ------------------------------ */

            const cached = await originalHandler.call(this, params, ...inputs);

            if (cached && !options) {
                return cached;
            }

            if (cached && options) {
                const { expiry, field } = options;

                if (Array.isArray(cached)) {
                    const shouldRevalidate = cached.some((item) => {
                        const date = item[field] as Date;
                        return moment(date).add(expiry, "seconds").isBefore(moment());
                    });

                    if (!shouldRevalidate) {
                        return cached;
                    }
                } else {
                    const date = cached[field] as Date;
                    const shouldRevalidate = moment(date).add(expiry, "seconds").isBefore(moment());

                    if (!shouldRevalidate) {
                        return cached;
                    }
                }
            }

            /* ------------------------------ Cache miss ------------------------------- */

            const templateURL = this.baseURL.concat(template) as Template;
            const url = this.resolveTemplate(templateURL, params);

            const region = isRegion(params.region) ? params.region : getRegion(params.region);

            try {
                const response = await this.request<DTO>({
                    url,
                    region,
                    endpoint: endpoint.toString(),
                })

                const data = response.data;

                return await this.store(data, params);

            } catch (error) {
                console.error(error)
                return cached;
            }
        }
    }
}