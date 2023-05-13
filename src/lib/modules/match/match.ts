import { prisma } from "@/server/db";
import { endpoint } from "@/lib/endpoint";
import { AbstractModule } from "@/lib/modules/abstract";
import { getRegion } from "@/lib/constants/platforms";
import { matchToPrismaSummoners, matchToPrismaFullMatch } from "./adapter";
import type { MatchDAO, MatchlistOptions } from "./types";
import type { MatchDTO } from "@/lib/models/match";
import type { Template } from "@/lib/types";
import type { ModuleConstructorParams, PlatformRouting } from "@/lib/modules/types";

/**
 * Module for the match-v5 endpoint
 */
export class MatchModule extends AbstractModule<
    MatchDTO,
    MatchDAO
> {
    constructor(params: ModuleConstructorParams) {
        super(params);
    }

    /**
     * Gets a match by its id
     * 
     * @param params.matchId The id of the match
     * @param params.region The region of the match (needed for caching)
     */
    @endpoint("/lol/match/v5/matches/{matchId}")
    public async getMatchById({ matchId }: PlatformRouting<{ matchId: string }>): Promise<MatchDAO | null> {
        return await prisma.match.findUnique({
            where: { matchId },
            include: {
                Team: true,
                Participant: {
                    include: {
                        summoner: true
                    }
                }
            }
        })
    }

    /**
     * Gets a matchlist by a summoner's puuid
     * 
     * This method is not cached because the matchlist is always changing
     */
    public async getMatchlistByPuuid(params: PlatformRouting<{ puuid: string, options?: MatchlistOptions }>) {
        const { puuid, region, options = { start: 0, count: 20 } } = params

        const template = this.baseURL.concat("/lol/match/v5/matches/by-puuid/{puuid}/ids") as Template;
        const url = this.resolveTemplate(template, { puuid, region })

        const response = await this.request<string[]>({
            url,
            region: getRegion(region),
            endpoint: "getMatchlistByPuuid",
            params: options,
        })

        return response.data
    }

    /**
     * Stores and returns a match
     */
    public async store(matchDTO: MatchDTO): Promise<MatchDAO> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, matchDAO] = await prisma.$transaction([
            prisma.summoner.createMany({
                skipDuplicates: true,
                data: matchToPrismaSummoners(matchDTO)
            }),
            prisma.match.create({
                include: {
                    Team: true,
                    Participant: {
                        include: {
                            summoner: true
                        }
                    }
                },
                data: matchToPrismaFullMatch(matchDTO)
            })
        ])

        return matchDAO
    }
}