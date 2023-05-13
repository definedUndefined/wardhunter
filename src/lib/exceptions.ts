export class SummonerNotFoundException extends Error {
    constructor(summonerName: string) {
        super(`Summoner ${summonerName} not found`)
    }
}