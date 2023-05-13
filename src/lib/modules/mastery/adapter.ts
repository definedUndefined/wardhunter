import moment from "moment";
import { Prisma } from "@prisma/client";
import type { MasteryDTO } from "@/lib/models/mastery";
import type { Region } from "@/lib/constants/platforms";

/**
 * Converts a MasteryDTO from the Riot API to an object that can be stored in the database.
 * 
 * @throws {Error} If the champion or the summoner is not found in the database (based on the championId and the summonerId)
 * 
 */
export function masteryToPrismaMastery(masteryDTO: MasteryDTO, region: Region) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { puuid, championId, summonerId, lastPlayTime, ...rest } = masteryDTO;

    return Prisma.validator<Prisma.MasteryCreateInput>()({
        ...rest,
        lastPlayTime: moment(lastPlayTime).toDate(),
        summoner: {
            connect: {
                region_id: {
                    region,
                    id: summonerId
                }
            }
        },
        champion: {
            connect: {
                key: championId
            }
        }
    })
}