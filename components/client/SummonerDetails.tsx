'use client'

import Image from 'next/image'
import { formatDate, formatRelativeDate } from '@/lib/formatDate'
import {
  AccountDto,
  ChampionMasteryDto,
  LeagueEntryDto,
  SummonerDto,
  Tier,
  TierKey,
  TierOrder,
} from '@/models/riotapi'

// prettier-ignore
const leagueClasses: Readonly<Record<TierKey, string>> = {
  [Tier.Unranked]: 'text-gray-800 dark:text-gray-100 bg-gray-300 dark:bg-gray-700',
  [Tier.Iron]: 'text-slate-800 dark:text-slate-100 bg-slate-300 dark:bg-slate-700',
  [Tier.Bronze]: 'text-stone-800 dark:text-stone-100 bg-stone-300 dark:bg-stone-700',
  [Tier.Silver]: 'text-zinc-800 dark:text-zinc-100 bg-zinc-300 dark:bg-zinc-700',
  [Tier.Gold]: 'text-amber-800 dark:text-amber-100 bg-amber-300 dark:bg-amber-700',
  [Tier.Platinum]: 'text-teal-800 dark:text-teal-100 bg-teal-300 dark:bg-teal-700',
  [Tier.Emerald]: 'text-emerald-800 dark:text-emerald-100 bg-emerald-300 dark:bg-emerald-700',
  [Tier.Diamond]: 'text-blue-800 dark:text-blue-100 bg-blue-300 dark:bg-blue-700',
  [Tier.Master]: 'text-purple-800 dark:text-purple-100 bg-purple-300 dark:bg-purple-700',
  [Tier.Grandmaster]: 'text-red-800 dark:text-red-100 bg-red-300 dark:bg-red-700',
  [Tier.Challenger]: 'text-yellow-800 dark:text-yellow-100 bg-sky-300 dark:bg-sky-700',
}

export default function SummonerDetails({
  accountData,
  playerData,
  imageUrl,
  masteriesData,
  leaguesData,
}: {
  accountData: AccountDto
  playerData: SummonerDto
  imageUrl: string
  masteriesData: ChampionMasteryDto[]
  leaguesData: LeagueEntryDto[]
}) {
  const date = new Date(playerData.revisionDate)
  const totalMastery = masteriesData.reduce(
    (acc, cur) => acc + cur.championPoints,
    0,
  )
  const league = leaguesData
    .filter((item) => item.tier)
    .sort((a, b) => TierOrder[b.tier] - TierOrder[a.tier])[0]

  return (
    <div className="rounded-lg bg-gray-50 p-6 shadow dark:bg-gray-900 dark:shadow-gray-700/30 print:shadow-none">
      <div className="flex flex-col space-y-4 md:grid md:grid-cols-3 md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-col items-center space-y-2 md:flex-row md:gap-4 md:space-y-0 lg:gap-6">
          <Image
            id={`summoner-icon-${playerData.id}`}
            src={imageUrl}
            alt={`Summoner profile icon ${playerData.profileIconId}`}
            title={imageUrl}
            className="h-16 w-16 rounded-full lg:h-20 lg:w-20"
            width={300}
            height={300}
          />
          <div className="flex flex-col items-center space-y-2 md:items-start">
            <div className="flex flex-row">
              <p
                title="Summoner name"
                className="max-w-sm break-all text-center text-xl md:text-left lg:text-2xl"
              >
                {accountData.gameName}
              </p>
              <p
                title="Tag Line"
                className="max-w-sm break-all text-center text-xl text-gray-500 dark:text-gray-400 md:text-left lg:text-2xl"
              >
                {`#${accountData.tagLine}`}
              </p>
            </div>
            <div className="flex flex-row">
              <span
                id={`summoner-rank-${playerData.id}`}
                title="Summoner rank"
                className={[
                  leagueClasses[league?.tier ?? Tier.Unranked],
                  'items-center rounded-l-md px-2.5 text-sm lg:px-3 lg:text-lg',
                ].join(' ')}
              >
                {league?.tier
                  ? [league?.tier, league?.rank].join(' ')
                  : Tier.Unranked}
              </span>
              <span
                id={`summoner-level-${playerData.id}`}
                title="Summoner level"
                className="items-center rounded-r-md bg-gray-100 px-2.5 text-sm dark:bg-gray-950 lg:px-3 lg:text-lg"
              >
                {playerData.summonerLevel}
              </span>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col items-center"
          title="Combined total of all champions mastery points"
        >
          <p className="text-md text-center font-light text-gray-600 dark:text-gray-300 lg:text-lg">
            Total mastery
          </p>
          <p
            id={`summoner-totalmastery-${playerData.id}`}
            className="text-center text-xl font-semibold text-amber-900 dark:text-amber-100 lg:text-2xl"
          >
            {totalMastery.toLocaleString()}
          </p>
        </div>
        <div
          title="Last summoner name change, summoner level change, or profile icon change"
          className="flex flex-col items-center md:items-end"
        >
          <p className="text-center text-sm text-gray-600 dark:text-gray-300 md:text-right lg:text-base">
            {`Last modified ${formatRelativeDate(date)}`}
          </p>
          <p
            id={`summoner-revisiondate-${playerData.id}`}
            className="text-center text-sm text-gray-500 dark:text-gray-400 md:text-right lg:text-base"
          >
            {formatDate(date)}
          </p>
        </div>
      </div>
    </div>
  )
}
