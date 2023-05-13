import { prisma } from "@/server/db";
import { endpoint } from "@/lib/endpoint";
import { AbstractModule } from "@/lib/modules/abstract";
import { summonerToPrismaSummoner } from "./adapter";
import type { Summoner as SummonerDAO } from "@prisma/client";
import type { SummonerDTO } from "@/lib/models/summoner";
import type { ModuleConstructorParams, RegionRouting } from "@/lib/modules/types";

/**
 * Module for the summoner-v4 endpoints
 */
export class SummonerModule extends AbstractModule<
    SummonerDTO,
    SummonerDAO
> {
    private static EXPIRATION_TIME = 60 * 60 * 24 * 7; // 1 week

    constructor(params: ModuleConstructorParams) {
        super(params);
    }

    /**
     * Gets a summoner by their summoner name and region
     */
    @endpoint("/lol/summoner/v4/summoners/by-name/{summonerName}", { expiry: SummonerModule.EXPIRATION_TIME, field: "revisionDate" })
    public async getSummonerByName({ summonerName, region }: RegionRouting<{ summonerName: string }>) {
        return await prisma.summoner.findFirst({
            where: {
                region,
                name: {
                    equals: summonerName,
                    mode: "insensitive"
                },
            },
        });
    }

    /**
     * Gets a summoner by their puuid
     */
    @endpoint("/lol/summoner/v4/summoners/by-puuid/{puuid}", { expiry: SummonerModule.EXPIRATION_TIME, field: "revisionDate" })
    async getSummonerByPuuid({ puuid }: RegionRouting<{ puuid: string }>) {
        return await prisma.summoner.findUnique({
            where: { puuid },
        });
    }

    /**
     * Gets a summoner by their encrypted account id
     */
    @endpoint("/lol/summoner/v4/summoners/by-account/{accountId}", { expiry: SummonerModule.EXPIRATION_TIME, field: "revisionDate" })
    public async getSummonerByAccountId({ accountId, region }: RegionRouting<{ accountId: string }>) {
        return await prisma.summoner.findFirst({
            where: {
                accountId,
                region
            },
        });
    }

    /**
     * Gets a summoner by their encrypted summoner id
     */
    @endpoint("/lol/summoner/v4/summoners/{summonerId}", { expiry: SummonerModule.EXPIRATION_TIME, field: "revisionDate" })
    public async getSummonerById({ summonerId, region }: RegionRouting<{ summonerId: string }>) {
        return await prisma.summoner.findFirst({
            where: {
                id: summonerId,
                region
            },
        });
    }

    /**
     * Stores and returns the summoner data
     */
    public async store(summonerDTO: SummonerDTO, { region }: RegionRouting) {
        const summoner = summonerToPrismaSummoner(summonerDTO, region);

        return await prisma.summoner.upsert({
            where: { puuid: summoner.puuid },
            create: summoner,
            update: summoner,
        })
    }
}