/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { format, formatDistanceToNow } from 'date-fns'
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

const SummonerDetails = ({
  latestVersion,
  leagues,
  summoner,
  totalMastery
}: {
  latestVersion: string | undefined
  leagues: League[] | undefined
  summoner: Summoner | undefined
  totalMastery: number
}) => {
  if (!summoner || !leagues) {
    return (
      <div className="p-6 transition-colors bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="sm:flex sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:gap-4 lg:gap-6 items-center space-y-2 sm:space-y-0">
            <div className="inline-block h-16 w-16 lg:h-20 lg:w-20 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse">
              {/* Avatar */}
            </div>
            <div className="flex flex-col items-center sm:items-start space-y-2">
              <div className="inline-block h-4 w-32 lg:h-6 lg:w-40 rounded bg-gray-300 dark:bg-gray-600 animate-pulse">
                {/* Summoner name */}
              </div>
              <div className="inline-block h-4 w-24 lg:h-6 lg:w-36 rounded bg-gray-300 dark:bg-gray-600 animate-pulse">
                {/* Rank and level */}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="h-4 w-24 lg:h-6 lg:w-32 rounded bg-gray-300 dark:bg-gray-600 animate-pulse">
              {/* Total mastery label */}
            </div>
            <div className="h-4 w-28 lg:h-6 lg:w-36 rounded bg-gray-300 dark:bg-gray-600 animate-pulse">
              {/* Total mastery value */}
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-end space-y-2">
            <div className="h-4 w-28 lg:h-6 lg:w-40 rounded bg-gray-300 dark:bg-gray-600 animate-pulse">
              {/* Last modified */}
            </div>
            <div className="h-4 w-24 lg:h-6 lg:w-32 rounded bg-gray-300 dark:bg-gray-600 animate-pulse">
              {/* Date */}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const date = new Date(summoner.revisionDate + 'Z')

  return (
    <>
      {latestVersion && summoner &&
        <Head>
          <title key="page-title">{summoner.name} - Hextech Check</title>
          <meta key="title" name="title" content={`${summoner.name} - Summoner`} />
          <meta key="og:title" property="og:title" content={`${summoner.name} - Summoner`} />
          <meta key="og:image" property="og:image" content={latestVersion && summoner && `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/profileicon/${summoner.profileIconId}.png`} />
          <meta key="twitter:title" property="twitter:title" content={`${summoner.name} - Summoner`} />
          <meta key="twitter:image" property="twitter:image" content={latestVersion && summoner && `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/profileicon/${summoner.profileIconId}.png`} />
        </Head>
      }
      <div className="p-6 transition-colors bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="sm:flex sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:gap-4 lg:gap-6 items-center space-y-2 sm:space-y-0">
            <img
              className="inline-block h-16 w-16 lg:h-20 lg:w-20 rounded-full"
              src={latestVersion && summoner && `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/profileicon/${summoner.profileIconId}.png`}
              alt={`Summoner profile icon ${summoner && summoner.profileIconId}`}
            />
            <div className="flex flex-col space-y-2">
              <p className="text-xl lg:text-2xl text-center sm:text-left">{summoner.name}</p>
              <div className="flex flex-row">
                <span className={`${leagueClasses(leagues[0])} inline-flex items-center px-3 text-sm lg:text-lg rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600`}>
                  {`${leagues[0].tier} ${leagues[0].rank}`}
                </span>
                <span className="inline-flex items-center px-3 text-sm lg:text-lg rounded-r-md border border-gray-300 dark:border-gray-600">
                  {summoner.level}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-center text-md lg:text-lg text-gray-600 dark:text-gray-300">Total mastery</p>
            <p className="text-center text-xl lg:text-2xl text-amber-900 dark:text-amber-100">{totalMastery.toLocaleString()}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-center text-sm lg:text-base sm:text-right text-gray-600 dark:text-gray-300">Last modified {formatDistanceToNow(date)} ago</p>
            <p className="text-center text-sm lg:text-base sm:text-right text-gray-500 dark:text-gray-400">{format(date, 'Pp')}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SummonerDetails
