/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import { Champion, ChampionMastery, Tag } from '@/models'

enum Column {
  Champion,
  Points,
  Chest,
  LastPlayed,
}

const sortColumn = (sortBy: Column) => (a: ChampionMastery, b: ChampionMastery) => {
  return {
    [Column.Champion]: a.championId - b.championId,
    [Column.Points]: b.championPoints - a.championPoints,
    [Column.Chest]: a.chestGranted ? -1 : b.chestGranted ? 1 : 0,
    [Column.LastPlayed]: a.lastPlayTime > b.lastPlayTime ? -1 : 1,
  }[sortBy]
}

const tagClasses: Readonly<Record<Tag, string>> = {
  [Tag.Fighter]: 'text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900',
  [Tag.Tank]: 'text-indigo-800 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900',
  [Tag.Mage]: 'text-sky-800 dark:text-sky-300 bg-sky-100 dark:bg-sky-900',
  [Tag.Assassin]: 'text-red-800 dark:text-red-300 bg-red-100 dark:bg-red-900',
  [Tag.Support]: 'text-teal-800 dark:text-teal-300 bg-teal-100 dark:bg-teal-900',
  [Tag.Marksman]: 'text-green-800 dark:text-green-300 bg-green-100 dark:bg-green-900',
} ?? 'text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900'

const masteryClasses: Readonly<Record<number, string>> = {
  5: 'text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900',
  6: 'text-fuchsia-700 dark:text-fuchsia-300 bg-fuchsia-50 dark:bg-fuchsia-900',
  7: 'text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900',
} ?? 'text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900'

const loadingItem = (
  <div className="px-6 py-4">
    <div className="flex gap-4 items-center">
      <div className="hidden md:inline-flex h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
      <div className="w-full flex-1">
        <div className="flex flex-col md:flex-row md:gap-4 lg:gap-6 md:items-center space-y-4 md:space-y-0">
          <div className="md:hidden flex flex-row items-center gap-4">
            <div className="md:hidden h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
            <div className="flex-1 space-y-4">
              <div className="h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
              <div className="h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
            </div>
          </div>
          <div className="md:hidden md:w-4/12 h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
          <div className="hidden md:inline-flex md:w-4/12 h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
          <div className="hidden md:inline-flex md:w-3/12 h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
          <div className="hidden md:inline-flex md:w-5/12 h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
)

const ChampionMasteriesTable = ({
  latestVersion,
  champions,
  championMasteries
}: {
  latestVersion: string | undefined
  champions: { [key: number]: Champion } | undefined
  championMasteries: ChampionMastery[] | undefined
}) => {
  const [table, setTable] = useState<JSX.Element[]>()
  const [query, setQuery] = useState<string>('')
  const [filterChest, setFilterChest] = useState<boolean>(false)
  const [byColumn, setByColumn] = useState<Column>(Column.Points)

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    if (!champions || !championMasteries) {
      return
    }

    const table = championMasteries.sort(sortColumn(byColumn)).filter((championMastery) => {
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
                      <span className={`${masteryClasses[championMastery.championLevel]} inline-flex items-center px-3 rounded-l-md text-sm border border-r-0 border-gray-300 dark:border-gray-600`}>
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
                    <div key={tag} className={`${tagClasses[tag]} px-2 inline-flex transition-colors text-xs leading-5 font-semibold rounded-full`}>
                      {Tag[tag]}
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden md:block col-span-3">
                <div className="flex rounded-md">
                  <span className={`${masteryClasses[championMastery.championLevel]} inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600`}>
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
                  <span className="block md:hidden text-left text-gray-600 dark:text-gray-300 underline underline-offset-2 decoration-gray-400 decoration-dotted group-focus:decoration-2 group-focus:decoration-solid group-focus:decoration-indigo-500">
                    {`Last played ${formatDistanceToNow(date)} ago`}
                  </span>
                  <span className="hidden md:block text-left text-gray-600 dark:text-gray-300 underline underline-offset-2 decoration-gray-400 decoration-dotted group-focus:decoration-2 group-focus:decoration-solid group-focus:decoration-indigo-500">
                    {`${formatDistanceToNow(date)} ago`}
                  </span>
                  <div className="absolute hidden group-hover:block group-focus:block whitespace-nowrap -top-16 -translate-x-2 md:-translate-x-6 px-4 py-2 font-medium text-xs text-black dark:text-white bg-white/60 dark:bg-black/60 backdrop-blur-lg dark:shadow-gray-700/30 shadow-xl">
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
  }, [championMasteries, champions, filterChest, latestVersion, query, byColumn])

  return (
    <div className="flex flex-col space-y-6">
      {/* Filter and sort */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <input
          id="search"
          name="search"
          placeholder="Find champion..."
          value={query}
          onChange={handleQuery}
          className="md:inline-flex items-center md:w-52 px-3 py-2 rounded-md transition-colors text-black dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:ring-inset focus:ring-indigo-500 focus:border-indigo-500"
        />

        <label htmlFor="filterChest">
          Chest available
          <input
            id="filterChest"
            name="filterChest"
            type="checkbox"
            className="ml-4"
            checked={filterChest}
            onChange={() => setFilterChest(!filterChest)}
          />
        <div className="flex flex-row">
          <Listbox value={byColumn} onChange={setByColumn}>
            {({ open }) => (
              <>
                <Listbox.Label className="sr-only">
                  Sort by column
                </Listbox.Label>
                <div className="relative">
                  <Listbox.Button className="inline-flex items-center w-48 rounded-l-md transition-colors text-black dark:text-white bg-gray-50 dark:bg-gray-800 border border-r-0 border-gray-300 dark:border-gray-600 pl-3 pr-10 py-2 cursor-default focus:outline-none focus:ring-inset focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                    <span className="flex items-center">
                      <span className="block">{byColumn}</span>
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                      </svg>
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 w-48 left-0 backdrop-blur-lg bg-white/50 dark:bg-gray-700/50 shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {allColumns.map((column) => (
                        <Listbox.Option
                          key={column}
                          className={({ active }) =>
                            `${active ? 'text-white dark:text-black bg-indigo-600 dark:bg-indigo-400' : 'text-gray-900 dark:text-gray-100'}
                            cursor-default select-none relative py-2 pl-3 pr-9`}
                          value={column}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <span className={`${selected ? 'font-semibold' : 'font-normal'} ml-2 block`}>
                                  {column}
                                </span>
                              </div>

                              {selected ? (
                                <span className={`${active ? 'text-white' : 'text-indigo-600 dark:text-indigo-300'} absolute inset-y-0 right-0 flex items-center pr-4`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>

          <button onClick={handleSortOrder} className="inline-flex items-center px-3 py-2 rounded-r-md transition-colors bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-inset focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
            {ascending ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
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
            {table ?? [...Array(10)].map((value, index) => (<li key={index}>{loadingItem}</li>))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ChampionMasteriesTable
