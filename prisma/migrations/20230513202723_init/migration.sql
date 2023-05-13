-- CreateTable
CREATE TABLE "Champion" (
    "version" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "key" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "blurb" TEXT NOT NULL,
    "tags" TEXT[],
    "partype" TEXT NOT NULL,

    CONSTRAINT "Champion_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "ChampionInfo" (
    "id" SERIAL NOT NULL,
    "championId" INTEGER NOT NULL,
    "attack" SMALLINT NOT NULL,
    "defense" SMALLINT NOT NULL,
    "magic" SMALLINT NOT NULL,
    "difficulty" SMALLINT NOT NULL,

    CONSTRAINT "ChampionInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChampionImage" (
    "id" SERIAL NOT NULL,
    "championId" INTEGER NOT NULL,
    "full" TEXT NOT NULL,
    "sprite" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "x" SMALLINT NOT NULL,
    "y" SMALLINT NOT NULL,
    "w" SMALLINT NOT NULL,
    "h" SMALLINT NOT NULL,

    CONSTRAINT "ChampionImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChampionStats" (
    "id" SERIAL NOT NULL,
    "championId" INTEGER NOT NULL,
    "hp" SMALLINT NOT NULL,
    "hpperlevel" DOUBLE PRECISION NOT NULL,
    "mp" SMALLINT NOT NULL,
    "mpperlevel" DOUBLE PRECISION NOT NULL,
    "movespeed" SMALLINT NOT NULL,
    "armor" SMALLINT NOT NULL,
    "armorperlevel" DOUBLE PRECISION NOT NULL,
    "spellblock" SMALLINT NOT NULL,
    "spellblockperlevel" DOUBLE PRECISION NOT NULL,
    "attackrange" SMALLINT NOT NULL,
    "hpregen" DOUBLE PRECISION NOT NULL,
    "hpregenperlevel" DOUBLE PRECISION NOT NULL,
    "mpregen" DOUBLE PRECISION NOT NULL,
    "mpregenperlevel" DOUBLE PRECISION NOT NULL,
    "crit" SMALLINT NOT NULL,
    "critperlevel" DOUBLE PRECISION NOT NULL,
    "attackdamage" SMALLINT NOT NULL,
    "attackdamageperlevel" DOUBLE PRECISION NOT NULL,
    "attackspeedperlevel" DOUBLE PRECISION NOT NULL,
    "attackspeed" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ChampionStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Summoner" (
    "id" VARCHAR(63) NOT NULL,
    "accountId" VARCHAR(56) NOT NULL,
    "puuid" CHAR(78) NOT NULL,
    "name" TEXT NOT NULL,
    "profileIconId" INTEGER NOT NULL,
    "revisionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "summonerLevel" INTEGER NOT NULL,
    "region" TEXT NOT NULL,

    CONSTRAINT "Summoner_pkey" PRIMARY KEY ("puuid")
);

-- CreateTable
CREATE TABLE "Match" (
    "matchId" TEXT NOT NULL,
    "gameCreation" TIMESTAMP(3) NOT NULL,
    "gameDuration" INTEGER NOT NULL,
    "gameEndTimestamp" TIMESTAMP(3) NOT NULL,
    "gameId" TEXT NOT NULL,
    "gameMode" TEXT NOT NULL,
    "gameName" TEXT NOT NULL,
    "gameStartTimestamp" TIMESTAMP(3) NOT NULL,
    "gameType" TEXT NOT NULL,
    "gameVersion" TEXT NOT NULL,
    "mapId" SMALLINT NOT NULL,
    "platformId" TEXT NOT NULL,
    "queueId" SMALLINT NOT NULL,
    "tournamentCode" TEXT NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("matchId")
);

-- CreateTable
CREATE TABLE "Team" (
    "matchId" TEXT NOT NULL,
    "teamId" SMALLINT NOT NULL,
    "win" BOOLEAN NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("matchId","teamId")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "puuid" CHAR(78) NOT NULL,
    "championId" INTEGER NOT NULL,
    "teamId" SMALLINT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "League" (
    "id" SERIAL NOT NULL,
    "leagueId" TEXT NOT NULL,
    "queueType" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "summonerId" TEXT NOT NULL,
    "summonerName" TEXT NOT NULL,
    "leaguePoints" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "veteran" BOOLEAN NOT NULL,
    "inactive" BOOLEAN NOT NULL,
    "freshBlood" BOOLEAN NOT NULL,
    "hotStreak" BOOLEAN NOT NULL,
    "name" TEXT,
    "revisionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MiniSeries" (
    "id" SERIAL NOT NULL,
    "losses" INTEGER NOT NULL,
    "progress" TEXT NOT NULL,
    "target" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "leagueId" TEXT NOT NULL,
    "summonerId" TEXT NOT NULL,
    "region" TEXT NOT NULL,

    CONSTRAINT "MiniSeries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mastery" (
    "id" SERIAL NOT NULL,
    "championId" INTEGER NOT NULL,
    "championLevel" INTEGER NOT NULL,
    "championPoints" INTEGER NOT NULL,
    "lastPlayTime" TIMESTAMP(3) NOT NULL,
    "championPointsSinceLastLevel" INTEGER NOT NULL,
    "championPointsUntilNextLevel" INTEGER NOT NULL,
    "chestGranted" BOOLEAN NOT NULL,
    "region" TEXT NOT NULL,
    "summonerId" TEXT NOT NULL,
    "tokensEarned" INTEGER NOT NULL,
    "revisionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mastery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Champion_version_id_key" ON "Champion"("version", "id");

-- CreateIndex
CREATE UNIQUE INDEX "ChampionInfo_championId_key" ON "ChampionInfo"("championId");

-- CreateIndex
CREATE UNIQUE INDEX "ChampionImage_championId_key" ON "ChampionImage"("championId");

-- CreateIndex
CREATE UNIQUE INDEX "ChampionStats_championId_key" ON "ChampionStats"("championId");

-- CreateIndex
CREATE UNIQUE INDEX "Summoner_region_id_key" ON "Summoner"("region", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_matchId_puuid_key" ON "Participant"("matchId", "puuid");

-- CreateIndex
CREATE UNIQUE INDEX "League_leagueId_summonerId_region_key" ON "League"("leagueId", "summonerId", "region");

-- CreateIndex
CREATE UNIQUE INDEX "MiniSeries_leagueId_summonerId_region_key" ON "MiniSeries"("leagueId", "summonerId", "region");

-- CreateIndex
CREATE UNIQUE INDEX "Mastery_championId_summonerId_region_key" ON "Mastery"("championId", "summonerId", "region");

-- AddForeignKey
ALTER TABLE "ChampionInfo" ADD CONSTRAINT "ChampionInfo_championId_fkey" FOREIGN KEY ("championId") REFERENCES "Champion"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChampionImage" ADD CONSTRAINT "ChampionImage_championId_fkey" FOREIGN KEY ("championId") REFERENCES "Champion"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChampionStats" ADD CONSTRAINT "ChampionStats_championId_fkey" FOREIGN KEY ("championId") REFERENCES "Champion"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("matchId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("matchId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_puuid_fkey" FOREIGN KEY ("puuid") REFERENCES "Summoner"("puuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_championId_fkey" FOREIGN KEY ("championId") REFERENCES "Champion"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_teamId_matchId_fkey" FOREIGN KEY ("teamId", "matchId") REFERENCES "Team"("teamId", "matchId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "League" ADD CONSTRAINT "League_summonerId_region_fkey" FOREIGN KEY ("summonerId", "region") REFERENCES "Summoner"("id", "region") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MiniSeries" ADD CONSTRAINT "MiniSeries_leagueId_summonerId_region_fkey" FOREIGN KEY ("leagueId", "summonerId", "region") REFERENCES "League"("leagueId", "summonerId", "region") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mastery" ADD CONSTRAINT "Mastery_championId_fkey" FOREIGN KEY ("championId") REFERENCES "Champion"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mastery" ADD CONSTRAINT "Mastery_summonerId_region_fkey" FOREIGN KEY ("summonerId", "region") REFERENCES "Summoner"("id", "region") ON DELETE RESTRICT ON UPDATE CASCADE;
