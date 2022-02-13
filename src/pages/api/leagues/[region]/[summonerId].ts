import { NextApiRequest, NextApiResponse } from 'next'
import { LolApi } from 'twisted'
import { Regions } from 'twisted/dist/constants'
import { SummonerLeagueDto } from 'twisted/dist/models-dto'

const api = new LolApi()

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SummonerLeagueDto[]>
) => {
  const { summonerId, region } = req.query as { summonerId: string; region: Regions }
  const leagues = await api.League.bySummoner(summonerId, region)
  res.status(200).json(leagues.response)
}

export default handler
