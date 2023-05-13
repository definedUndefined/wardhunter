import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { client } from "@/server/client";
import { regionSchema } from "@/lib/constants/platforms";

export const leagueRouter = createTRPCRouter({
    bySummonerId: publicProcedure
        .input(z.object({ summonerId: z.string(), region: regionSchema }))
        .query(({ input }) => {
            return client.league.getLeaguesBySummonerId(input);
        }),
});