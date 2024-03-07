export interface ChampionListDto {
  type: string
  format: string
  data: { [key: string]: ChampionDto }
}

export interface ChampionDto {
  id: string
  key: number
  name: string
  title: string
  blurb: string
  info: Info
  image: Image
  tags: Tag[]
  partype: string
  stats: { [key: string]: number }
}

export interface ChampionMasteryDto {
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

export interface LeagueEntryDto {
  leagueId: string
  queueType: string
  tier: TierKey
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

export interface AccountDto {
  puuid: string
  gameName: string
  tagLine: string
}

export interface SummonerDto {
  id: string
  accountId: string
  puuid: string
  name: string
  profileIconId: number
  revisionDate: Date
  summonerLevel: number
}

export interface Image {
  full: string
  sprite: Sprite
  x: number
  y: number
  w: number
  h: number
}

export interface Info {
  attack: number
  defense: number
  magic: number
  difficulty: number
}

export enum Sprite {
  Champion0PNG = 'champion0.png',
  Champion1PNG = 'champion1.png',
  Champion2PNG = 'champion2.png',
  Champion3PNG = 'champion3.png',
  Champion4PNG = 'champion4.png',
  Champion5PNG = 'champion5.png',
}

export enum Tag {
  Assassin = 'Assassin',
  Fighter = 'Fighter',
  Mage = 'Mage',
  Marksman = 'Marksman',
  Support = 'Support',
  Tank = 'Tank',
}

export const Tier = {
  Unranked: 'UNRANKED',
  Iron: 'IRON',
  Bronze: 'BRONZE',
  Silver: 'SILVER',
  Gold: 'GOLD',
  Platinum: 'PLATINUM',
  Emerald: 'EMERALD',
  Diamond: 'DIAMOND',
  Master: 'MASTER',
  Grandmaster: 'GRANDMASTER',
  Challenger: 'CHALLENGER',
} as const

export type TierKey = typeof Tier[keyof typeof Tier]

export const TierOrder: { [key in TierKey]: number } = {
  UNRANKED: 0,
  IRON: 1,
  BRONZE: 2,
  SILVER: 3,
  GOLD: 4,
  PLATINUM: 5,
  EMERALD: 6,
  DIAMOND: 7,
  MASTER: 8,
  GRANDMASTER: 9,
  CHALLENGER: 10,
} as const
