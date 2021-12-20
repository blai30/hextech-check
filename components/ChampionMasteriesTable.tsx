/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import { Champion, ChampionMastery, Tag } from '@/models'

enum SortBy {
  Champion = 'champion',
  Points = 'points',
  Chest = 'chest',
  LastPlayed = 'lastPlayed',
}

const sortedBy = (sortBy: SortBy) => (a: ChampionMastery, b: ChampionMastery) => {
  return {
    [SortBy.Champion]: a.championId - b.championId,
    [SortBy.Points]: b.championPoints - a.championPoints,
    [SortBy.Chest]: a.chestGranted ? -1 : b.chestGranted ? 1 : 0,
    [SortBy.LastPlayed]: a.lastPlayTime.getTime() - b.lastPlayTime.getTime(),
  }[sortBy] ?? SortBy.Points
}

const tagClasses = (tag: Tag) => ({
  [Tag.Fighter]: 'text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900',
  [Tag.Tank]: 'text-indigo-800 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900',
  [Tag.Mage]: 'text-sky-800 dark:text-sky-300 bg-sky-100 dark:bg-sky-900',
  [Tag.Assassin]: 'text-red-800 dark:text-red-300 bg-red-100 dark:bg-red-900',
  [Tag.Support]: 'text-teal-800 dark:text-teal-300 bg-teal-100 dark:bg-teal-900',
  [Tag.Marksman]: 'text-green-800 dark:text-green-300 bg-green-100 dark:bg-green-900',
})[tag] ?? 'text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900'

const masteryClasses = (level: number): string => ({
  5: 'text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900',
  6: 'text-fuchsia-700 dark:text-fuchsia-300 bg-fuchsia-50 dark:bg-fuchsia-900',
  7: 'text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900',
})[level] ?? 'text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900'

const ChampionMasteriesTable = ({
  latestVersion,
  champions,
  championMasteries
}: {
  latestVersion: string | undefined
  champions: { [key: number]: Champion } | undefined
  championMasteries: ChampionMastery[] | undefined
}) => {
  const [table, setTable] = useState<JSX.Element[]>([])
  const [query, setQuery] = useState<string>('')
  const [filterChest, setFilterChest] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Points)

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    if (!champions || !championMasteries) {
      return
    }

    const table = championMasteries.sort(sortedBy(sortBy)).filter((championMastery) => {
      const champion = champions[championMastery.championId]
      return (
        (!filterChest || !championMastery.chestGranted) &&
        champion.name.toLowerCase().includes(query?.toLowerCase())
      )
    }).map((championMastery) => {
      const date = new Date(championMastery.lastPlayTime + 'Z')
      const champion = champions[championMastery.championId]

      return (
        <li key={championMastery.championId}>
          <div className="px-6 py-4 whitespace-normal space-y-4">
            <div className="grid grid-rows-2 md:grid-rows-1 grid-cols-6 md:grid-cols-12 md:items-center">

              <div className="col-span-5 md:col-span-3">
                <div className="flex gap-4 items-center">
                  <div className="overflow-hidden flex-shrink-0 h-12 w-12 rounded-full">
                    <div className="relative h-14 w-14">
                      <img
                        className="absolute -inset-1"
                        src={latestVersion && champion && `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${champion.image.full}`}
                        alt={`Champion icon ${champion && champion.name}`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="text-left text-black dark:text-white">
                      {champion && champion.name}
                    </span>
                    <div className="flex md:hidden rounded-md">
                      <span className={`${masteryClasses(championMastery.championLevel)} inline-flex items-center px-3 rounded-l-md text-sm border border-r-0 border-gray-300 dark:border-gray-600`}>
                        {championMastery && championMastery.championLevel}
                      </span>
                      <span className="inline-flex items-center px-3 rounded-r-md text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
                        {championMastery && championMastery.championPoints.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-2 col-start-6 md:row-start-auto md:col-start-auto">
                <div className="flex flex-col items-end md:items-start space-y-1">
                  {champion && champion.tags && champion.tags.map((tag) => (
                    <div key={tag} className={`${tagClasses(tag)} px-2 inline-flex transition-colors text-xs leading-5 font-semibold rounded-full`}>
                      {Tag[tag]}
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden md:block col-span-3">
                <div className="flex rounded-md">
                  <span className={`${masteryClasses(championMastery.championLevel)} inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600`}>
                    {championMastery && championMastery.championLevel}
                  </span>
                  <span className="inline-flex items-center px-3 rounded-r-md text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
                    {championMastery && championMastery.championPoints.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="col-span-1 row-start-2 col-start-6 md:row-start-auto md:col-start-auto self-end md:self-auto justify-self-end md:justify-self-auto">
                {championMastery && (
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${championMastery.chestGranted ? 'text-amber-400 dark:text-amber-300' : 'text-gray-200 dark:text-gray-700'}`} viewBox="0 0 64 64" fill="currentColor" stroke="currentColor" fillRule="evenodd" clipRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="1.5">
                    <g transform="matrix(0.875,0,0,0.912446,4,2.80171)">
                      <path d="M64,7.365C64,3.3 60.559,0 56.32,0L7.68,0C3.441,0 0,3.3 0,7.365L0,56.635C0,60.7 3.441,64 7.68,64L56.32,64C60.559,64 64,60.7 64,56.635L64,7.365ZM57.143,7.365L57.143,56.635C57.143,57.071 56.774,57.424 56.32,57.424L7.68,57.424C7.226,57.424 6.857,57.071 6.857,56.635C6.857,56.635 6.857,7.365 6.857,7.365C6.857,6.929 7.226,6.576 7.68,6.576C7.68,6.576 56.32,6.576 56.32,6.576C56.774,6.576 57.143,6.929 57.143,7.365Z" />
                    </g>
                    <path d="M32,6L18,16L18,40L32,50L46,40L46,16L32,6ZM32,15.831L38,20.117C38,20.117 38,35.883 38,35.883C38,35.883 32,40.169 32,40.169C32,40.169 26,35.883 26,35.883C26,35.883 26,20.117 26,20.117L32,15.831Z" />
                    <g transform="matrix(1,0,0,1,-3.55271e-15,2)">
                      <path d="M8,6L20,18L32,6L44,18L56,6L8,6Z" strokeWidth="5px" />
                    </g>
                  </svg>
                )}
              </div>

              <div className="col-span-5 md:col-span-3 row-start-2 col-start-1 md:row-start-auto md:col-start-auto self-end md:self-auto">
                <button className="relative group">
                  <div
                    className="text-left text-gray-600 dark:text-gray-300 underline underline-offset-2 decoration-gray-400 decoration-dotted"
                  >
                    <span className="block md:hidden">
                      Last played {formatDistanceToNow(date) + ' ago'}
                    </span>
                    <span className="hidden md:block">
                      {formatDistanceToNow(date) + ' ago'}
                    </span>
                  </div>
                  <div className="absolute hidden group-hover:block group-focus:block whitespace-nowrap -top-16 -translate-x-6 px-4 py-2 text-xs text-black dark:text-white bg-white dark:bg-black dark:shadow-gray-700/50 shadow-xl">
                    <div className="flex flex-col items-center space-y-1">
                      <p>{format(date, 'PPPP')}</p>
                      <p>{format(date, 'pppp')}</p>
                    </div>
                  </div>
                </button>
              </div>

            </div>
          </div>
        </li>
      )
    })

    setTable(table)
  }, [championMasteries, champions, filterChest, latestVersion, query])

  if (table.length === 0) {
    return (
      <div className="p-6 text-black dark:text-white bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="flex flex-row items-center">
          Loading champion masteries...
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center">
        <input
          id="search"
          name="search"
          placeholder="Find champion..."
          value={query}
          onChange={handleQuery}
          className="inline-flex items-center px-3 py-2 rounded-md transition-colors text-black dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
        />

        <label htmlFor="filterChest">
          Chest available
        </label>
        <input
          id="filterChest"
          name="filterChest"
          type="checkbox"
          className="ml-2"
          checked={filterChest}
          onChange={() => setFilterChest(!filterChest)}
        />
      </div>

      <div className="flex-col md:block">
        <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-700 transition-colors bg-gray-50 dark:bg-gray-700 rounded-t-lg">
          <div className="flex md:hidden px-6 py-3">
            <span className="text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Champion Masteries
            </span>
          </div>
          <div className="hidden md:flex px-6 py-3">
            <div className="flex-1 grid grid-cols-12">
              <span className="col-span-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Champion
              </span>
              <span className="col-span-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Class
              </span>
              <span className="col-span-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Mastery
              </span>
              <span className="col-span-1 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Chest
              </span>
              <span className="col-span-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Last Played
              </span>
            </div>
          </div>
        </div>
        <div className="transition-colors bg-white dark:bg-gray-800 shadow overflow-visible rounded-b-lg">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {table}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ChampionMasteriesTable
