/* eslint-disable @next/next/no-img-element */
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
      const championName = championNames[championMastery.championId.toString()]
      const masteryBgColor = (
        championMastery.championLevel === 5 ? 'text-red-700 bg-red-50' :
        championMastery.championLevel === 6 ? 'text-fuchsia-700 bg-fuchsia-50' :
        championMastery.championLevel === 7 ? 'text-green-700 bg-green-50' : '')
  
      return (
        <tr key={championMastery.championId}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10">
                <img
                  className="h-10 w-10 rounded-full ring-2 ring-white"
                  src={`${process.env.BASE_PATH}/img/profileicon/29.png`}
                  alt={`Champion icon ${championName}`}
                />
              </div>
              <span className="ml-4">
                {championName}
              </span>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex rounded-md">
              <span className={`inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 font-bold ${masteryBgColor}`}>
                {championMastery.championLevel}
              </span>
              <span className="inline-flex items-center px-3 rounded-r-md border border-gray-300">
                {championMastery.championPoints.toLocaleString()}
              </span>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap"
          >
            <span>
              {championMastery.chestGranted && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
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
