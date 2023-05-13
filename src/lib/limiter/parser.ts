import type { RiotResponseHeaders, RateLimit } from "./types";

/**
 * Parser for the Riot API rate limit headers.
 */
export class Parser {
    /**
     * Parses the Riot API rate limit headers.
     * 
     * @param headers The headers from the Riot API response.
     * 
     * @returns An object containing the parsed rate limits.
     */
    public static parseRiotHeaders(headers: RiotResponseHeaders) {
        const {
            "x-app-rate-limit": appLimitsValue,
            "x-method-rate-limit": methodLimitsValue,
        } = headers;

        return {
            appLimits: Parser.parseRiotValue(appLimitsValue),
            methodLimits: Parser.parseRiotValue(methodLimitsValue),
        }
    }

    /**
     * Parses the Riot API rate limit header value.
     * 
     * @param value The value of the header.
     * @throws Error if the header is not in the correct format (e.g. "20:1,100:120")
     * 
     * @returns An array of RateLimit objects.
     */
    public static parseRiotValue(value: string) {
        const isValidFormat = (s: string): boolean => {
            const regex = /^(\d+:\d+,)*\d+:\d+$/;
            return regex.test(s);
        }

        if (!isValidFormat(value)) {
            throw new Error(`Invalid header format: ${value}`);
        }

        const limits = value.split(',').map((limit) => {
            const [count, window] = limit.split(':').map(Number);
            return { count, window };
        });

        return limits as RateLimit[];
    }
}