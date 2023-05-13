import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { client } from "@/server/client";
import { regionSchema } from "@/lib/constants/platforms";

export const summonerRouter = createTRPCRouter({
    byName: publicProcedure
        .input(z.object({ summonerName: z.string(), region: regionSchema }))
        .query(({ input }) => {
            return client.summoner.getSummonerByName(input);
        }),
    byPuuid: publicProcedure
        .input(z.object({ puuid: z.string(), region: regionSchema }))
        .query(({ input }) => {
            return client.summoner.getSummonerByPuuid(input);
        }),
    byAccountId: publicProcedure
        .input(z.object({ accountId: z.string(), region: regionSchema }))
        .query(({ input }) => {
            return client.summoner.getSummonerByAccountId(input);
        }),
    bySummonerId: publicProcedure
        .input(z.object({ summonerId: z.string(), region: regionSchema }))
        .query(({ input }) => {
            return client.summoner.getSummonerById(input);
        }),
});