import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { client } from "@/server/client";
import { regionSchema } from "@/lib/constants/platforms";


export const statsRouter = createTRPCRouter({
  getStats: publicProcedure
    .input(z.object({ summonerName: z.string(), region: regionSchema }))
    .query(({ input }) => {
      return client.getSummonerStats(input);
    }),
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),
});
