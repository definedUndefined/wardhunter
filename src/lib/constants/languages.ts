import { z } from "zod"

/* ---------------------------------- Types --------------------------------- */

export type LanguageCode = keyof typeof languageMap

export type Language = typeof languageMap[LanguageCode]

export const languageMap = {
    en_US: "english",
    cs_CZ: "czech",
    de_DE: "german",
    el_GR: "greek",
    en_AU: "english",
    en_GB: "english",
    en_PH: "english",
    en_SG: "english",
    es_AR: "spanish",
    es_ES: "spanish",
    es_MX: "spanish",
    fr_FR: "french",
    hu_HU: "hungarian",
    id_ID: "indonesian",
    it_IT: "italian",
    ja_JP: "japanese",
    ko_KR: "korean",
    pl_PL: "polish",
    pt_BR: "portuguese",
    ro_RO: "romanian",
    ru_RU: "russian",
    th_TH: "thai",
    tr_TR: "turkish",
    vn_VN: "vietnamese",
    zh_CN: "chinese",
    zh_MY: "chinese",
    zh_TW: "chinese"
} as const

/* -------------------------------- Functions ------------------------------- */

export const languageCodes = Object.keys(languageMap) as LanguageCode[]

export const languages = Object.values(languageMap) as Language[]

export function getLanguageCode(language: Language): LanguageCode {
    return languageCodes.find((code) => languageMap[code] === language) ?? "fr_FR"
}

/* --------------------------------- Schema --------------------------------- */

export const languageSchema = z.union([
    z.literal("english"),
    z.literal("czech"),
    z.literal("german"),
    z.literal("greek"),
    z.literal("spanish"),
    z.literal("french"),
    z.literal("hungarian"),
    z.literal("indonesian"),
    z.literal("italian"),
    z.literal("japanese"),
    z.literal("korean"),
    z.literal("polish"),
    z.literal("portuguese"),
    z.literal("romanian"),
    z.literal("russian"),
    z.literal("thai"),
    z.literal("turkish"),
    z.literal("vietnamese"),
    z.literal("chinese")
  ])