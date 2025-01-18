import {
  AccountDto,
  ChampionDto,
  ChampionListDto,
  ChampionMasteryDto,
  LeagueEntryDto,
  SummonerDto,
} from '@/models/riotapi'

const regionsMap: { [key: string]: string } = {
  br: 'br1',
  eune: 'eun1',
  euw: 'euw1',
  jp: 'jp1',
  kr: 'kr',
  lan: 'la1',
  las: 'la2',
  na: 'na1',
  oce: 'oc1',
  ph: 'ph2',
  ru: 'ru',
  sg: 'sg2',
  th: 'th2',
  tr: 'tr1',
  tw: 'tw2',
  vn: 'vn2',
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
  puuid: string
): Promise<ChampionMasteryDto[]> {
  if (!process.env.RIOT_API_KEY) throw new Error('Missing RIOT_API_KEY')

  const regionCode = regionsMap[region.toLowerCase()]
  if (!regionCode) throw new Error('Invalid region')

  const response = await fetch(
    `https://${regionCode}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`,
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

  const regionCode = regionsMap[region.toLowerCase()]
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
  puuid: string
): Promise<SummonerDto> {
  if (!process.env.RIOT_API_KEY) throw new Error('Missing RIOT_API_KEY')

  const regionCode = regionsMap[region.toLowerCase()]
  if (!regionCode) throw new Error('Invalid region')

  const response = await fetch(
    `https://${regionCode}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    {
      headers: {
        'X-Riot-Token': process.env.RIOT_API_KEY,
      },
    }
  )

  return await response.json()
}

export async function getAccount(
  summoner: string
): Promise<AccountDto> {
  if (!process.env.RIOT_API_KEY) throw new Error('Missing RIOT_API_KEY')

  const [gameName, tagLine] = summoner.trim().split('-')
  if (!gameName || !tagLine) throw new Error('Invalid Riot ID')

  const response = await fetch(
    `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
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
