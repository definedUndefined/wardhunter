import React from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { api } from '@/utils/api'
import { League, Mastery, Participant } from '@prisma/client'
import { findParticipantByName, formatTimeDifference } from '@/utils/utils'
import Link from 'next/link'
import { getChampionNameByKey } from '@/lib/constants/champions'
import Navbar from '@/components/Navbar'
import { getSession } from 'next-auth/react'
import { Chart, registerables } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

const SummonerPage: React.FC<InferGetServerSidePropsType<
  typeof getServerSideProps
>> = ({ summonerName, region, session }) => {
  const summonerStats = api.statistics.get.useQuery({
    summonerName: summonerName,
    region: region,
  })

  const participantList: Participant[] | undefined =
    summonerStats.data?.[0]?.Participant

  const searchedSummoner: Participant | undefined =
    participantList && findParticipantByName(participantList, summonerName)

  const leagues = api.league.bySummonerId.useQuery(
    {
      summonerId: searchedSummoner?.summoner?.id as string,
      region: region,
    },
    { enabled: Boolean(searchedSummoner) },
  )

  const masteries = api.mastery.getAll.useQuery(
    {
      summonerId: searchedSummoner?.summoner.id as string,
      region: region,
    },
    { enabled: Boolean(summonerStats) },
  )

  const champMasteries = masteries.data?.slice(0, 3)
  console.log(champMasteries)
  if (summonerStats.isLoading) {
    return <p>Loading...</p>
  }
  if (summonerStats.error) {
    return <p>Error: {summonerStats.error?.message}</p>
  }

  Chart.register(...registerables)

  return (
    <div className="bg-[#03000e]">
      <Navbar session={session} />
      <div className="container mx-auto py-20">
        <div
          className="p-4 h-[550px] flex items-center rounded-md justify-between summoner-background"
          style={{
            backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${
              champMasteries && champMasteries.length > 0
                ? getChampionNameByKey(champMasteries[2].championId)
                : ''
            }_0.jpg')`,
          }}
        >
          <div>
            <div className="w-100">
              <div>
                <div className="rounded-full">
                  <img
                    className="w-[120px] rounded-md z-30"
                    src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${searchedSummoner?.summoner?.profileIconId}.png`}
                  />
                  <small className="text-white text-center bottom-0 left-1/2 z-20 bg-black px-8 rounded-2xl -translate-x-1/2 translate-y-1/2">
                    {searchedSummoner?.summoner?.summonerLevel}
                  </small>
                </div>
              </div>
              <p className="text-[#9E9EB1] py-2">{summonerName}</p>
            </div>
            <div className="flex gap-2">
              {champMasteries?.map((mastery: Mastery) => (
                <img
                  key={mastery.championId}
                  src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${getChampionNameByKey(
                    mastery.championId,
                  )}.png`}
                  alt="Mastered champions"
                  className="h-15 w-15 rounded-md my-4 summoner-background"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2"></div>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="col-start-1">
          <h2 className="text-4xl leading-tight mb-2 text-slate-400 font-bold">
            Historique des matchs
          </h2>
        </div>
        <div className="col-start-3">
          <h2 className="text-4xl leading-tight mb-2 text-slate-400 font-bold">
            {' '}
            /!\ Summoner Stats /!\
          </h2>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-6">
        <div className="col-span-3 container mx-auto">
          {summonerStats.data.map((stat: any) => (
            <div key={stat.matchId} className="mt-8">
              {stat.Participant.map((p: Participant) =>
                p.summoner.name === summonerName ? (
                  <div
                    key={p.summoner.name}
                    className={`block p-2 rounded-lg shadow-md col-span-1 h-114   ${
                      p.win
                        ? 'bg-[#191937] hover:bg-[#29295A]'
                        : 'bg-[#371928] hover:bg-[#5A2942]'
                    }  flex items-center`}
                  >
                    <div>
                      <h5 className="text-md font-semibold mb-1 text-[#9E9EB1]">
                        {stat.gameMode}
                      </h5>
                      {p.win ? (
                        <p className="text-sm font-medium text-[#5383E8]">
                          Victoire
                        </p>
                      ) : (
                        <p className="text-sm font-medium text-[#E84057]">
                          Defaite
                        </p>
                      )}
                      <p className="text-sm text-[#9E9EB1]">
                        Il y'a {formatTimeDifference(stat.gameStartTimestamp)}
                      </p>
                    </div>
                    <div className="flex justify-between w-full">
                      {stat.Participant.map((p: Participant) =>
                        p.summoner.name === summonerName ? (
                          <div
                            key={p.summoner.name}
                            className="text-[#9E9EB1] flex flex-col sm:flex-row justify-evenly sm:items-center  w-full"
                          >
                            {/* Partie champions */}
                            <div className="flex justify-around">
                              <div className="flex items-center">
                                <img
                                  src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${p.championName}.png`}
                                  alt={'lux'}
                                  className="h-12 w-12 rounded-full my-4"
                                />
                                {/* SPELLS + SUMMONER */}
                                <div className="grid grid-cols-2 ml-2 gap-1">
                                  <img
                                    alt={`spell-${p.spell1Casts}`}
                                    src={`http://ddragon.leagueoflegends.com/cdn/13.10.1/img/spell/${p.spell1Casts}.png`}
                                    className="h-4 w-4 rounded-md object-cover"
                                  />
                                  <img
                                    alt={`spell-${p.spell2Casts}`}
                                    src={`http://ddragon.leagueoflegends.com/cdn/13.10.1/img/spell/${p.spell2Casts}.png`}
                                    className="h-4 w-4 rounded-md object-cover"
                                  />
                                  <img
                                    alt={`spell-${p.spell3Casts}`}
                                    src={`http://ddragon.leagueoflegends.com/cdn/13.10.1/img/spell/${p.spell3Casts}.png`}
                                    className="h-4 w-4 rounded-md object-cover"
                                  />
                                  <img
                                    alt={`spell-${p.spell4Casts}`}
                                    src={`http://ddragon.leagueoflegends.com/cdn/13.10.1/img/spell/${p.spell4Casts}.png`}
                                    className="h-4 w-4 rounded-md object-cover"
                                  />
                                </div>
                                {/* ITEMS */}

                                <div className="flex items-center mx-2">
                                  <img
                                    alt={`item-${p.item6}`}
                                    src={`http://ddragon.leagueoflegends.com/cdn/13.10.1/img/item/${p.item6}.png`}
                                    className="h-8 w-8 rounded-md object-cover i"
                                  />
                                  <div className="grid grid-rows-2 grid-col-2">
                                    <div className="row-start-1 col-start-1 flex">
                                      <img
                                        alt={`item-${p.item0}`}
                                        src={`http://ddragon.leagueoflegends.com/cdn/13.10.1/img/item/${p.item0}.png`}
                                        className="h-8 w-8 rounded-md object-cover"
                                      />
                                      <img
                                        alt={`item-${p.item1}`}
                                        src={`http://ddragon.leagueoflegends.com/cdn/13.10.1/img/item/${p.item1}.png`}
                                        className="h-8 w-8 rounded-md object-cover"
                                      />
                                      <img
                                        alt={`item-${p.item2}`}
                                        src={`http://ddragon.leagueoflegends.com/cdn/13.10.1/img/item/${p.item2}.png`}
                                        className="h-8 w-8 rounded-md object-cover"
                                      />
                                    </div>
                                    <div className="row-start-2 col-start-1 flex">
                                      <img
                                        alt={`item-${p.item3}`}
                                        src={`http://ddragon.leagueoflegends.com/cdn/13.10.1/img/item/${p.item3}.png`}
                                        className="h-8 w-8 rounded-md object-cover"
                                      />
                                      <img
                                        alt={`item-${p.item4}`}
                                        src={`http://ddragon.leagueoflegends.com/cdn/13.10.1/img/item/${p.item4}.png`}
                                        className="h-8 w-8 rounded-md object-cover"
                                      />
                                      <img
                                        alt={`item-${p.item5}`}
                                        src={`http://ddragon.leagueoflegends.com/cdn/13.10.1/img/item/${p.item5}.png`}
                                        className="h-8 w-8 rounded-md object-cover"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col items-start justify-end">
                              <div className="flex items-center mr-2">
                                <p>K</p>
                                <div className="w-3 h-3 bg-green-500 rounded-full mx-1"></div>
                                <p className="text-sm text-[#9E9EB1]">
                                  {p.kills}
                                </p>
                              </div>

                              <div className="flex items-center mr-2">
                                <p>D</p>
                                <div className="w-3 h-3 bg-red-500 rounded-full mx-1"></div>
                                <p className="text-sm text-[#9E9EB1]">
                                  {p.deaths}
                                </p>
                              </div>

                              <div className="flex items-center">
                                <p>A</p>
                                <div className="w-3 h-3 bg-blue-500 rounded-full mx-1"></div>
                                <p className="text-sm text-[#9E9EB1]">
                                  {p.assists}
                                </p>
                              </div>
                            </div>

                            {/* Partie equipe */}
                          </div>
                        ) : null,
                      )}
                      <div className="flex items-center justify-center mx-5 gap-8">
                        <ul>
                          {stat.Participant.map((p: Participant) =>
                            p.win ? (
                              <li
                                className="flex items-center h-5"
                                key={p.summoner.name}
                              >
                                <img
                                  src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${p.championName}.png`}
                                  alt={'lux'}
                                  className="h-6 w-6 rounded-full my-4"
                                />
                                <Link
                                  href={`/${region}/${p.summoner.name}`}
                                  className="text-green-500 whitespace-nowrap text-sm hover:text-slate-700"
                                >
                                  {p.summoner.name.length > 8
                                    ? `${p.summoner.name.slice(0, 8)}...`
                                    : p.summoner.name}
                                </Link>
                              </li>
                            ) : null,
                          )}
                        </ul>
                        <ul>
                          {stat.Participant.map((p: Participant) =>
                            !p.win ? (
                              <li
                                className="flex items-center h-5"
                                key={p.summoner.name}
                              >
                                <img
                                  src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${p.championName}.png`}
                                  alt={'lux'}
                                  className="h-6 w-6 rounded-full my-4"
                                />
                                <Link
                                  href="#"
                                  className="text-red-500 whitespace-nowrap text-sm hover:text-slate-700"
                                >
                                  {p.summoner.name.length > 8
                                    ? `${p.summoner.name.slice(0, 8)}...`
                                    : p.summoner.name}
                                </Link>
                              </li>
                            ) : null,
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : null,
              )}
            </div>
          ))}
        </div>
        <div className="col-start-5 col-span-6">
          {leagues.data?.map((league: League) => (
            <div
              key={league.queueType}
              className="max-w-xl block rounded-xl mb-4 text-white border border-transparent overflow-hidden bg-slate-800 summoner-background p-4 shadow-xl sm:p-6 lg:p-8"
            >
              <div className="flex items-start justify-center">
                <div className="flex flex-col">
                  <div>
                    <h3 className="font-bold text-2xl">{league.queueType}</h3>
                    <div>
                      <img
                        src="https://opgg-static.akamaized.net/images/medals_new/gold.png?image=q_auto,f_webp,w_144&amp;v=1684436046850"
                        width="72"
                        alt="GOLD"
                      />
                      <p className="text-lg font-bold text-white sm:text-xl">
                        {league.tier} {league.rank}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-300">
                      {league.leaguePoints} LP
                    </span>
                    <div className="flex flex-col">
                      <p>
                        {league.wins}V - L{league.losses}
                      </p>
                      <p>
                        {Math.round(
                          (league.wins / (league.wins + league.losses)) * 100,
                        )}
                        % WIN RATES
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-[150px] h-[150px] mt-16">
                  <Doughnut
                    data={{
                      labels: ['Win', 'Losses'],
                      datasets: [
                        {
                          label: 'Win rates',
                          data: [league.wins, league.losses],
                          backgroundColor: [
                            'rgb(83, 131, 232)',
                            'rgb(232, 64, 87)',
                          ],
                          borderColor: ['rgba(0, 0, 0, 0)'],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          display: false, // Masquer les étiquettes
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { summonerName, region } = context.query
  const session = await getSession(context)
  return {
    props: {
      summonerName: summonerName,
      region: region,
      session,
    },
  }
}

export default SummonerPage
