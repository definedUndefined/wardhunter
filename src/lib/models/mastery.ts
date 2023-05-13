/**
 * MasteryDTO
 * 
 * MasteryDTO contains mastery information for a player and champion combination.
 * 
 * @see [Riot API](https://developer.riotgames.com/apis#champion-mastery-v4/GET_getAllChampionMasteries)
 */
export type MasteryDTO = {
    puuid?: string // WHY IS THIS NOT IN THE RIOT API DOCS
    championId: number
    championLevel: number
    championPoints: number
    lastPlayTime: number
    championPointsSinceLastLevel: number
    championPointsUntilNextLevel: number
    chestGranted: boolean
    tokensEarned: number
    summonerId: string
}
