import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { client } from "@/server/client";
import { regionSchema } from "@/lib/constants/platforms";

export const masteryRouter = createTRPCRouter({
    getAll: publicProcedure
        .input(z.object({ summonerId: z.string(), region: regionSchema }))
        .query(({ input }) => {
            return client.mastery.getSummonerChampionMasteries(input);
        }),
});