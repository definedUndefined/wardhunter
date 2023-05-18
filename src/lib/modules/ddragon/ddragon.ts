import axios from "axios";
import { getLanguageCode, type Language } from "@/lib/constants/languages";
import type { ChampionId } from "@/lib/constants/champions";
import type { ChampionDTO, ChampionDetailsDTO } from "@/lib/models/champion";
import fetch from 'node-fetch';


export class DDragon {
    /**
     * Gets the latest version of the game from the DDragon API
     */
    public async getLatestVersion() {
        try {
            const versionURL = "https://ddragon.leagueoflegends.com/api/versions.json"
            const versionResponse = await axios.get<string[]>(versionURL);

            const versionJSON = versionResponse.data
            const version = versionJSON[0] ?? "13.9.1"

            return version
        } catch (error) {
            throw new Error("Could not fetch latest version")
        }
    }

    /**
     * Gets the champions summary data from the DDragon API
     * @param language The language to get the champions in
     */
    public async getChampions(language: Language = "french") {
        const version = await this.getLatestVersion()
        const languageCode = getLanguageCode(language)

        try{
            const championURL = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${languageCode}/champion.json`
            const championResponse = await axios.get<{ data: Record<string, ChampionDTO> }>(championURL)

            const championJSON = championResponse.data
    
            return Object.values(championJSON.data)

        }catch(error){
            throw new Error("Could not fetch champions")
        }
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

        try{
            const championURL = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${languageCode}/${id}.json`
    
            const championResponse = await axios.get<{ data: Record<string, ChampionDetailsDTO> }>(championURL)
    
            const championJSON = championResponse.data
    
            return Object.values(championJSON.data)[0] as ChampionDetailsDTO

        }catch(error){
            throw new Error(`Could not fetch champion ${id}`)
        }
    }
}