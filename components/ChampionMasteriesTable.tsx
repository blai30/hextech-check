/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import api from '@/lib/api'
import { Champion, ChampionMastery } from '@/models'

const ChampionMasteriesTable = ({ summonerName, region }: { summonerName: string, region: string }) => {
  const [champions, setChampions] = useState<{ [key: number]: Champion }>({})
  const [championMasteries, setChampionMasteries] = useState<ChampionMastery[]>([])
  const [championsTable, setChampionsTable] = useState<JSX.Element[]>([])

  useEffect(() => {
    const getChampions = async () => {
      const response = await api.get<{ [key: number]: Champion }>('/Champions')
      setChampions(response.data)
    }

    getChampions()
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
      const champion = champions[championMastery.championId]
      const masteryBgColor =
        championMastery.championLevel === 5 ? 'text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900' :
        championMastery.championLevel === 6 ? 'text-fuchsia-700 dark:text-fuchsia-300 bg-fuchsia-50 dark:bg-fuchsia-900' :
        championMastery.championLevel === 7 ? 'text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900' :
        'text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900'
  
      return (
        <tr key={championMastery.championId}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="overflow-hidden flex-shrink-0 h-12 w-12 rounded-full">
                <div className="relative h-14 w-14">
                  <img
                    className="absolute -inset-1 h-full w-full ring-2 ring-white"
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/img/champion/${champion.image.full}`}
                    alt={`Champion icon ${champion.name}`}
                  />
                </div>
              </div>
              <span className="ml-4 text-black dark:text-white">
                {champion.name}
              </span>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex rounded-md">
              <span className={`inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 ${masteryBgColor}`}>
                {championMastery.championLevel}
              </span>
              <span className="inline-flex items-center px-3 rounded-r-md text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
                {championMastery.championPoints.toLocaleString()}
              </span>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap"
          >
            <span>
              {championMastery.chestGranted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400 dark:text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              )}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-gray-600 dark:text-gray-300 underline underline-offset-2 decoration-gray-400 decoration-dotted cursor-help" title={`${format(date, 'PPPP')}\n${format(date, 'pppp')}`}>
              {formatDistanceToNow(date) + ' ago'}
            </span>
          </td>
        </tr>
      )
    })

    setChampionsTable(table)
  }, [championMasteries, champions])

  if (!championsTable) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <div className="text-gray-600 dark:text-gray-300">
            Loading champion masteries...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-700 sm:rounded-lg">
            <table className="table-fixed w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="w-4/12 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Champion
                  </th>
                  <th
                    scope="col"
                    className="w-3/12 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Mastery
                  </th>
                  <th
                    scope="col"
                    className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Chest
                  </th>
                  <th
                    scope="col"
                    className="w-4/12 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Last Played
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
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
