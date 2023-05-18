import React from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { api } from '@/utils/api'
import { Participant } from '@prisma/client'
import { getChampionNameByKey } from '@/lib/constants/champions'

const SummonerPage: React.FC<InferGetServerSidePropsType<
  typeof getServerSideProps
>> = ({ summonerName, region }) => {

  const summonerStats = api.stats.getStats.useQuery({
    summonerName: summonerName,
    region: region,
  })


  function findParticipantByName(
    participants: Participant[],
    name: string,
  ): Participant | undefined {
    return participants.find(
      (participant: Participant) =>
        participant.summoner && participant.summoner.name === name,
    )
  }

  const participantList: Participant[] | undefined =
    summonerStats.data?.[0]?.Participant
  let searchedSummoner: Participant | undefined

  if (participantList) {
    searchedSummoner = findParticipantByName(participantList, summonerName)
  }

  const matchs = api.match.list.useQuery({
    puuid: searchedSummoner?.puuid as string,
    region: "europe"
  },  { enabled: Boolean(searchedSummoner) })

  const match1 = matchs.data ? (matchs.data[0] as string) : '';

const match = api.match.byId.useQuery(
  {
    matchId: match1,
    region: 'europe',
  },
  {
    enabled: Boolean(matchs.data),
  }
);
  const leagues = api.league.bySummonerId.useQuery(
    {
      summonerId: searchedSummoner?.summoner?.id as string,
      region: region,
    },
    { enabled: Boolean(searchedSummoner) },
  )

  if (summonerStats.isLoading) {
    return <p>Loading...</p>
  }
  if (summonerStats.error) {
    return <p>Error: {summonerStats.error?.message}</p>
  }
  return (
    // <pre>
    //   {JSON.stringify(match, null, 8)}
    // </pre>
    <div className="bg-[#03000e]">
      <div className="container mx-auto py-20">
        <div
          className="p-4 h-[550px] flex items-center rounded-md justify-between summoner-background"
          style={{
            backgroundImage: `url('https://images6.alphacoders.com/105/1050290.jpg')`,
          }}
        >
          <div>
            <div className="text-center w-100">
              <div className="relative rounded-full">
                <img
                  className="w-[120px] h-[120px] rounded-md z-30"
                  src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${searchedSummoner?.summoner?.profileIconId}.png`}
                />
                <small className="text-white text-center absolute bottom-0 left-1/2 z-20 bg-black px-8 rounded-2xl -translate-x-1/2 translate-y-1/2">
                  {searchedSummoner?.summoner?.summonerLevel}
                </small>
              </div>
              <p className="text-[#9E9EB1] py-2">{summonerName}</p>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center">
              <div className="rounded-md">
                <img src="https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/Lux.png" />
                <span className="text-gray-400">Maitrise championLevel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="col-start-2">
          <h2 className="text-3xl mb-2 text-white">Historique des matchs</h2>
        </div>
      </div>
      {summonerStats.data.map((stat: any) => (
        // stat.Participant.map((participant: any) => (
        // )),
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-2">
          <div>
            <div
              key={'data.queueType'}
              className="block p-2 bg-gray-900 border border-gray-200 rounded-lg shadow-md col-span-1 h-114 hover:bg-gray-100 dark:bg-[#191937] dark:border-[#191937] dark:hover:bg-[#29295A]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-lg font-semibold mb-1 text-blue-600 dark:text-blue-300">
                    {stat.gameMode}
                  </h5>
                  <p className="text-sm text-indigo-300">
                    {stat.gameStartTimestamp.toString()}
                  </p>
                </div>
                <div>
                  <p className="text-blue-600 dark:text-blue-300">
                    {stat.Participant.find(
                      (p: any) =>
                        p.summoner?.name === summonerName && p.teamId === 200,
                    )
                      ? 'Victoire'
                      : 'Défaite'}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  {stat.Participant.map((p: any) => (
                    p.summoner.name === summonerName ? ( <img
                      src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${getChampionNameByKey(p.championId)}.png`}
                      alt={'lux'}
                      className="h-6 w-6 rounded-full mr-2"
                    />) : null
                  ))}
                  {/* <img
                    src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/lux.png`}
                    alt={'lux'}
                    className="h-6 w-6 rounded-full mr-2"
                  /> */}
                  <p className="text-sm text-indigo-300">data.championName</p>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                  <p className="text-sm text-indigo-300 mr-2">data.kda</p>
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                  <p className="text-sm text-indigo-300 mr-2">data.cs CS</p>
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                  <p className="text-sm text-indigo-300">
                    data.goldEarned Gold
                  </p>
                </div>
              </div>
            </div>
            <p className="text-center">Aucun match trouvé.</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { summonerName, region } = context.query

  return {
    props: {
      summonerName: summonerName,
      region: region,
    },
  }
}

export default SummonerPage
