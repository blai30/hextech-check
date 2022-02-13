import { NextApiRequest, NextApiResponse } from 'next'
import { LolApi } from 'twisted'
import { Regions } from 'twisted/dist/constants'
import { SummonerV4DTO } from 'twisted/dist/models-dto'

const api = new LolApi()

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SummonerV4DTO>
) => {
  const { name, region } = req.query as { name: string; region: Regions }
  const summoner = await api.Summoner.getByName(name, region)
  res.status(200).json(summoner.response)
}

export default handler
