import moment from "moment";
import { Prisma } from "@prisma/client";
import type { MatchDTO } from "@/lib/models/match";

/**
 * Converts a MatchDTO from the Riot API to an object that can be stored in the database.
 * 
 * This object contains the match metadata, with the teams and participants.
 * 
 * @warning __You have to create the summoners separately, or the query will fail because of foreign key constraints.__
 */
export function matchToPrismaFullMatch(matchDTO: MatchDTO) {
    const { metadata, info } = matchDTO;
    const { participants, teams, ...match } = info;

    return Prisma.validator<Prisma.MatchCreateInput>()({
        ...match,
        gameId: String(match.gameId),
        gameCreation: moment(match.gameCreation).toDate(),
        gameEndTimestamp: moment(match.gameEndTimestamp).toDate(),
        gameStartTimestamp: moment(match.gameStartTimestamp).toDate(),
        matchId: metadata.matchId,
        Team: {
            create: teams.map(team => ({
                teamId: team.teamId,
                win: team.win,
                Participant: {
                    createMany: {
                        data: participants
                            .filter(participant => participant.teamId === team.teamId)
                            .map(participant => ({
                                puuid: participant.puuid,
                                championId: participant.championId,
                            }))
                    }
                }
            }))
        },
    })
}

/**
 * Converts a MatchDTO from the Riot API to an object that can be stored in the database.
 * 
 * This object contains only the match metadata.
 */
export function matchToPrismaMatch(matchDTO: MatchDTO) {
    const { metadata, info } = matchDTO;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { participants, teams, ...match } = info;

    return Prisma.validator<Prisma.MatchCreateInput>()({
        ...match,
        gameId: String(match.gameId),
        gameCreation: moment(match.gameCreation).toDate(),
        gameEndTimestamp: moment(match.gameEndTimestamp).toDate(),
        gameStartTimestamp: moment(match.gameStartTimestamp).toDate(),
        matchId: metadata.matchId
    })
}

/**
 * Converts a MatchDTO from the Riot API to an object that can be stored in the database.
 * 
 * This object contains only the match teams data.
 */
export function matchToPrismaTeams(matchDTO: MatchDTO): Prisma.TeamUncheckedCreateInput[] {
    const { metadata, info } = matchDTO;
    const { teams } = info;

    return teams.map(team => ({
        matchId: metadata.matchId,
        teamId: team.teamId,
        win: team.win,
    }))
}

/**
 * Converts a MatchDTO from the Riot API to an object that can be stored in the database.
 * 
 * This object contains only the match participants data.
 */
export function matchToPrismaParticipants(matchDTO: MatchDTO): Prisma.ParticipantUncheckedCreateInput[] {
    const { metadata, info } = matchDTO;
    const { participants } = info;

    return participants.map(participant => ({
        matchId: metadata.matchId,
        puuid: participant.puuid,
        championId: participant.championId,
        teamId: participant.teamId,
    }))
}

/**
 * Converts a MatchDTO from the Riot API to an object that can be stored in the database.
 * 
 * This object contains only the match summoners data.
 */
export function matchToPrismaSummoners(matchDTO: MatchDTO) {
    const { info } = matchDTO;
    const { participants } = info;

    return participants.map(participant => Prisma.validator<Prisma.SummonerCreateInput>()({
        id: participant.summonerId,
        accountId: "",
        puuid: participant.puuid,
        name: participant.summonerName,
        profileIconId: participant.profileIcon,
        revisionDate: moment().toDate(),
        summonerLevel: participant.summonerLevel,
        region: info.platformId.toLowerCase(),
    }))
}