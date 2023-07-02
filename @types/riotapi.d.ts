declare module 'riotapi' {
  declare type ChampionListDto = {
    type: Type
    format: string
    data: { [key: string]: Datum }
  }
  
  declare type ChampionDto = {
    id: string
    key: string
    name: string
    title: string
    blurb: string
    info: Info
    image: Image
    tags: Tag[]
    partype: string
    stats: { [key: string]: number }
  }
  
  declare type ChampionMasteryDto = {
    puuid: string
    championId: number
    championLevel: number
    championPoints: number
    lastPlayTime: number
    championPointsSinceLastLevel: number
    championPointsUntilNextLevel: number
    chestGranted: boolean
    tokensEarned: number
    summonerId: string
  }
  
  declare type LeagueEntryDto = {
    leagueId: string
    queueType: string
    tier: Tier
    rank: string
    summonerId: string
    summonerName: string
    leaguePoints: number
    wins: number
    losses: number
    veteran: boolean
    inactive: boolean
    freshBlood: boolean
    hotStreak: boolean
  }
  
  declare type SummonerDto = {
    id: string
    accountId: string
    puuid: string
    name: string
    profileIconId: number
    revisionDate: Date
    summonerLevel: number
  }
  
  declare type Image = {
    full: string
    sprite: Sprite
    x: number
    y: number
    w: number
    h: number
  }
  
  declare type Info = {
    attack: number
    defense: number
    magic: number
    difficulty: number
  }
  
  declare enum Sprite {
    Champion0PNG = 'champion0.png',
    Champion1PNG = 'champion1.png',
    Champion2PNG = 'champion2.png',
    Champion3PNG = 'champion3.png',
    Champion4PNG = 'champion4.png',
    Champion5PNG = 'champion5.png',
  }
  
  declare enum Tag {
    Assassin = 'Assassin',
    Fighter = 'Fighter',
    Mage = 'Mage',
    Marksman = 'Marksman',
    Support = 'Support',
    Tank = 'Tank',
  }

  declare enum Tier {
    UNRANKED = 'UNRANKED',
    IRON = 'IRON',
    BRONZE = 'BRONZE',
    SILVER = 'SILVER',
    GOLD = 'GOLD',
    PLATINUM = 'PLATINUM',
    DIAMOND = 'DIAMOND',
    MASTER = 'MASTER',
    GRANDMASTER = 'GRANDMASTER',
    CHALLENGER = 'CHALLENGER',
  }
}
