export interface Champion {
  allyTips: string[]
  blurb: string
  enemyTips: string[]
  id: number
  image: Image
  info: Info
  key: string
  lore: string
  name: string
  partype: string
  passive: Passive
  recommendedItems: any[]
  skins: Skin[]
  spells: Spell[]
  stats: { [key: string]: number }
  tags: number[]
  title: string
}

export interface Image {
  full: string
  group: string
  height: number
  sprite: string
  width: number
  x: number
  y: number
}

export interface Info {
  attack: number
  defense: number
  difficulty: number
  magic: number
}

export interface Passive {
  description: string
  image: Image
  name: string
  sanitizedDescription: null
}

export interface Skin {
  id: string
  name: string
  num: number
}

export interface Spell {
  altimages: null
  cooldowns: number[]
  cooldownBurn: string
  costs: number[]
  costBurn: string
  costType: string
  description: string
  effects: Array<number[] | null>
  effectBurns: Array<null | string>
  image: Image
  key: string
  levelTip: LevelTip
  maxRank: number
  name: string
  range: Array<any[]>
  rangeBurn: string
  resource: string
  sanitizedDescription: null
  sanitizedTooltip: null
  tooltip: string
  vars: any[]
}

export interface LevelTip {
  effects: string[]
  labels: string[]
}
