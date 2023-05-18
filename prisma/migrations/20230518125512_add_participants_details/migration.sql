/*
  Warnings:

  - Added the required column `allInPings` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assistMePings` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assists` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baitPings` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baronKills` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `basicPings` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bountyLevel` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `champExperience` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `champLevel` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `championName` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `championTransform` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commandPings` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consumablesPurchased` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `damageDealtToBuildings` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `damageDealtToObjectives` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `damageDealtToTurrets` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `damageSelfMitigated` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dangerPings` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deaths` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detectorWardsPlaced` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doubleKills` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dragonKills` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eligibleForProgression` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enemyMissingPings` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enemyVisionPings` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstBloodAssist` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstBloodKill` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstTowerAssist` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstTowerKill` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameEndedInEarlySurrender` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameEndedInSurrender` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `getBackPings` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goldEarned` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goldSpent` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `holdPings` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `individualPosition` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inhibitorKills` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inhibitorTakedowns` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inhibitorsLost` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item0` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item1` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item2` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item3` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item4` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item5` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item6` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemsPurchased` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `killingSprees` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kills` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lane` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `largestCriticalStrike` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `largestKillingSpree` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `largestMultiKill` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longestTimeSpentLiving` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `magicDamageDealt` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `magicDamageDealtToChampions` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `magicDamageTaken` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `needVisionPings` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neutralMinionsKilled` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nexusKills` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nexusLost` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nexusTakedowns` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objectivesStolen` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objectivesStolenAssists` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `onMyWayPings` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participantId` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pentaKills` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `physicalDamageDealt` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `physicalDamageDealtToChampions` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `physicalDamageTaken` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileIcon` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pushPings` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quadraKills` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `riotIdName` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `riotIdTagline` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sightWardsBoughtInGame` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spell1Casts` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spell2Casts` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spell3Casts` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spell4Casts` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summoner1Casts` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summoner1Id` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summoner2Casts` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summoner2Id` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summonerId` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summonerLevel` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summonerName` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamEarlySurrendered` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamPosition` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeCCingOthers` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timePlayed` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDamageDealt` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDamageDealtToChampions` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDamageShieldedOnTeammates` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDamageTaken` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalHeal` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalHealsOnTeammates` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalMinionsKilled` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTimeCCDealt` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTimeSpentDead` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalUnitsHealed` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tripleKills` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trueDamageDealt` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trueDamageDealtToChampions` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trueDamageTaken` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turretKills` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turretTakedowns` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turretsLost` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unrealKills` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visionClearedPings` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visionScore` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visionWardsBoughtInGame` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wardsKilled` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wardsPlaced` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `win` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "allInPings" SMALLINT NOT NULL,
ADD COLUMN     "assistMePings" SMALLINT NOT NULL,
ADD COLUMN     "assists" SMALLINT NOT NULL,
ADD COLUMN     "baitPings" SMALLINT NOT NULL,
ADD COLUMN     "baronKills" SMALLINT NOT NULL,
ADD COLUMN     "basicPings" SMALLINT NOT NULL,
ADD COLUMN     "bountyLevel" SMALLINT NOT NULL,
ADD COLUMN     "champExperience" INTEGER NOT NULL,
ADD COLUMN     "champLevel" SMALLINT NOT NULL,
ADD COLUMN     "championName" TEXT NOT NULL,
ADD COLUMN     "championTransform" INTEGER NOT NULL,
ADD COLUMN     "commandPings" SMALLINT NOT NULL,
ADD COLUMN     "consumablesPurchased" SMALLINT NOT NULL,
ADD COLUMN     "damageDealtToBuildings" INTEGER NOT NULL,
ADD COLUMN     "damageDealtToObjectives" INTEGER NOT NULL,
ADD COLUMN     "damageDealtToTurrets" INTEGER NOT NULL,
ADD COLUMN     "damageSelfMitigated" INTEGER NOT NULL,
ADD COLUMN     "dangerPings" SMALLINT NOT NULL,
ADD COLUMN     "deaths" SMALLINT NOT NULL,
ADD COLUMN     "detectorWardsPlaced" SMALLINT NOT NULL,
ADD COLUMN     "doubleKills" SMALLINT NOT NULL,
ADD COLUMN     "dragonKills" SMALLINT NOT NULL,
ADD COLUMN     "eligibleForProgression" BOOLEAN NOT NULL,
ADD COLUMN     "enemyMissingPings" SMALLINT NOT NULL,
ADD COLUMN     "enemyVisionPings" SMALLINT NOT NULL,
ADD COLUMN     "firstBloodAssist" BOOLEAN NOT NULL,
ADD COLUMN     "firstBloodKill" BOOLEAN NOT NULL,
ADD COLUMN     "firstTowerAssist" BOOLEAN NOT NULL,
ADD COLUMN     "firstTowerKill" BOOLEAN NOT NULL,
ADD COLUMN     "gameEndedInEarlySurrender" BOOLEAN NOT NULL,
ADD COLUMN     "gameEndedInSurrender" BOOLEAN NOT NULL,
ADD COLUMN     "getBackPings" SMALLINT NOT NULL,
ADD COLUMN     "goldEarned" INTEGER NOT NULL,
ADD COLUMN     "goldSpent" INTEGER NOT NULL,
ADD COLUMN     "holdPings" SMALLINT NOT NULL,
ADD COLUMN     "individualPosition" TEXT NOT NULL,
ADD COLUMN     "inhibitorKills" SMALLINT NOT NULL,
ADD COLUMN     "inhibitorTakedowns" SMALLINT NOT NULL,
ADD COLUMN     "inhibitorsLost" SMALLINT NOT NULL,
ADD COLUMN     "item0" SMALLINT NOT NULL,
ADD COLUMN     "item1" SMALLINT NOT NULL,
ADD COLUMN     "item2" SMALLINT NOT NULL,
ADD COLUMN     "item3" SMALLINT NOT NULL,
ADD COLUMN     "item4" SMALLINT NOT NULL,
ADD COLUMN     "item5" SMALLINT NOT NULL,
ADD COLUMN     "item6" SMALLINT NOT NULL,
ADD COLUMN     "itemsPurchased" SMALLINT NOT NULL,
ADD COLUMN     "killingSprees" SMALLINT NOT NULL,
ADD COLUMN     "kills" SMALLINT NOT NULL,
ADD COLUMN     "lane" TEXT NOT NULL,
ADD COLUMN     "largestCriticalStrike" SMALLINT NOT NULL,
ADD COLUMN     "largestKillingSpree" SMALLINT NOT NULL,
ADD COLUMN     "largestMultiKill" SMALLINT NOT NULL,
ADD COLUMN     "longestTimeSpentLiving" SMALLINT NOT NULL,
ADD COLUMN     "magicDamageDealt" INTEGER NOT NULL,
ADD COLUMN     "magicDamageDealtToChampions" INTEGER NOT NULL,
ADD COLUMN     "magicDamageTaken" INTEGER NOT NULL,
ADD COLUMN     "needVisionPings" SMALLINT NOT NULL,
ADD COLUMN     "neutralMinionsKilled" SMALLINT NOT NULL,
ADD COLUMN     "nexusKills" SMALLINT NOT NULL,
ADD COLUMN     "nexusLost" SMALLINT NOT NULL,
ADD COLUMN     "nexusTakedowns" SMALLINT NOT NULL,
ADD COLUMN     "objectivesStolen" SMALLINT NOT NULL,
ADD COLUMN     "objectivesStolenAssists" SMALLINT NOT NULL,
ADD COLUMN     "onMyWayPings" SMALLINT NOT NULL,
ADD COLUMN     "participantId" SMALLINT NOT NULL,
ADD COLUMN     "pentaKills" SMALLINT NOT NULL,
ADD COLUMN     "physicalDamageDealt" INTEGER NOT NULL,
ADD COLUMN     "physicalDamageDealtToChampions" INTEGER NOT NULL,
ADD COLUMN     "physicalDamageTaken" INTEGER NOT NULL,
ADD COLUMN     "profileIcon" INTEGER NOT NULL,
ADD COLUMN     "pushPings" SMALLINT NOT NULL,
ADD COLUMN     "quadraKills" SMALLINT NOT NULL,
ADD COLUMN     "riotIdName" TEXT NOT NULL,
ADD COLUMN     "riotIdTagline" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "sightWardsBoughtInGame" SMALLINT NOT NULL,
ADD COLUMN     "spell1Casts" SMALLINT NOT NULL,
ADD COLUMN     "spell2Casts" SMALLINT NOT NULL,
ADD COLUMN     "spell3Casts" SMALLINT NOT NULL,
ADD COLUMN     "spell4Casts" SMALLINT NOT NULL,
ADD COLUMN     "summoner1Casts" SMALLINT NOT NULL,
ADD COLUMN     "summoner1Id" SMALLINT NOT NULL,
ADD COLUMN     "summoner2Casts" SMALLINT NOT NULL,
ADD COLUMN     "summoner2Id" SMALLINT NOT NULL,
ADD COLUMN     "summonerId" TEXT NOT NULL,
ADD COLUMN     "summonerLevel" SMALLINT NOT NULL,
ADD COLUMN     "summonerName" TEXT NOT NULL,
ADD COLUMN     "teamEarlySurrendered" BOOLEAN NOT NULL,
ADD COLUMN     "teamPosition" TEXT NOT NULL,
ADD COLUMN     "timeCCingOthers" INTEGER NOT NULL,
ADD COLUMN     "timePlayed" INTEGER NOT NULL,
ADD COLUMN     "totalAllyJungleMinionsKilled" SMALLINT NOT NULL DEFAULT 0,
ADD COLUMN     "totalDamageDealt" INTEGER NOT NULL,
ADD COLUMN     "totalDamageDealtToChampions" INTEGER NOT NULL,
ADD COLUMN     "totalDamageShieldedOnTeammates" INTEGER NOT NULL,
ADD COLUMN     "totalDamageTaken" INTEGER NOT NULL,
ADD COLUMN     "totalEnemyJungleMinionsKilled" SMALLINT NOT NULL DEFAULT 0,
ADD COLUMN     "totalHeal" INTEGER NOT NULL,
ADD COLUMN     "totalHealsOnTeammates" INTEGER NOT NULL,
ADD COLUMN     "totalMinionsKilled" SMALLINT NOT NULL,
ADD COLUMN     "totalTimeCCDealt" INTEGER NOT NULL,
ADD COLUMN     "totalTimeSpentDead" INTEGER NOT NULL,
ADD COLUMN     "totalUnitsHealed" SMALLINT NOT NULL,
ADD COLUMN     "tripleKills" SMALLINT NOT NULL,
ADD COLUMN     "trueDamageDealt" INTEGER NOT NULL,
ADD COLUMN     "trueDamageDealtToChampions" INTEGER NOT NULL,
ADD COLUMN     "trueDamageTaken" INTEGER NOT NULL,
ADD COLUMN     "turretKills" SMALLINT NOT NULL,
ADD COLUMN     "turretTakedowns" SMALLINT NOT NULL,
ADD COLUMN     "turretsLost" SMALLINT NOT NULL,
ADD COLUMN     "unrealKills" SMALLINT NOT NULL,
ADD COLUMN     "visionClearedPings" SMALLINT NOT NULL,
ADD COLUMN     "visionScore" INTEGER NOT NULL,
ADD COLUMN     "visionWardsBoughtInGame" SMALLINT NOT NULL,
ADD COLUMN     "wardsKilled" SMALLINT NOT NULL,
ADD COLUMN     "wardsPlaced" SMALLINT NOT NULL,
ADD COLUMN     "win" BOOLEAN NOT NULL;
