import { prisma } from "@/server/db";
import { client } from "@/server/client";

/**
 * Initialize the database with the champions and few matches data
 * 
 * @param client WardHunterClient
 * 
 * @returns Added champions and matches
 */
export async function initDatabase(){
    const champions = await client.ddragon.getChampions();

    await prisma.$transaction(
        champions.map((champion) => {
            const { info, image, stats, ...data } = champion

            const updateChampionData = {
                ...data,
                key: Number(champion.key),
                info: {
                    update: info
                },
                image: {
                    update: image
                },
                stats: {
                    update: stats
                }
            }

            const createChampionData = {
                ...data,
                key: Number(champion.key),
                info: {
                    create: info
                },
                image: {
                    create: image
                },
                stats: {
                    create: stats
                }
            }

            return prisma.champion.upsert({
                where: {
                    key: Number(champion.key)
                },
                update: updateChampionData,
                create: createChampionData
            })
        })
    )

    console.log(`${champions.length} champions added to the database`)

    const matches = await client.getSummonerStats({
        summonerName: "XI Persès",
        region: "euw1"
    })

    console.log(`${matches.length} matches added to the database`)

    return { champions, matches }
}