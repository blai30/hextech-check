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
          <td className="px-6 py-4 whitespace-nowrap">
            <span>
              {championNames[championMastery.championId.toString()]}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="font-bold">
              {championMastery.championLevel}
            </span>
            <span className="pl-3">
              {championMastery.championPoints.toLocaleString()}
            </span>
          </td>
          <td className={`px-6 py-4 whitespace-nowrap
            ${championMastery.chestGranted ? 'bg-green-400' : 'bg-red-400'}`}
          >
            <span>
              {championMastery.chestGranted ? 'Yes' : 'No'}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
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
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="table-fixed w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="w-4/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Champion
                  </th>
                  <th
                    scope="col"
                    className="w-3/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Mastery
                  </th>
                  <th
                    scope="col"
                    className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Chest
                  </th>
                  <th
                    scope="col"
                    className="w-4/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Last Played
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {championsTable}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChampionMasteriesTable
