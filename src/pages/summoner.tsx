import Head from "next/head";

import { api } from "@/utils/api";

export default function SummonerPage() {


  // const summoner = api.summoner.byName.useQuery({
  //   summonerName: "XI Persès",
  //   region: "euw1",
  // });

  // const matchs = api.match.list.useQuery({
  //   puuid: summoner.data!.puuid,
  //   region: 'europe'
  // }, {enabled: Boolean(summoner.data?.puuid)})

  const summonerStats = api.stats.getStats.useQuery({
  const summoner = api.summoner.byName.useQuery({


  const match = api.match.list.useQuery({
    puuid: summoner.data?.puuid as string,
    region: "europe"
  }, { enabled: !!summoner.data?.puuid });

  if(!summoner.data) return (<p>Loading...</p>);

  if(!summonerStats.data) return (<p>Loading...</p>);

  if(summonerStats.error) return (<p>Error: {summonerStats.error.message}</p>);

  return (
    <>
      <Head>
        <title>Summoner Page</title>
      </Head>
      <main>

        <p>Summoner: XI Persès</p>
        <pre>{JSON.stringify(summonerStats.data, null, 8)}</pre>
        {/* <pre>{JSON.stringify(matchs.data, null, 2)}</pre> */}
        <p>Summoner : {summoner.data.name}</p>
        <pre>{JSON.stringify(match.data, null, 4)}</pre>
      </main>
    </>
  );
}
