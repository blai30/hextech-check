/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import axios from 'axios'
import { format, formatDistanceToNow } from 'date-fns'
import api from '@/lib/api'
import { League, Summoner, Tier } from '@/models'

const leagueClasses = (league: League): string => {
  return (
    league.tier === Tier.IRON ? 'text-slate-800 dark:text-slate-300 bg-slate-100 dark:bg-slate-900' :
    league.tier === Tier.BRONZE ? 'text-stone-800 dark:text-stone-300 bg-stone-100 dark:bg-stone-900' :
    league.tier === Tier.SILVER ? 'text-neutral-800 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900' :
    league.tier === Tier.GOLD ? 'text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900' :
    league.tier === Tier.PLATINUM ? 'text-teal-800 dark:text-teal-300 bg-teal-100 dark:bg-teal-900' :
    league.tier === Tier.DIAMOND ? 'text-sky-800 dark:text-sky-300 bg-sky-100 dark:bg-sky-900' :
    league.tier === Tier.MASTER ? 'text-purple-800 dark:text-purple-300 bg-purple-100 dark:bg-purple-900' :
    league.tier === Tier.GRANDMASTER ? 'text-red-800 dark:text-red-300 bg-red-100 dark:bg-red-900' :
    league.tier === Tier.CHALLENGER ? 'text-amber-800 dark:text-amber-300 bg-cyan-100 dark:bg-cyan-900' :
    'text-gray-800 dark:text-gray-800 bg-gray-100 dark:bg-gray-100'
  )
}

const SummonerDetails = ({ region, summonerName }: { summonerName: string, region: string }) => {
  const [latestVersion, setLatestVersion] = useState<string>()
  const [summoner, setSummoner] = useState<Summoner>()
  const [leagues, setLeagues] = useState<League[]>()

  useEffect(() => {
    const getLatestVersion = async () => {
      const response = await axios.get<string[]>('https://ddragon.leagueoflegends.com/api/versions.json')
      setLatestVersion(response.data[0])
    }

    getLatestVersion()
  }, [])

  useEffect(() => {
    const getSummoner = async () => {
      const response = await api.get<Summoner>(`/Summoners/${region}/${summonerName}`)
      setSummoner(response.data)
    }

    getSummoner()
  }, [region, summonerName])

  useEffect(() => {
    const getLeagues = async () => {
      if (!summoner) {
        return
      }

      const response = await api.get<League[]>(`/Leagues/${region}/${summoner.id}`)
      setLeagues(response.data)
    }

    getLeagues()
  }, [region, summoner])

  if (!summoner || !leagues) {
    return (
      <div className="p-6 text-black dark:text-white bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="flex flex-row items-center">
          Loading summoner details...
        </div>
      </div>
    )
  }

  const date = new Date(summoner.revisionDate + 'Z')

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0">
        <img
          className="inline-block h-20 w-20 rounded-full ring-2 ring-gray-200 dark:ring-gray-600"
          src={`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/profileicon/${summoner.profileIconId}.png`}
          alt={`Summoner profile icon ${summoner.profileIconId}`}
        />
        <div className="flex-col flex-1 items-center sm:ml-6 space-y-2">
          <p className="text-2xl text-center sm:text-left">{summoner.name}</p>
          <span className={`${leagueClasses(leagues[0])} inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600`}>
            {`${leagues[0].tier} ${leagues[0].rank}`}
          </span>
          <span className="inline-flex items-center px-3 rounded-r-md border border-gray-300 dark:border-gray-600">
            {summoner.level}
          </span>
        </div>
        <div className="flex-col items-center">
          <p className="text-center sm:text-right text-gray-600 dark:text-gray-300">Last modified {formatDistanceToNow(date)} ago</p>
          <p className="text-center sm:text-right text-gray-500 dark:text-gray-400">{format(date, 'Pp')}</p>
        </div>
      </div>
    </div>
  )
}

export default SummonerDetails
