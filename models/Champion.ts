export interface Champion {
  blurb: string
  id: number
  image: Image
  info: Info
  key: string
  name: string
  partype: string
  stats: { [key: string]: number }
  tags: number[]
  title: string
}

export interface Image {
  full: string
  group: Group
  height: number
  sprite: Sprite
  width: number
  x: number
  y: number
}

export enum Group {
  Champion = 'champion',
}

export enum Sprite {
  Champion0PNG = 'champion0.png',
  Champion1PNG = 'champion1.png',
  Champion2PNG = 'champion2.png',
  Champion3PNG = 'champion3.png',
  Champion4PNG = 'champion4.png',
  Champion5PNG = 'champion5.png',
}

export interface Info {
  attack: number
  defense: number
  difficulty: number
  magic: number
}
