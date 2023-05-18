import Head from "next/head";

import { api } from "@/utils/api";

export default function StatsPage() {
  const stats = api.statistics.get.useQuery({
    summonerName: "Jungkko404",
    region: "euw1",
  });

  const junkkoSummonerId = stats.data?.[0]?.Participant.find(participant => participant.summoner.name === "Jungkko404")?.summoner.id

  const leagues = api.league.bySummonerId.useQuery({
    summonerId: junkkoSummonerId as string,
    region: "euw1",
  }, {
    enabled: !!junkkoSummonerId
  });

  if (!stats.data) return <p>Loading stats...</p>;
  if(!leagues.data) return <p>Loading leagues...</p>;

  if (stats.error || leagues.error) return <p>Error</p>;

  return (
    <>
      <Head>
        <title>Stats Page</title>
      </Head>
      <main>
        <pre>{JSON.stringify(leagues.data, null, 2)}</pre>
        <pre>{JSON.stringify(stats.data, null, 8)}</pre>
      </main>
    </>
  );
}
