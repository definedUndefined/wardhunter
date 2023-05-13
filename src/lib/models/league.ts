/**
 * LeagueDTO
 * 
 * @see [League API documentation](https://developer.riotgames.com/apis#league-v4/GET_getLeagueEntriesForSummoner)
 */
export type LeagueDTO = {
    leagueId: string
    queueType: string
    tier: string
    rank: string
    summonerId: string
    summonerName: string
    leaguePoints: number
    wins: number
    losses: number
    veteran: boolean
    inactive: boolean
    freshBlood: boolean
    hotStreak: boolean
    name?: string
    miniSeries?: MiniSeriesDTO
}

export type MiniSeriesDTO = {
    losses: number
    progress: string
    target: number
    wins: number
}