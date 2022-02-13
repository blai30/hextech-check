import { NextApiRequest, NextApiResponse } from 'next'
import { LolApi } from 'twisted'
import { ChampionsDataDragonDetails } from 'twisted/dist/models-dto'

const api = new LolApi()

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Map<number, ChampionsDataDragonDetails>>
) => {
  const champions = await api.DataDragon.getChampion()
  const array = Object.values(champions.data)
  const map = new Map(array.map((champion) => [+champion.key, champion]))
  res.status(200).json(map)
}

export default handler
