/* eslint-disable @next/next/no-img-element */
import { format, formatDistanceToNow } from 'date-fns'
import { League, Summoner, Tier } from '@/models'
import { LoadingSummoner } from '@/components'

// prettier-ignore
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
      <div className="rounded-lg bg-white p-6 shadow transition-colors dark:bg-gray-800 dark:shadow-gray-700/30">
        <div className="space-y-4 sm:flex sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex flex-col items-center space-y-2 sm:flex-row sm:gap-4 sm:space-y-0 lg:gap-6">
            <img
              id={`summoner-icon-${summoner.id}`}
              className="inline-block h-16 w-16 rounded-full lg:h-20 lg:w-20"
              src={imageUrl}
              alt={`Summoner profile icon ${summoner.profileIconId}`}
            />
            <div className="flex flex-col space-y-2">
              <p
                title="Summoner name"
                className="text-center text-xl sm:text-left lg:text-2xl"
              >
                {summoner.name}
              </p>
              <div className="flex flex-row">
                <span
                  id={`summoner-rank-${summoner.id}`}
                  title="Summoner rank"
                  className={`${
                    leagueClasses[league?.tier ?? Tier.UNRANKED]
                  } inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-2.5 text-sm transition-colors dark:border-gray-600 lg:px-3 lg:text-lg`}
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
                  className="inline-flex items-center rounded-r-md border border-gray-300 px-2.5 text-sm transition-colors dark:border-gray-600 lg:px-3 lg:text-lg"
                >
                  {summoner.level}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-md text-center font-light text-gray-600 dark:text-gray-300 lg:text-lg">
              Total mastery
            </p>
            <p
              id={`summoner-totalmastery-${summoner.id}`}
              title="Combined total of all champions mastery points"
              className="text-center text-xl font-semibold text-amber-900 dark:text-amber-100 lg:text-2xl"
            >
              {totalMastery.toLocaleString()}
            </p>
          </div>
          <div
            title="Last summoner name change, summoner level change, or profile icon change"
            className="flex flex-col items-center sm:items-end"
          >
            <p className="text-center text-sm text-gray-600 dark:text-gray-300 sm:text-right lg:text-base">
              Last modified {formatDistanceToNow(date)} ago
            </p>
            <p
              id={`summoner-revisiondate-${summoner.id}`}
              className="text-center text-sm text-gray-500 dark:text-gray-400 sm:text-right lg:text-base"
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
