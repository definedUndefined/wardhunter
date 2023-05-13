import { prisma } from "@/server/db";
import { endpoint } from "@/lib/endpoint";
import { AbstractModule } from "@/lib/modules/abstract";
import { masteryToPrismaMastery } from "./adapter";
import type { Mastery as MasteryDAO } from "@prisma/client";
import type { MasteryDTO } from "@/lib/models/mastery";
import type { ModuleConstructorParams, RegionRouting } from "@/lib/modules/types";

/**
 * Module for the champion-mastery-v4 endpoints
 */
export class MasteryModule extends AbstractModule<
    MasteryDTO[],
    MasteryDAO[]
> {
    constructor(params: ModuleConstructorParams) {
        super(params)
    }


    /**
     * Gets all summoner champion masteries by their summoner id
     */
    @endpoint("/lol/champion-mastery/v4/champion-masteries/by-summoner/{summonerId}", { expiry: 60 * 60 * 24 * 3, field: "revisionDate" })
    public async getSummonerChampionMasteries({ summonerId, region }: RegionRouting<{ summonerId: string }>) {
        const masteries = await prisma.mastery.findMany({
            where: { summonerId, region },
        });

        return !!masteries.length ? masteries : null
    }

    /**
     * Stores and returns the given summoner champion masteries
     */
    public async store(masteryDTO: MasteryDTO[], { region }: RegionRouting) {
        return await prisma.$transaction(
            masteryDTO.map(mastery => prisma.mastery.upsert({
                where: {
                    championId_summonerId_region: {
                        championId: mastery.championId,
                        summonerId: mastery.summonerId,
                        region
                    }
                },
                create: masteryToPrismaMastery(mastery, region),
                update: masteryToPrismaMastery(mastery, region),
            }))
        )
    }
}