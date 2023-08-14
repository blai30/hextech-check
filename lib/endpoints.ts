import {
  ChampionDto,
  ChampionListDto,
  ChampionMasteryDto,
  LeagueEntryDto,
  SummonerDto,
} from '@/models/riotapi'

const regionsMap: { [key: string]: string } = {
  BR: 'br1',
  EUNE: 'eun1',
  EUW: 'euw1',
  JP: 'jp1',
  KR: 'kr',
  LAN: 'la1',
  LAS: 'la2',
  NA: 'na1',
  OCE: 'oc1',
  PH: 'ph2',
  RU: 'ru',
  SG: 'sg2',
  TH: 'th2',
  TR: 'tr1',
  TW: 'tw2',
  VN: 'vn2',
}

export async function getChampions(version?: string): Promise<{
  [key: number]: ChampionDto
}> {
  if (!version) {
    const versions = await fetch(
      'https://ddragon.leagueoflegends.com/api/versions.json'
    )
    version = (await versions.json())[0]
  }

  const response = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
  )

  const championList: ChampionListDto = await response.json()
  const championsMap: { [key: number]: ChampionDto } = {}
  for (const champion in championList.data) {
    championsMap[championList.data[champion].key] = championList.data[champion]
  }

  return championsMap
}

export async function getChampionMasteries(
  region: string,
  summonerId: string
): Promise<ChampionMasteryDto[]> {
  if (!process.env.RIOT_API_KEY) throw new Error('Missing RIOT_API_KEY')

  const regionCode = regionsMap[region]
  if (!regionCode) throw new Error('Invalid region')

  const response = await fetch(
    `https://${regionCode}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`,
    {
      headers: {
        'X-Riot-Token': process.env.RIOT_API_KEY,
      },
    }
  )

  return await response.json()
}

export async function getLeagues(
  region: string,
  summonerId: string
): Promise<LeagueEntryDto[]> {
  if (!process.env.RIOT_API_KEY) throw new Error('Missing RIOT_API_KEY')

  const regionCode = regionsMap[region]
  if (!regionCode) throw new Error('Invalid region')

  const response = await fetch(
    `https://${regionCode}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`,
    {
      headers: {
        'X-Riot-Token': process.env.RIOT_API_KEY,
      },
    }
  )

  return await response.json()
}

export async function getProfileIconUrl(
  profileIconId: number,
  version?: string
): Promise<string> {
  if (!version) {
    const versions = await fetch(
      'https://ddragon.leagueoflegends.com/api/versions.json'
    )
    version = (await versions.json())[0]
  }

  const profileIconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIconId}.png`
  return profileIconUrl
}

export async function getChampionIconUrl(
  championId: number,
  version?: string
): Promise<string> {
  if (!version) {
    const versions = await fetch(
      'https://ddragon.leagueoflegends.com/api/versions.json'
    )
    version = (await versions.json())[0]
  }

  const championIconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/tiles/${championId}.png`
  return championIconUrl
}

export async function getChampionCardUrl(
  championId: number,
  version?: string
): Promise<string> {
  if (!version) {
    const versions = await fetch(
      'https://ddragon.leagueoflegends.com/api/versions.json'
    )
    version = (await versions.json())[0]
  }

  const championIconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championId}.png`
  return championIconUrl
}

export async function getSummoner(
  region: string,
  summoner: string
): Promise<SummonerDto> {
  if (!process.env.RIOT_API_KEY) throw new Error('Missing RIOT_API_KEY')

  const regionCode = regionsMap[region]
  if (!regionCode) throw new Error('Invalid region')

  const response = await fetch(
    `https://${regionCode}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}`,
    {
      headers: {
        'X-Riot-Token': process.env.RIOT_API_KEY,
      },
    }
  )

  return await response.json()
}

export async function getLatestVersion(): Promise<string> {
  const versions = await fetch(
    'https://ddragon.leagueoflegends.com/api/versions.json'
  )
  return (await versions.json())[0]
}
