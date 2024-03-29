/**
 * MatchDTO
 * 
 * MatchDTO contains all match information for a single match.
 * 
 * @see [Riot API](https://developer.riotgames.com/apis#match-v5/GET_getMatch)
 */
export type MatchDTO = {
    metadata: MatchMetadataDTO
    info: MatchInfoDTO
}

export type MatchMetadataDTO = {
    dataVersion: string
    matchId: string
    participants: string[]
}

export type MatchInfoDTO = {
    gameCreation: number
    gameDuration: number
    gameEndTimestamp: number
    gameId: number
    gameMode: string
    gameName: string
    gameStartTimestamp: number
    gameType: string
    gameVersion: string
    mapId: number
    participants: ParticipantDTO[]
    platformId: string
    queueId: number
    teams: TeamDTO[]
    tournamentCode: string
}

export type ParticipantDTO = {
    allInPings: number
    assistMePings: number
    assists: number
    baitPings: number
    baronKills: number
    basicPings: number
    bountyLevel: number
    challenges: ChallengesDTO
    champExperience: number
    champLevel: number
    championId: number
    championName: string
    championTransform: number
    commandPings: number
    consumablesPurchased: number
    damageDealtToBuildings: number
    damageDealtToObjectives: number
    damageDealtToTurrets: number
    damageSelfMitigated: number
    dangerPings: number
    deaths: number
    detectorWardsPlaced: number
    doubleKills: number
    dragonKills: number
    eligibleForProgression: boolean
    enemyMissingPings: number
    enemyVisionPings: number
    firstBloodAssist: boolean
    firstBloodKill: boolean
    firstTowerAssist: boolean
    firstTowerKill: boolean
    gameEndedInEarlySurrender: boolean
    gameEndedInSurrender: boolean
    getBackPings: number
    goldEarned: number
    goldSpent: number
    holdPings: number
    individualPosition: string
    inhibitorKills: number
    inhibitorTakedowns: number
    inhibitorsLost: number
    item0: number
    item1: number
    item2: number
    item3: number
    item4: number
    item5: number
    item6: number
    itemsPurchased: number
    killingSprees: number
    kills: number
    lane: string
    largestCriticalStrike: number
    largestKillingSpree: number
    largestMultiKill: number
    longestTimeSpentLiving: number
    magicDamageDealt: number
    magicDamageDealtToChampions: number
    magicDamageTaken: number
    needVisionPings: number
    neutralMinionsKilled: number
    nexusKills: number
    nexusLost: number
    nexusTakedowns: number
    objectivesStolen: number
    objectivesStolenAssists: number
    onMyWayPings: number
    participantId: number
    pentaKills: number
    perks: PerksDTO
    physicalDamageDealt: number
    physicalDamageDealtToChampions: number
    physicalDamageTaken: number
    profileIcon: number
    pushPings: number
    puuid: string
    quadraKills: number
    riotIdName: string
    riotIdTagline: string
    role: string
    sightWardsBoughtInGame: number
    spell1Casts: number
    spell2Casts: number
    spell3Casts: number
    spell4Casts: number
    summoner1Casts: number
    summoner1Id: number
    summoner2Casts: number
    summoner2Id: number
    summonerId: string
    summonerLevel: number
    summonerName: string
    teamEarlySurrendered: boolean
    teamId: number
    teamPosition: string
    timeCCingOthers: number
    timePlayed: number
    totalDamageDealt: number
    totalDamageDealtToChampions: number
    totalDamageShieldedOnTeammates: number
    totalDamageTaken: number
    totalHeal: number
    totalHealsOnTeammates: number
    totalMinionsKilled: number
    totalTimeCCDealt: number
    totalTimeSpentDead: number
    totalUnitsHealed: number
    tripleKills: number
    trueDamageDealt: number
    trueDamageDealtToChampions: number
    trueDamageTaken: number
    turretKills: number
    turretTakedowns: number
    turretsLost: number
    unrealKills: number
    visionClearedPings: number
    visionScore: number
    visionWardsBoughtInGame: number
    wardsKilled: number
    wardsPlaced: number
    win: boolean
}

export type ChallengesDTO = {
    "12AssistStreakCount": number
    abilityUses: number
    acesBefore15Minutes: number
    alliedJungleMonsterKills: number
    baronTakedowns: number
    blastConeOppositeOpponentCount: number
    bountyGold: number
    buffsStolen: number
    completeSupportQuestInTime: number
    controlWardTimeCoverageInRiverOrEnemyHalf?: number
    controlWardsPlaced: number
    damagePerMinute: number
    damageTakenOnTeamPercentage: number
    dancedWithRiftHerald: number
    deathsByEnemyChamps: number
    dodgeSkillShotsSmallWindow: number
    doubleAces: number
    dragonTakedowns: number
    earliestBaron: number
    earliestDragonTakedown: number
    earliestElderDragon: number
    earlyLaningPhaseGoldExpAdvantage: number
    effectiveHealAndShielding: number
    elderDragonKillsWithOpposingSoul: number
    elderDragonMultikills: number
    enemyChampionImmobilizations: number
    enemyJungleMonsterKills: number
    epicMonsterKillsNearEnemyJungler: number
    epicMonsterKillsWithin30SecondsOfSpawn: number
    epicMonsterSteals: number
    epicMonsterStolenWithoutSmite: number
    fastestLegendary: number
    firstTurretKilledTime?: number
    flawlessAces: number
    fullTeamTakedown: number
    gameLength: number
    getTakedownsInAllLanesEarlyJungleAsLaner?: number
    goldPerMinute: number
    hadOpenNexus: number
    immobilizeAndKillWithAlly: number
    initialBuffCount: number
    initialCrabCount: number
    jungleCsBefore10Minutes: number
    junglerTakedownsNearDamagedEpicMonster: number
    kTurretsDestroyedBeforePlatesFall: number
    kda: number
    killAfterHiddenWithAlly: number
    killParticipation: number
    killedChampTookFullTeamDamageSurvived: number
    killingSprees?: number
    killsNearEnemyTurret: number
    killsOnOtherLanesEarlyJungleAsLaner?: number
    killsOnRecentlyHealedByAramPack: number
    killsUnderOwnTurret: number
    killsWithHelpFromEpicMonster: number
    knockEnemyIntoTeamAndKill: number
    landSkillShotsEarlyGame: number
    laneMinionsFirst10Minutes: number
    laningPhaseGoldExpAdvantage: number
    legendaryCount: number
    lostAnInhibitor: number
    maxCsAdvantageOnLaneOpponent: number
    maxKillDeficit: number
    maxLevelLeadLaneOpponent: number
    moreEnemyJungleThanOpponent: number
    multiKillOneSpell: number
    multiTurretRiftHeraldCount: number
    multikills: number
    multikillsAfterAggressiveFlash: number
    mythicItemUsed?: number
    outerTurretExecutesBefore10Minutes: number
    outnumberedKills: number
    outnumberedNexusKill: number
    perfectDragonSoulsTaken: number
    perfectGame: number
    pickKillWithAlly: number
    playedChampSelectPosition: number
    poroExplosions: number
    quickCleanse: number
    quickFirstTurret: number
    quickSoloKills: number
    riftHeraldTakedowns: number
    saveAllyFromDeath: number
    scuttleCrabKills: number
    shortestTimeToAceFromFirstTakedown?: number
    skillshotsDodged: number
    skillshotsHit: number
    snowballsHit: number
    soloBaronKills: number
    soloKills: number
    stealthWardsPlaced: number
    survivedSingleDigitHpCount: number
    survivedThreeImmobilizesInFight: number
    takedownOnFirstTurret: number
    takedowns: number
    takedownsAfterGainingLevelAdvantage: number
    takedownsBeforeJungleMinionSpawn: number
    takedownsFirstXMinutes: number
    takedownsInAlcove: number
    takedownsInEnemyFountain: number
    teamBaronKills: number
    teamDamagePercentage: number
    teamElderDragonKills: number
    teamRiftHeraldKills: number
    threeWardsOneSweeperCount: number
    tookLargeDamageSurvived: number
    turretPlatesTaken: number
    turretTakedowns: number
    turretsTakenWithRiftHerald: number
    twentyMinionsIn3SecondsCount: number
    unseenRecalls: number
    visionScoreAdvantageLaneOpponent: number
    visionScorePerMinute: number
    wardTakedowns: number
    wardTakedownsBefore20M: number
    wardsGuarded: number
    highestWardKills?: number
    junglerKillsEarlyJungle?: number
    killsOnLanersEarlyJungleAsJungler?: number
    baronBuffGoldAdvantageOverThreshold?: number
    teleportTakedowns?: number
    highestChampionDamage?: number
    fasterSupportQuestCompletion?: number
    highestCrowdControlScore?: number
}

export type PerksDTO = {
    statPerks: StatPerksDTO
    styles: StyleDTO[]
}

export type StatPerksDTO = {
    defense: number
    flex: number
    offense: number
}

export type StyleDTO = {
    description: string
    selections: Selection[]
    style: number
}

export type SelectionDTO = {
    perk: number
    var1: number
    var2: number
    var3: number
}

export type TeamDTO = {
    bans: BanDTO[]
    objectives: ObjectivesDTO
    teamId: number
    win: boolean
}

export type BanDTO = {
    championId: number
    pickTurn: number
}

export type ObjectivesDTO = {
    baron: ObjectiveDTO
    champion: ObjectiveDTO
    dragon: ObjectiveDTO
    inhibitor: ObjectiveDTO
    riftHerald: ObjectiveDTO
    tower: ObjectiveDTO
}

export type ObjectiveDTO = {
    first: boolean
    kills: number
}