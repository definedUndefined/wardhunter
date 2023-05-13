import { env } from '@/env.mjs';
import RateLimiter from './limiter';
import SummonerModule from './modules/summoner';
import MatchModule, { type MatchlistOptions, type MatchDAO } from './modules/match';
import MasteryModule from './modules/mastery';
import LeagueModule from './modules/league';
import DDragon from './modules/ddragon';
import { SummonerNotFoundException } from './exceptions';
import { getPlatform, type Region } from './constants/platforms';
import type { RiotApiBaseURL } from './types';

/**
 * WardHunterClient class
 * 
 * This class is the main entry point for the WardHunter API client.
 * 
 * It contains all the modules and the rate limiter.
 * 
 * @note RIOT_API_KEY environment variable is required to use this client.
 * 
 * @example
 * ```ts
 * const client = new WardHunterClient()
 * 
 * const summoner = await client.summoner.getSummonerByName({
 *   summonerName: "WardHunter",
 *   region: "euw1",
 * })
 * 
 * const matchlist = await client.match.getMatchlistByPuuid({
 *   puuid: summoner.puuid,
 *   region: "europe",
 * })
 * 
 * const matchs = await Promise.all(
 *   matchlist.map(matchId => client.match.getMatchById({
 *      matchId,
 *      region: "europe",
 *   })
 * )
 * 
 * ```
 */
export class WardHunterClient {
    // Rate limiter
    private readonly ratelimiter: RateLimiter = new RateLimiter();

    // Static modules
    public readonly ddragon: DDragon = new DDragon();

    // Modules
    public readonly summoner: SummonerModule;
    public readonly match: MatchModule;
    public readonly mastery: MasteryModule;
    public readonly league: LeagueModule;

    // Initialize modules
    constructor(baseURL?: RiotApiBaseURL) {
        const moduleParams = {
            ratelimiter: this.ratelimiter,
            apikey: env.RIOT_API_KEY,
            baseURL,
        }

        this.summoner = new SummonerModule(moduleParams);
        this.match = new MatchModule(moduleParams);
        this.mastery = new MasteryModule(moduleParams);
        this.league = new LeagueModule(moduleParams);
    }

    /**
     * Top level function to get summoner stats for a given summoner name.
     */
    public async getSummonerStats(params: {
        summonerName: string,
        region: Region,
        options?: MatchlistOptions
    }) {
        const { summonerName, region, options = { start: 0, count: 10 } } = params;

        // Get summoner
        const summoner = await this.summoner.getSummonerByName({ summonerName, region })

        if (!summoner) {
            throw new SummonerNotFoundException(summonerName)
        }

        // Get match list
        const platform = getPlatform(region);

        const matchIds = await this.match.getMatchlistByPuuid({
            puuid: summoner.puuid,
            region: platform,
            options
        })

        // Get match details
        const matchs = await Promise.all(
            matchIds.map(matchId => this.match.getMatchById({
                matchId,
                region: platform
            }))
        )

        return matchs.filter(Boolean) as MatchDAO[];
    }
}