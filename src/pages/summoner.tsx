import Head from "next/head";

import { api } from "@/utils/api";

export default function SummonerPage() {
  const summoner = api.summoner.byName.useQuery({
    summonerName: "Jungkko404",
    region: "euw1",
  });

  const match = api.match.list.useQuery({
    puuid: summoner.data?.puuid as string,
    region: "europe"
  }, { enabled: !!summoner.data?.puuid });

  if(!summoner.data) return (<p>Loading...</p>);

  if(summoner.error) return (<p>Error: {summoner.error.message}</p>);

  return (
    <>
      <Head>
        <title>Summoner Page</title>
      </Head>
      <main>
        <p>Summoner : {summoner.data.name}</p>
        <pre>{JSON.stringify(match.data, null, 4)}</pre>
      </main>
    </>
  );
}
