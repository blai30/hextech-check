export interface ChampionMastery {
  championId: number
  championLevel: number
  championPoints: number
  lastPlayTime: Date
  championPointsSinceLastLevel: number
  championPointsUntilNextLevel: number
  chestGranted: boolean
  tokensEarned: number
  summonerId: string
}
