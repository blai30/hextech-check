/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { format, formatDistanceToNow } from 'date-fns'
import { League, Summoner, Tier } from '@/models'

const leagueClasses: Readonly<Record<Tier, string>> = {
  [Tier.UNRANKED]: 'text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-900',
  [Tier.IRON]: 'text-slate-800 dark:text-slate-300 bg-slate-100 dark:bg-slate-900',
  [Tier.BRONZE]: 'text-stone-800 dark:text-stone-300 bg-stone-100 dark:bg-stone-900',
  [Tier.SILVER]: 'text-neutral-800 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900',
  [Tier.GOLD]: 'text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900',
  [Tier.PLATINUM]: 'text-teal-800 dark:text-teal-300 bg-teal-100 dark:bg-teal-900',
  [Tier.DIAMOND]: 'text-sky-800 dark:text-sky-300 bg-sky-100 dark:bg-sky-900',
  [Tier.MASTER]: 'text-purple-800 dark:text-purple-300 bg-purple-100 dark:bg-purple-900',
  [Tier.GRANDMASTER]: 'text-red-800 dark:text-red-300 bg-red-100 dark:bg-red-900',
  [Tier.CHALLENGER]: 'text-amber-800 dark:text-amber-300 bg-cyan-100 dark:bg-cyan-900',
}

const loadingItem = (
  <div className="p-6 transition-colors bg-white dark:bg-gray-800 rounded-lg shadow">
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:gap-x-4">
      <div className="h-16 w-16 lg:h-20 lg:w-20 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
      <div className="w-full flex-1">
        <div className="flex flex-col sm:grid sm:grid-flow-row sm:grid-rows-2 sm:grid-cols-12 sm:gap-4 lg:gap-6 items-center space-y-4 sm:space-y-0">
          <div className="w-2/3 sm:w-auto sm:col-span-4 h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
          <div className="w-1/2 sm:w-auto sm:col-span-5 h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
          <div className="w-4/5 sm:w-auto sm:col-span-3 h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
          <div className="w-3/5 sm:w-auto sm:col-span-3 h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
          <div className="w-5/6 sm:w-auto sm:col-span-5 h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
          <div className="w-1/2 sm:w-auto sm:col-span-4 h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
)

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
    return loadingItem
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
                <span className={`${leagueClasses[leagues[0]?.tier || Tier.UNRANKED]} inline-flex items-center px-3 transition-colors text-sm lg:text-lg rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600`}>
                  {leagues[0] ? `${leagues[0].tier} ${leagues[0].rank}` : Tier.UNRANKED}
                </span>
                <span className="inline-flex items-center px-3 transition-colors text-sm lg:text-lg rounded-r-md border border-gray-300 dark:border-gray-600">
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
