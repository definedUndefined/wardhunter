import { z } from "zod";

/* ---------------------------------- Types --------------------------------- */
export type ChampionName = typeof championsMap[number]['name'];

export type ChampionKey = typeof championsMap[number]['key'];

export type ChampionId = typeof championsMap[number]['id'];

/* -------------------------------- Functions ------------------------------- */

export function getChampionIdByName(champion: ChampionName): ChampionId {
    const id = championsMap.find(({ name }) => name === champion)?.id;

    if (!id) {
        throw new Error(`Could not find champion ${champion}`);
    }

    return id;
}

export function getChampionKeyByName(champion: ChampionName): ChampionKey {
    const key = championsMap.find(({ name }) => name === champion)?.key;

    if (!key) {
        throw new Error(`Could not find champion ${champion}`);
    }

    return key;
}

export function getChampionNameById(id: ChampionId): ChampionName {
    const name = championsMap.find(({ id: _id }) => id === _id)?.name;

    if (!name) {
        throw new Error(`Could not find champion ${id}`);
    }

    return name;
}

export function getChampionKeyById(id: ChampionId): ChampionKey {
    const key = championsMap.find(({ id: _id }) => id === _id)?.key;

    if (!key) {
        throw new Error(`Could not find champion ${id}`);
    }

    return key;
}

export function getChampionNameByKey(key: ChampionKey): ChampionName {
    const name = championsMap.find(({ key: _key }) => key === _key)?.name;

    if (!name) {
        throw new Error(`Could not find champion ${key}`);
    }

    return name;
}

export function getChampionIdByKey(key: ChampionKey): ChampionId {
    const id = championsMap.find(({ key: _key }) => key === _key)?.id;

    if (!id) {
        throw new Error(`Could not find champion ${key}`);
    }

    return id;
}

/**
 * Champions from DDragon
 * 
 * version 13.9.1
 */
export const championsMap = [
    {
        "id": "Aatrox",
        "key": 266,
        "name": "Aatrox"
    },
    {
        "id": "Ahri",
        "key": 103,
        "name": "Ahri"
    },
    {
        "id": "Akali",
        "key": 84,
        "name": "Akali"
    },
    {
        "id": "Akshan",
        "key": 166,
        "name": "Akshan"
    },
    {
        "id": "Alistar",
        "key": 12,
        "name": "Alistar"
    },
    {
        "id": "Amumu",
        "key": 32,
        "name": "Amumu"
    },
    {
        "id": "Anivia",
        "key": 34,
        "name": "Anivia"
    },
    {
        "id": "Annie",
        "key": 1,
        "name": "Annie"
    },
    {
        "id": "Aphelios",
        "key": 523,
        "name": "Aphelios"
    },
    {
        "id": "Ashe",
        "key": 22,
        "name": "Ashe"
    },
    {
        "id": "AurelionSol",
        "key": 136,
        "name": "Aurelion Sol"
    },
    {
        "id": "Azir",
        "key": 268,
        "name": "Azir"
    },
    {
        "id": "Bard",
        "key": 432,
        "name": "Bard"
    },
    {
        "id": "Belveth",
        "key": 200,
        "name": "Bel'Veth"
    },
    {
        "id": "Blitzcrank",
        "key": 53,
        "name": "Blitzcrank"
    },
    {
        "id": "Brand",
        "key": 63,
        "name": "Brand"
    },
    {
        "id": "Braum",
        "key": 201,
        "name": "Braum"
    },
    {
        "id": "Caitlyn",
        "key": 51,
        "name": "Caitlyn"
    },
    {
        "id": "Camille",
        "key": 164,
        "name": "Camille"
    },
    {
        "id": "Cassiopeia",
        "key": 69,
        "name": "Cassiopeia"
    },
    {
        "id": "Chogath",
        "key": 31,
        "name": "Cho'Gath"
    },
    {
        "id": "Corki",
        "key": 42,
        "name": "Corki"
    },
    {
        "id": "Darius",
        "key": 122,
        "name": "Darius"
    },
    {
        "id": "Diana",
        "key": 131,
        "name": "Diana"
    },
    {
        "id": "Draven",
        "key": 119,
        "name": "Draven"
    },
    {
        "id": "DrMundo",
        "key": 36,
        "name": "Dr. Mundo"
    },
    {
        "id": "Ekko",
        "key": 245,
        "name": "Ekko"
    },
    {
        "id": "Elise",
        "key": 60,
        "name": "Elise"
    },
    {
        "id": "Evelynn",
        "key": 28,
        "name": "Evelynn"
    },
    {
        "id": "Ezreal",
        "key": 81,
        "name": "Ezreal"
    },
    {
        "id": "Fiddlesticks",
        "key": 9,
        "name": "Fiddlesticks"
    },
    {
        "id": "Fiora",
        "key": 114,
        "name": "Fiora"
    },
    {
        "id": "Fizz",
        "key": 105,
        "name": "Fizz"
    },
    {
        "id": "Galio",
        "key": 3,
        "name": "Galio"
    },
    {
        "id": "Gangplank",
        "key": 41,
        "name": "Gangplank"
    },
    {
        "id": "Garen",
        "key": 86,
        "name": "Garen"
    },
    {
        "id": "Gnar",
        "key": 150,
        "name": "Gnar"
    },
    {
        "id": "Gragas",
        "key": 79,
        "name": "Gragas"
    },
    {
        "id": "Graves",
        "key": 104,
        "name": "Graves"
    },
    {
        "id": "Gwen",
        "key": 887,
        "name": "Gwen"
    },
    {
        "id": "Hecarim",
        "key": 120,
        "name": "Hecarim"
    },
    {
        "id": "Heimerdinger",
        "key": 74,
        "name": "Heimerdinger"
    },
    {
        "id": "Illaoi",
        "key": 420,
        "name": "Illaoi"
    },
    {
        "id": "Irelia",
        "key": 39,
        "name": "Irelia"
    },
    {
        "id": "Ivern",
        "key": 427,
        "name": "Ivern"
    },
    {
        "id": "Janna",
        "key": 40,
        "name": "Janna"
    },
    {
        "id": "JarvanIV",
        "key": 59,
        "name": "Jarvan IV"
    },
    {
        "id": "Jax",
        "key": 24,
        "name": "Jax"
    },
    {
        "id": "Jayce",
        "key": 126,
        "name": "Jayce"
    },
    {
        "id": "Jhin",
        "key": 202,
        "name": "Jhin"
    },
    {
        "id": "Jinx",
        "key": 222,
        "name": "Jinx"
    },
    {
        "id": "Kaisa",
        "key": 145,
        "name": "Kai'Sa"
    },
    {
        "id": "Kalista",
        "key": 429,
        "name": "Kalista"
    },
    {
        "id": "Karma",
        "key": 43,
        "name": "Karma"
    },
    {
        "id": "Karthus",
        "key": 30,
        "name": "Karthus"
    },
    {
        "id": "Kassadin",
        "key": 38,
        "name": "Kassadin"
    },
    {
        "id": "Katarina",
        "key": 55,
        "name": "Katarina"
    },
    {
        "id": "Kayle",
        "key": 10,
        "name": "Kayle"
    },
    {
        "id": "Kayn",
        "key": 141,
        "name": "Kayn"
    },
    {
        "id": "Kennen",
        "key": 85,
        "name": "Kennen"
    },
    {
        "id": "Khazix",
        "key": 121,
        "name": "Kha'Zix"
    },
    {
        "id": "Kindred",
        "key": 203,
        "name": "Kindred"
    },
    {
        "id": "Kled",
        "key": 240,
        "name": "Kled"
    },
    {
        "id": "KogMaw",
        "key": 96,
        "name": "Kog'Maw"
    },
    {
        "id": "KSante",
        "key": 897,
        "name": "K'Sante"
    },
    {
        "id": "Leblanc",
        "key": 7,
        "name": "LeBlanc"
    },
    {
        "id": "LeeSin",
        "key": 64,
        "name": "Lee Sin"
    },
    {
        "id": "Leona",
        "key": 89,
        "name": "Leona"
    },
    {
        "id": "Lillia",
        "key": 876,
        "name": "Lillia"
    },
    {
        "id": "Lissandra",
        "key": 127,
        "name": "Lissandra"
    },
    {
        "id": "Lucian",
        "key": 236,
        "name": "Lucian"
    },
    {
        "id": "Lulu",
        "key": 117,
        "name": "Lulu"
    },
    {
        "id": "Lux",
        "key": 99,
        "name": "Lux"
    },
    {
        "id": "Malphite",
        "key": 54,
        "name": "Malphite"
    },
    {
        "id": "Malzahar",
        "key": 90,
        "name": "Malzahar"
    },
    {
        "id": "Maokai",
        "key": 57,
        "name": "Maokai"
    },
    {
        "id": "MasterYi",
        "key": 11,
        "name": "Master Yi"
    },
    {
        "id": "Milio",
        "key": 902,
        "name": "Milio"
    },
    {
        "id": "MissFortune",
        "key": 21,
        "name": "Miss Fortune"
    },
    {
        "id": "MonkeyKing",
        "key": 62,
        "name": "Wukong"
    },
    {
        "id": "Mordekaiser",
        "key": 82,
        "name": "Mordekaiser"
    },
    {
        "id": "Morgana",
        "key": 25,
        "name": "Morgana"
    },
    {
        "id": "Nami",
        "key": 267,
        "name": "Nami"
    },
    {
        "id": "Nasus",
        "key": 75,
        "name": "Nasus"
    },
    {
        "id": "Nautilus",
        "key": 111,
        "name": "Nautilus"
    },
    {
        "id": "Neeko",
        "key": 518,
        "name": "Neeko"
    },
    {
        "id": "Nidalee",
        "key": 76,
        "name": "Nidalee"
    },
    {
        "id": "Nilah",
        "key": 895,
        "name": "Nilah"
    },
    {
        "id": "Nocturne",
        "key": 56,
        "name": "Nocturne"
    },
    {
        "id": "Nunu",
        "key": 20,
        "name": "Nunu & Willump"
    },
    {
        "id": "Olaf",
        "key": 2,
        "name": "Olaf"
    },
    {
        "id": "Orianna",
        "key": 61,
        "name": "Orianna"
    },
    {
        "id": "Ornn",
        "key": 516,
        "name": "Ornn"
    },
    {
        "id": "Pantheon",
        "key": 80,
        "name": "Pantheon"
    },
    {
        "id": "Poppy",
        "key": 78,
        "name": "Poppy"
    },
    {
        "id": "Pyke",
        "key": 555,
        "name": "Pyke"
    },
    {
        "id": "Qiyana",
        "key": 246,
        "name": "Qiyana"
    },
    {
        "id": "Quinn",
        "key": 133,
        "name": "Quinn"
    },
    {
        "id": "Rakan",
        "key": 497,
        "name": "Rakan"
    },
    {
        "id": "Rammus",
        "key": 33,
        "name": "Rammus"
    },
    {
        "id": "RekSai",
        "key": 421,
        "name": "Rek'Sai"
    },
    {
        "id": "Rell",
        "key": 526,
        "name": "Rell"
    },
    {
        "id": "Renata",
        "key": 888,
        "name": "Renata Glasc"
    },
    {
        "id": "Renekton",
        "key": 58,
        "name": "Renekton"
    },
    {
        "id": "Rengar",
        "key": 107,
        "name": "Rengar"
    },
    {
        "id": "Riven",
        "key": 92,
        "name": "Riven"
    },
    {
        "id": "Rumble",
        "key": 68,
        "name": "Rumble"
    },
    {
        "id": "Ryze",
        "key": 13,
        "name": "Ryze"
    },
    {
        "id": "Samira",
        "key": 360,
        "name": "Samira"
    },
    {
        "id": "Sejuani",
        "key": 113,
        "name": "Sejuani"
    },
    {
        "id": "Senna",
        "key": 235,
        "name": "Senna"
    },
    {
        "id": "Seraphine",
        "key": 147,
        "name": "Seraphine"
    },
    {
        "id": "Sett",
        "key": 875,
        "name": "Sett"
    },
    {
        "id": "Shaco",
        "key": 35,
        "name": "Shaco"
    },
    {
        "id": "Shen",
        "key": 98,
        "name": "Shen"
    },
    {
        "id": "Shyvana",
        "key": 102,
        "name": "Shyvana"
    },
    {
        "id": "Singed",
        "key": 27,
        "name": "Singed"
    },
    {
        "id": "Sion",
        "key": 14,
        "name": "Sion"
    },
    {
        "id": "Sivir",
        "key": 15,
        "name": "Sivir"
    },
    {
        "id": "Skarner",
        "key": 72,
        "name": "Skarner"
    },
    {
        "id": "Sona",
        "key": 37,
        "name": "Sona"
    },
    {
        "id": "Soraka",
        "key": 16,
        "name": "Soraka"
    },
    {
        "id": "Swain",
        "key": 50,
        "name": "Swain"
    },
    {
        "id": "Sylas",
        "key": 517,
        "name": "Sylas"
    },
    {
        "id": "Syndra",
        "key": 134,
        "name": "Syndra"
    },
    {
        "id": "TahmKench",
        "key": 223,
        "name": "Tahm Kench"
    },
    {
        "id": "Taliyah",
        "key": 163,
        "name": "Taliyah"
    },
    {
        "id": "Talon",
        "key": 91,
        "name": "Talon"
    },
    {
        "id": "Taric",
        "key": 44,
        "name": "Taric"
    },
    {
        "id": "Teemo",
        "key": 17,
        "name": "Teemo"
    },
    {
        "id": "Thresh",
        "key": 412,
        "name": "Thresh"
    },
    {
        "id": "Tristana",
        "key": 18,
        "name": "Tristana"
    },
    {
        "id": "Trundle",
        "key": 48,
        "name": "Trundle"
    },
    {
        "id": "Tryndamere",
        "key": 23,
        "name": "Tryndamere"
    },
    {
        "id": "TwistedFate",
        "key": 4,
        "name": "Twisted Fate"
    },
    {
        "id": "Twitch",
        "key": 29,
        "name": "Twitch"
    },
    {
        "id": "Udyr",
        "key": 77,
        "name": "Udyr"
    },
    {
        "id": "Urgot",
        "key": 6,
        "name": "Urgot"
    },
    {
        "id": "Varus",
        "key": 110,
        "name": "Varus"
    },
    {
        "id": "Vayne",
        "key": 67,
        "name": "Vayne"
    },
    {
        "id": "Veigar",
        "key": 45,
        "name": "Veigar"
    },
    {
        "id": "Velkoz",
        "key": 161,
        "name": "Vel'Koz"
    },
    {
        "id": "Vex",
        "key": 711,
        "name": "Vex"
    },
    {
        "id": "Vi",
        "key": 254,
        "name": "Vi"
    },
    {
        "id": "Viego",
        "key": 234,
        "name": "Viego"
    },
    {
        "id": "Viktor",
        "key": 112,
        "name": "Viktor"
    },
    {
        "id": "Vladimir",
        "key": 8,
        "name": "Vladimir"
    },
    {
        "id": "Volibear",
        "key": 106,
        "name": "Volibear"
    },
    {
        "id": "Warwick",
        "key": 19,
        "name": "Warwick"
    },
    {
        "id": "Xayah",
        "key": 498,
        "name": "Xayah"
    },
    {
        "id": "Xerath",
        "key": 101,
        "name": "Xerath"
    },
    {
        "id": "XinZhao",
        "key": 5,
        "name": "Xin Zhao"
    },
    {
        "id": "Yasuo",
        "key": 157,
        "name": "Yasuo"
    },
    {
        "id": "Yone",
        "key": 777,
        "name": "Yone"
    },
    {
        "id": "Yorick",
        "key": 83,
        "name": "Yorick"
    },
    {
        "id": "Yuumi",
        "key": 350,
        "name": "Yuumi"
    },
    {
        "id": "Zac",
        "key": 154,
        "name": "Zac"
    },
    {
        "id": "Zed",
        "key": 238,
        "name": "Zed"
    },
    {
        "id": "Zeri",
        "key": 221,
        "name": "Zeri"
    },
    {
        "id": "Ziggs",
        "key": 115,
        "name": "Ziggs"
    },
    {
        "id": "Zilean",
        "key": 26,
        "name": "Zilean"
    },
    {
        "id": "Zoe",
        "key": 142,
        "name": "Zoe"
    },
    {
        "id": "Zyra",
        "key": 143,
        "name": "Zyra"
    }
] as const;

/* --------------------------------- Schema --------------------------------- */
export const championIdSchema = z.union([
    z.literal("Aatrox"),
    z.literal("Ahri"),
    z.literal("Akali"),
    z.literal("Akshan"),
    z.literal("Alistar"),
    z.literal("Amumu"),
    z.literal("Anivia"),
    z.literal("Annie"),
    z.literal("Aphelios"),
    z.literal("Ashe"),
    z.literal("AurelionSol"),
    z.literal("Azir"),
    z.literal("Bard"),
    z.literal("Belveth"),
    z.literal("Blitzcrank"),
    z.literal("Brand"),
    z.literal("Braum"),
    z.literal("Caitlyn"),
    z.literal("Camille"),
    z.literal("Cassiopeia"),
    z.literal("Chogath"),
    z.literal("Corki"),
    z.literal("Darius"),
    z.literal("Diana"),
    z.literal("Draven"),
    z.literal("DrMundo"),
    z.literal("Ekko"),
    z.literal("Elise"),
    z.literal("Evelynn"),
    z.literal("Ezreal"),
    z.literal("Fiddlesticks"),
    z.literal("Fiora"),
    z.literal("Fizz"),
    z.literal("Galio"),
    z.literal("Gangplank"),
    z.literal("Garen"),
    z.literal("Gnar"),
    z.literal("Gragas"),
    z.literal("Graves"),
    z.literal("Gwen"),
    z.literal("Hecarim"),
    z.literal("Heimerdinger"),
    z.literal("Illaoi"),
    z.literal("Irelia"),
    z.literal("Ivern"),
    z.literal("Janna"),
    z.literal("JarvanIV"),
    z.literal("Jax"),
    z.literal("Jayce"),
    z.literal("Jhin"),
    z.literal("Jinx"),
    z.literal("Kaisa"),
    z.literal("Kalista"),
    z.literal("Karma"),
    z.literal("Karthus"),
    z.literal("Kassadin"),
    z.literal("Katarina"),
    z.literal("Kayle"),
    z.literal("Kayn"),
    z.literal("Kennen"),
    z.literal("Khazix"),
    z.literal("Kindred"),
    z.literal("Kled"),
    z.literal("KogMaw"),
    z.literal("KSante"),
    z.literal("Leblanc"),
    z.literal("LeeSin"),
    z.literal("Leona"),
    z.literal("Lillia"),
    z.literal("Lissandra"),
    z.literal("Lucian"),
    z.literal("Lulu"),
    z.literal("Lux"),
    z.literal("Malphite"),
    z.literal("Malzahar"),
    z.literal("Maokai"),
    z.literal("MasterYi"),
    z.literal("Milio"),
    z.literal("MissFortune"),
    z.literal("MonkeyKing"),
    z.literal("Mordekaiser"),
    z.literal("Morgana"),
    z.literal("Nami"),
    z.literal("Nasus"),
    z.literal("Nautilus"),
    z.literal("Neeko"),
    z.literal("Nidalee"),
    z.literal("Nilah"),
    z.literal("Nocturne"),
    z.literal("Nunu"),
    z.literal("Olaf"),
    z.literal("Orianna"),
    z.literal("Ornn"),
    z.literal("Pantheon"),
    z.literal("Poppy"),
    z.literal("Pyke"),
    z.literal("Qiyana"),
    z.literal("Quinn"),
    z.literal("Rakan"),
    z.literal("Rammus"),
    z.literal("RekSai"),
    z.literal("Rell"),
    z.literal("Renata"),
    z.literal("Renekton"),
    z.literal("Rengar"),
    z.literal("Riven"),
    z.literal("Rumble"),
    z.literal("Ryze"),
    z.literal("Samira"),
    z.literal("Sejuani"),
    z.literal("Senna"),
    z.literal("Seraphine"),
    z.literal("Sett"),
    z.literal("Shaco"),
    z.literal("Shen"),
    z.literal("Shyvana"),
    z.literal("Singed"),
    z.literal("Sion"),
    z.literal("Sivir"),
    z.literal("Skarner"),
    z.literal("Sona"),
    z.literal("Soraka"),
    z.literal("Swain"),
    z.literal("Sylas"),
    z.literal("Syndra"),
    z.literal("TahmKench"),
    z.literal("Taliyah"),
    z.literal("Talon"),
    z.literal("Taric"),
    z.literal("Teemo"),
    z.literal("Thresh"),
    z.literal("Tristana"),
    z.literal("Trundle"),
    z.literal("Tryndamere"),
    z.literal("TwistedFate"),
    z.literal("Twitch"),
    z.literal("Udyr"),
    z.literal("Urgot"),
    z.literal("Varus"),
    z.literal("Vayne"),
    z.literal("Veigar"),
    z.literal("Velkoz"),
    z.literal("Vex"),
    z.literal("Vi"),
    z.literal("Viego"),
    z.literal("Viktor"),
    z.literal("Vladimir"),
    z.literal("Volibear"),
    z.literal("Warwick"),
    z.literal("Xayah"),
    z.literal("Xerath"),
    z.literal("XinZhao"),
    z.literal("Yasuo"),
    z.literal("Yone"),
    z.literal("Yorick"),
    z.literal("Yuumi"),
    z.literal("Zac"),
    z.literal("Zed"),
    z.literal("Zeri"),
    z.literal("Ziggs"),
    z.literal("Zilean"),
    z.literal("Zoe"),
    z.literal("Zyra")
]);