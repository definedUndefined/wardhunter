/**
 * ChampionDTO from DDragon CDN
 */
export type ChampionDTO = {
    version: string
    id: string
    key: string
    name: string
    title: string
    blurb: string
    info: ChampionInfoDTO
    image: ChampionImageDTO
    tags: string[]
    partype: string
    stats: ChampionStatsDTO
}

export type ChampionInfoDTO = {
    attack: number
    defense: number
    magic: number
    difficulty: number
}

export type ChampionImageDTO = {
    full: string
    sprite: string
    group: string
    x: number
    y: number
    w: number
    h: number
}

export type ChampionStatsDTO = {
    hp: number
    hpperlevel: number
    mp: number
    mpperlevel: number
    movespeed: number
    armor: number
    armorperlevel: number
    spellblock: number
    spellblockperlevel: number
    attackrange: number
    hpregen: number
    hpregenperlevel: number
    mpregen: number
    mpregenperlevel: number
    crit: number
    critperlevel: number
    attackdamage: number
    attackdamageperlevel: number
    attackspeedperlevel: number
    attackspeed: number
}

/**
 * ChampionDetailsDTO from DDragon CDN
 */

export type ChampionDetailsDTO = Omit<ChampionDTO, "version"> & {
    skins: ChampionSkinDTO[]
    lore: string
    allytips: string[]
    enemytips: string[]
    spells: ChampionSpellDTO[]
    passive: ChampionPassiveDTO
    recommended: unknown[]
}

export type ChampionSkinDTO = {
    id: string
    num: number
    name: string
    chromas: boolean
}

export type ChampionSpellDTO = {
    id: string
    name: string
    description: string
    leveltip: {
        label: string[]
        effect: string[]
    }
    maxrank: number
    cooldown: number[]
    cooldownBurn: string
    cost: number[]
    costBurn: string
    datavalues: unknown
    effect?: Array<number[] | null>
    effectBurn?: Array<string | null>
    vars: unknown[]
    costType: string
    maxammo: string
    range: number[]
    rangeBurn: string
    image: ChampionImageDTO
    resource: string
}

export type ChampionPassiveDTO = {
    name: string
    description: string
    image: ChampionImageDTO
}