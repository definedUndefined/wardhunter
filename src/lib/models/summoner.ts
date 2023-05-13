/**
 * SummonerDTO
 * 
 * @see [Riot API](https://developer.riotgames.com/apis#summoner-v4/GET_getBySummonerName)
 */
export type SummonerDTO = {
    id: string
    accountId: string
    puuid: string
    name: string
    profileIconId: number
    revisionDate: number
    summonerLevel: number
}