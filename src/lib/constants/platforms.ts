import { z } from "zod"

/* ---------------------------------- Types --------------------------------- */

export type Region = keyof typeof platformMap

export type Platform = typeof platformMap[Region]

export const platformMap = {
    br1: "americas",
    eun1: "europe",
    euw1: "europe",
    jp1: "asia",
    kr: "asia",
    la1: "americas",
    la2: "americas",
    na1: "americas",
    oc1: "sea",
    tr1: "europe",
    ru: "europe",
    ph2: "sea",
    sg2: "sea",
    th2: "sea",
    tw2: "sea",
    vn2: "sea"
} as const

export const regions = Object.keys(platformMap) as Region[]

export const platforms = Object.values(platformMap) as Platform[]

/* -------------------------------- Functions ------------------------------- */

export function isPlatform(platform: string): platform is Platform {
    return platforms.includes(platform as Platform)
}

export function isRegion(region: string): region is Region {
    return region in platformMap
}

export function getRegion(platform: Platform): Region {
    return regions.find(region => platformMap[region] === platform) as Region

    // random region between thoses who share the same platform
    // const regions = Object.entries(platformMap).filter(([, value]) => value === platform).map(([key]) => key)

    // return regions[Math.floor(Math.random() * regions.length)] as Region
}

export function getPlatform(region: Region): Platform {
    return platformMap[region]
}

/* --------------------------------- Schemas -------------------------------- */

export const regionSchema = z.union([
    z.literal("br1"),
    z.literal("eun1"),
    z.literal("euw1"),
    z.literal("jp1"),
    z.literal("kr"),
    z.literal("la1"),
    z.literal("la2"),
    z.literal("na1"),
    z.literal("oc1"),
    z.literal("tr1"),
    z.literal("ru"),
    z.literal("ph2"),
    z.literal("sg2"),
    z.literal("th2"),
    z.literal("tw2"),
    z.literal("vn2")
])

export const platformSchema = z.union([
    z.literal("europe"),
    z.literal("sea"),
    z.literal("americas"),
    z.literal("asia")
])
