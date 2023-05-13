import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "@/server/api/routers/example";
import { summonerRouter, matchRouter, leagueRouter, championRouter, masteryRouter } from "./routers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  summoner: summonerRouter,
  match: matchRouter,
  league: leagueRouter,
  champion: championRouter,
  mastery: masteryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
