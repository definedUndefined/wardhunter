import { prisma } from "@/server/db";
import { endpoint } from "@/lib/endpoint";
import { AbstractModule } from "@/lib/modules/abstract";
import { leagueToPrismaLeague } from "./adapter";
import type { League as LeagueDAO } from "@prisma/client";
import type { LeagueDTO } from "@/lib/models/league";
import type { ModuleConstructorParams, RegionRouting } from "@/lib/modules/types";

/**
 * Module for the league-v4 endpoints
 */
export class LeagueModule extends AbstractModule<
    LeagueDTO[],
    LeagueDAO[]
> {
    constructor(params: ModuleConstructorParams) {
        super(params);
    }

    /**
    * Gets summoner leagues by their summoner id
    */
    @endpoint("/lol/league/v4/entries/by-summoner/{summonerId}", { expiry: 60 * 60 * 24 * 3, field: "revisionDate" })
    public async getLeaguesBySummonerId({ summonerId, region }: RegionRouting<{ summonerId: string }>) {
        const leagues = await prisma.league.findMany({
            where: { summonerId, region },
        });

        return !!leagues.length ? leagues : null
    }

    /**
     * Stores and returns the given summoner leagues
     */
    public async store(leagueDTO: LeagueDTO[], { region }: RegionRouting): Promise<LeagueDAO[]> {
        return await prisma.$transaction(
            leagueDTO.map(league => prisma.league.upsert({
                where: {
                    leagueId_summonerId_region: {
                        leagueId: league.leagueId,
                        summonerId: league.summonerId,
                        region
                    }
                },
                create: leagueToPrismaLeague(league, region),
                update: leagueToPrismaLeague(league, region),
            }))
        )
    }
}
