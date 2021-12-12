/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import api from '@/lib/api'
import { Summoner } from '@/models'

const SummonerDetails = ({ region, summonerName }: { summonerName: string, region: string }) => {
  const [summoner, setSummoner] = useState<Summoner>()

  useEffect(() => {
    const getSummoner = async () => {
      const response = await api.get(`/Summoners/${region}/${summonerName}`)
      setSummoner(response.data)
    }

    getSummoner()
  }, [region, summonerName])

  if (!summoner) {
    return (
      <div className="p-6 text-black dark:text-white bg-white dark:bg-gray-900 rounded-lg shadow">
        <div className="flex flex-row items-center">
          Loading summoner details...
        </div>
      </div>
    )
  }

  const date = new Date(summoner.revisionDate + 'Z')

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex flex-row items-center">
        <div className="flex-col">
          <img
            className="inline-block h-16 w-16 rounded-full ring-2 ring-gray-200 dark:ring-gray-600"
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/img/profileicon/${summoner.profileIconId}.png`}
            alt={`Summoner profile icon ${summoner.profileIconId}`}
          />
        </div>
        <div className="flex-col flex-1 ml-6">
          <p className="text-2xl">{summoner.name}</p>
          <span className="inline-flex items-center px-3 rounded-md border border-gray-300 dark:border-gray-600">
            {summoner.level}
          </span>
        </div>
        <div className="flex-col">
          <p className="text-right text-gray-600 dark:text-gray-300">Last online {formatDistanceToNow(date)} ago</p>
          <p className="text-right text-gray-500 dark:text-gray-400">{format(date, 'Pp')}</p>
        </div>
      </div>
    </div>
  )
}

export default SummonerDetails
