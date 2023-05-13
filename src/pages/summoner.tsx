import Head from "next/head";

import { api } from "@/utils/api";

export default function SummonerPage() {
  const summoner = api.summoner.byName.useQuery({
    summonerName: "XI Persès",
    region: "euw1",
  });

  if(!summoner.data) return (<p>Loading...</p>);

  if(summoner.error) return (<p>Error: {summoner.error.message}</p>);

  return (
    <>
      <Head>
        <title>Summoner Page</title>
      </Head>
      <main>
        <p>Summoner : XI Persès</p>
        <pre>{JSON.stringify(summoner.data, null, 2)}</pre>
      </main>
    </>
  );
}
