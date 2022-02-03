/* eslint-disable @next/next/no-img-element */
import { format, formatDistanceToNow } from 'date-fns'
import { League, Summoner, Tier } from '@/models'
import { LoadingSummoner } from '@/components'

// prettier-ignore
const leagueClasses: Readonly<Record<Tier, string>> = {
  [Tier.UNRANKED]: 'text-gray-800 dark:text-gray-100 bg-gray-300 dark:bg-gray-700',
  [Tier.IRON]: 'text-slate-800 dark:text-slate-100 bg-slate-300 dark:bg-slate-700',
  [Tier.BRONZE]: 'text-stone-800 dark:text-stone-100 bg-stone-300 dark:bg-stone-700',
  [Tier.SILVER]: 'text-zinc-800 dark:text-zinc-100 bg-zinc-300 dark:bg-zinc-700',
  [Tier.GOLD]: 'text-amber-800 dark:text-amber-100 bg-amber-300 dark:bg-amber-700',
  [Tier.PLATINUM]: 'text-emerald-800 dark:text-emerald-100 bg-emerald-300 dark:bg-emerald-700',
  [Tier.DIAMOND]: 'text-blue-800 dark:text-blue-100 bg-blue-300 dark:bg-blue-700',
  [Tier.MASTER]: 'text-purple-800 dark:text-purple-100 bg-purple-300 dark:bg-purple-700',
  [Tier.GRANDMASTER]: 'text-red-800 dark:text-red-100 bg-red-300 dark:bg-red-700',
  [Tier.CHALLENGER]: 'text-yellow-800 dark:text-yellow-100 bg-sky-300 dark:bg-sky-700',
}

const SummonerDetails = ({
  imageUrl,
  leagues,
  summoner,
  totalMastery,
}: {
  imageUrl: string
  leagues: League[]
  summoner: Summoner
  totalMastery: number
}) => {
  if (
    !summoner ||
    !leagues ||
    totalMastery === null ||
    totalMastery === undefined
  ) {
    return <LoadingSummoner />
  }

  const date = new Date(summoner.revisionDate + 'Z')
  const league = leagues.sort((a, b) => (a.tier < b.tier ? -1 : 1))[0]

  return (
    <>
      <div className="rounded-lg bg-white p-6 shadow transition-colors dark:bg-gray-800 dark:shadow-gray-700/30 print:shadow-none">
        <div className="flex flex-col space-y-4 md:grid md:grid-cols-3 md:items-center md:justify-between md:space-y-0">
          <div className="flex flex-col items-center space-y-2 md:flex-row md:gap-4 md:space-y-0 lg:gap-6">
            <img
              id={`summoner-icon-${summoner.id}`}
              src={imageUrl}
              alt={`Summoner profile icon ${summoner.profileIconId}`}
              title={imageUrl}
              className="inline-block h-16 w-16 rounded-full lg:h-20 lg:w-20"
            />
            <div className="flex flex-col items-center space-y-2 md:items-start">
              <p
                title="Summoner name"
                className="max-w-sm break-all text-center text-xl md:text-left lg:text-2xl"
              >
                {summoner.name}
              </p>
              <div className="flex flex-row">
                <span
                  id={`summoner-rank-${summoner.id}`}
                  title="Summoner rank"
                  className={`${
                    leagueClasses[league?.tier ?? Tier.UNRANKED]
                  } inline-flex items-center rounded-l-md px-2.5 text-sm transition-colors lg:px-3 lg:text-lg`}
                >
                  {/* Hide division for apex tiers. */}
                  {league
                    ? league.tier === Tier.MASTER ||
                      league.tier === Tier.GRANDMASTER ||
                      league.tier === Tier.CHALLENGER
                      ? `${league.tier}`
                      : `${league.tier} ${league.rank}`
                    : Tier.UNRANKED}
                </span>
                <span
                  id={`summoner-level-${summoner.id}`}
                  title="Summoner level"
                  className="inline-flex items-center rounded-r-md border-l border-white bg-gray-100 px-2.5 text-sm transition-colors dark:border-gray-800 dark:bg-gray-900 lg:px-3 lg:text-lg"
                >
                  {summoner.level}
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
              id={`summoner-totalmastery-${summoner.id}`}
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
              Last modified {formatDistanceToNow(date)} ago
            </p>
            <p
              id={`summoner-revisiondate-${summoner.id}`}
              className="text-center text-sm text-gray-500 dark:text-gray-400 md:text-right lg:text-base"
            >
              {format(date, 'Pp')}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SummonerDetails
