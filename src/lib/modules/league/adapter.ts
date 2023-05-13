import { Prisma } from "@prisma/client";
import type { LeagueDTO } from "@/lib/models/league";
import type { Region } from "@/lib/constants/platforms";

/**
 * Converts a LeagueDTO from the Riot API to an object that can be stored in the database.
 * 
 * @throws {Error} If the summoner is not found in the database (based on the summonerId)
 */
export function leagueToPrismaLeague(leagueDTO: LeagueDTO, region: Region) {
    const { summonerId, miniSeries, ...rest } = leagueDTO;

    return Prisma.validator<Prisma.LeagueCreateInput>()({
        ...rest,
        summoner: {
            connect: { region_id: { region, id: summonerId } }
        },
        miniSeries: miniSeries ? {
            create: miniSeries,
        } : undefined,
    })
}