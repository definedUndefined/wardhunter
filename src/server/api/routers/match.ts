import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { client } from "@/server/client";
import { platformSchema } from "@/lib/constants/platforms";

export const matchRouter = createTRPCRouter({
    list: publicProcedure
        .input(z.object({ puuid: z.string(), region: platformSchema }))
        .query(({ input }) => {
            return client.match.getMatchlistByPuuid(input);
        }),
    byId: publicProcedure
        .input(z.object({ matchId: z.string(), region: platformSchema }))
        .query(({ input }) => {
            return client.match.getMatchById(input);
        }),
});