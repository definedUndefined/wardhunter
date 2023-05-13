import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { client } from "@/server/client";
import { championIdSchema } from "@/lib/constants/champions";
import { languageSchema } from "@/lib/constants/languages";

export const championRouter = createTRPCRouter({
    getAll: publicProcedure
        .input(z.object({ language: languageSchema.optional() }))
        .query(({ input }) => {
            return client.ddragon.getChampions(input.language);
        }),
    getById: publicProcedure
        .input(z.object({ id: championIdSchema, language: languageSchema.optional() }))
        .query(({ input }) => {
            return client.ddragon.getChampionById(input.id, input.language);
        }),
});