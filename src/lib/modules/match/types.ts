import type { Match, Team, Participant, Summoner } from "@prisma/client";
import type { RequireAllOrNone } from "@/lib/types";

/**
 * DAO for the match table
 * 
 * @contains Match metadata, teams, participants, and summoners
 */
export type MatchDAO = (Match & {
    Team: Team[];
    Participant: (Participant & {
        summoner: Summoner;
    })[];
})

/**
 * Match list request options
 */
export type MatchlistOptions = RequireAllOrNone<{
    startTime?: number;
    endTime?: number;
    queue?: number;
    type?: "ranked" | "normal" | "tourney" | "tutorial";
    start?: number;
    count?: number;
}, 'start' | 'count'>