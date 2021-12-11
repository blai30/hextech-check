import { useEffect, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import api from '@/lib/api'
import { ChampionMastery } from '@/models'

const ChampionMasteriesTable = ({ summonerName, region }: { summonerName: string, region: string }) => {
  const [championNames, setChampionNames] = useState<{ [key: string]: string }>({})
  const [championMasteries, setChampionMasteries] = useState<ChampionMastery[]>([])
  const [championsTable, setChampionsTable] = useState<JSX.Element[]>([])

  useEffect(() => {
    const getChampionNames = async () => {
      const response = await api.get<{ [key: string]: string }>('/ChampionNames')
      setChampionNames(response.data)
    }

    getChampionNames()
  }, [])

  useEffect(() => {
    const getChampionMasteries = async () => {
      const response = await api.get<ChampionMastery[]>(`/ChampionMasteries/${region}/${summonerName}`)
      setChampionMasteries(response.data)
    }

    getChampionMasteries()
  }, [summonerName, region])

  useEffect(() => {
    const table = championMasteries.map((championMastery) => {
      const date = new Date(championMastery.lastPlayTime + 'Z')
  
      return (
        <tr key={championMastery.championId}>
          <td>
            <span>
              {championNames[championMastery.championId.toString()]}
            </span>
          </td>
          <td>
            <span className="font-bold">
              {championMastery.championLevel}
            </span>
            <span className="pl-3">
              {championMastery.championPoints.toLocaleString()}
            </span>
          </td>
          <td className={`${championMastery.chestGranted ? 'bg-green-400' : 'bg-red-400'}`}>
            <span>
              {championMastery.chestGranted ? 'Yes' : 'No'}
            </span>
          </td>
          <td>
            <span className="underline underline-offset-2 decoration-gray-400 decoration-dotted cursor-help" title={`${format(date, 'PPPP')}\n${format(date, 'pppp')}`}>
              {formatDistanceToNow(date) + ' ago'}
            </span>
          </td>
        </tr>
      )
    })

    setChampionsTable(table)
  }, [championMasteries, championNames])

  return (
    <table className="table-fixed w-full">
      <thead>
        <tr>
          <th className="w-4/12 text-left">Champion</th>
          <th className="w-3/12 text-left">Mastery</th>
          <th className="w-1/12 text-left">Chest</th>
          <th className="w-4/12 text-left">Last Played</th>
        </tr>
      </thead>
      <tbody>
        {championsTable}
      </tbody>
    </table>
  )
}

export default ChampionMasteriesTable
