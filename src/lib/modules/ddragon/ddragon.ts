import { getLanguageCode, type Language } from "@/lib/constants/languages";
import type { ChampionId } from "@/lib/constants/champions";
import type { ChampionDTO, ChampionDetailsDTO } from "@/lib/models/champion";

export class DDragon {
    /**
     * Gets the latest version of the game from the DDragon API
     */
    public async getLatestVersion() {
        const versionURL = "https://ddragon.leagueoflegends.com/api/versions.json"
        const versionResponse = await fetch(versionURL);

        if (!versionResponse.ok) {
            throw new Error("Could not fetch latest version")
        }

        const versionJSON = await versionResponse.json() as string[]
        const version = versionJSON[0] ?? "13.9.1"

        return version
    }

    /**
     * Gets the champions summary data from the DDragon API
     * @param language The language to get the champions in
     */
    public async getChampions(language: Language = "french") {
        const version = await this.getLatestVersion()
        const languageCode = getLanguageCode(language) 

        const championURL = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${languageCode}/champion.json`
        const championResponse = await fetch(championURL)

        if (!championResponse.ok) {
            throw new Error("Could not fetch champions")
        }

        const championJSON = await championResponse.json() as { data: Record<string, ChampionDTO> }

        return Object.values(championJSON.data)
    }

    /**
     * Gets full champion data from the DDragon API
     * @param id Id name of the champion. Case sensitive
     * @param language The language to get the champion in
     * 
     * @note Champion id are not always the same as their name.
     * 
     * We provide a list of all the champions static data in the `constants/champions.ts` file. (version 13.9.1)
     */
    public async getChampionById(id: ChampionId, language: Language = "french") {
        const version = await this.getLatestVersion()
        const languageCode = getLanguageCode(language)

        const championURL = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${languageCode}/${id}.json`

        const championResponse = await fetch(championURL)

        if (!championResponse.ok) {
            throw new Error(`Could not fetch champion ${id}`)
        }

        const championJSON = await championResponse.json() as { data: Record<string, ChampionDetailsDTO> }

        return Object.values(championJSON.data)[0] as ChampionDetailsDTO
    }
}