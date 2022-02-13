import { NextApiRequest, NextApiResponse } from 'next'
import { LolApi } from 'twisted'
import { Regions } from 'twisted/dist/constants'
import { ChampionMasteryDTO } from 'twisted/dist/models-dto'

const api = new LolApi()

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ChampionMasteryDTO[]>
) => {
  const { name, region } = req.query as { name: string; region: Regions }
  const masteries = await api.Champion.masteryBySummoner(name, region)
  res.status(200).json(masteries.response)
}

export default handler
