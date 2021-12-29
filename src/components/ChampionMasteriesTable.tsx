/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from 'react'
import { Listbox, Switch, Transition } from '@headlessui/react'
import { Champion, ChampionMastery, Tag } from '@/models'
import { ChampionRow, LoadingChampionRow } from '@/components'
import { ChestIcon, ClassIcon } from '@/components/common'

enum Column {
  Champion = 'Champion',
  Points = 'Mastery',
  Chest = 'Chest',
  LastPlayed = 'Last Played',
}

const allColumns = [
  Column.Champion,
  Column.Points,
  Column.Chest,
  Column.LastPlayed,
]

const allTags = [
  Tag.Fighter,
  Tag.Tank,
  Tag.Mage,
  Tag.Assassin,
  Tag.Support,
  Tag.Marksman,
]

const sortColumn = (
  sortBy: Column,
  ascending: Boolean,
  champions: { [key: number]: Champion }
) => (
  a: ChampionMastery,
  b: ChampionMastery
) => ({
  [Column.Champion]: champions[a.championId].name.toLowerCase() > champions[b.championId].name.toLowerCase() ? 1 : -1,
  [Column.Points]: a.championPoints - b.championPoints,
  [Column.Chest]: a.chestGranted ? -1 : b.chestGranted ? 1 : 0,
  [Column.LastPlayed]: a.lastPlayTime > b.lastPlayTime ? -1 : 1,
})[sortBy] * (ascending ? 1 : -1)

const ChampionMasteriesTable = ({
  latestVersion,
  champions,
  championMasteries
}: {
  latestVersion: string
  champions: { [key: number]: Champion }
  championMasteries: ChampionMastery[]
}) => {
  const [resultsTimeout, setResultsTimeout] = useState<boolean>(false)
  const [table, setTable] = useState<JSX.Element[]>([])
  const [query, setQuery] = useState<string>('')
  const [filterTags, setFilterTags] = useState<Tag[]>([])
  const [filterChest, setFilterChest] = useState<boolean>(false)
  const [byColumn, setByColumn] = useState<Column>(Column.Points)
  const [ascending, setAscending] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setResultsTimeout(true)
    }, 4000)

    return () => {
      setResultsTimeout(false)
    }
  }, [])

  useEffect(() => {
    const buildTable = () => {
      const sorted = championMasteries.sort(sortColumn(byColumn, ascending, champions))

      const filtered = sorted.filter((championMastery) => {
        const champion = champions[championMastery.championId]
        return (
          (!filterChest || !championMastery.chestGranted) &&
          champion.name.toLowerCase().includes(query?.toLowerCase()) &&
          filterTags.every((tag) => champion.tags.includes(tag))
        )
      })

      const finalTable = filtered.map((championMastery) => {
        const date = new Date(championMastery.lastPlayTime + 'Z')
        const champion = champions[championMastery.championId]
        const imageUrl = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${champion.image.full}`

        return (
          <li key={championMastery.championId}>
            <ChampionRow
              champion={champion}
              championMastery={championMastery}
              imageUrl={imageUrl}
              lastPlayed={date}
            />
          </li>
        )
      })

      setTable(finalTable)
    }

    buildTable()

    return () => {
      setTable([])
    }
  }, [ascending, byColumn, championMasteries, champions, filterChest, filterTags, latestVersion, query])

  const handleSetFilterTag = (tag: Tag) => {
    if (filterTags.includes(tag)) {
      setFilterTags(filterTags.filter(t => t !== tag))
    } else {
      setFilterTags([...filterTags, tag])
    }
  }

  return (
    <div className="flex flex-col space-y-6">
      {/* Filter and sort */}
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
        <input
          id="filter-champion"
          name="filter-champion"
          type="search"
          placeholder="Find champion..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="items-center w-full md:w-3/12 px-3 py-2 rounded-md transition-colors text-black dark:text-white bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-gray-300 focus:dark:border-gray-600 focus:ring-inset focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex flex-wrap w-full md:w-auto items-center justify-center gap-2">
          <div className="grid grid-cols-3 grid-rows-2 2xs:grid-cols-6 2xs:grid-rows-1 gap-2">
            {allTags.map((tag) => (
              <Switch
                key={tag}
                id={`filter-tag-${tag}`}
                checked={filterTags.includes(tag)}
                onChange={() => handleSetFilterTag(tag)}
                className={`${filterTags.includes(tag) ? 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white' : 'text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400'} relative group col-span-1 flex flex-col items-center p-1 rounded-full cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`}
              >
                <div className="absolute hidden group-hover:block group-focus-visible:block whitespace-nowrap z-10 -top-10 px-4 py-2 font-medium text-xs text-black dark:text-white bg-white/60 dark:bg-black/60 backdrop-blur-lg rounded dark:shadow-gray-700/30 shadow-xl">
                  <div className="flex flex-col items-center space-y-1">
                    <p>{Tag[tag]}</p>
                  </div>
                </div>
                <span className="sr-only">{`Filter ${Tag[tag]}`}</span>
                <span>
                  <ClassIcon className="h-8 w-8" tag={tag} />
                </span>
              </Switch>
            ))}
          </div>
          <Switch
            id="filter-chest"
            checked={filterChest}
            onChange={() => setFilterChest(!filterChest)}
            className={`${filterChest ? 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white' : 'text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400'} relative group flex flex-col items-center p-1 rounded-full cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus:ring-indigo-500`}
          >
            <div className="absolute hidden group-hover:block group-focus-visible:block whitespace-nowrap z-10 -top-14 px-4 py-2 font-medium text-xs text-black dark:text-white bg-white/60 dark:bg-black/60 backdrop-blur-lg rounded dark:shadow-gray-700/30 shadow-xl">
              <div className="flex flex-col items-center space-y-1 whitespace-normal">
                <p>Chest available</p>
              </div>
            </div>
            <span className="sr-only">Filter chest</span>
            <span>
              <ChestIcon className="h-8 w-8" />
            </span>
          </Switch>
        </div>

        <div className="inline-flex w-full md:w-3/12">
          <Listbox value={byColumn} onChange={setByColumn}>
            {({ open }) => (
              <>
                <Listbox.Label className="sr-only">
                  Sort by column
                </Listbox.Label>
                <div className="relative flex-1">
                  <Listbox.Button id="sort-column-select" className="inline-flex items-center w-full rounded-l-md transition-colors text-black dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-r-0 border-gray-300 dark:border-gray-600 pl-3 pr-8 py-2 cursor-default focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-indigo-500">
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
                    <Listbox.Options className="absolute z-20 mt-1 w-full left-0 backdrop-blur-lg bg-white/50 dark:bg-gray-700/50 shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {allColumns.map((column) => (
                        <Listbox.Option
                          key={column}
                          className={({ active }) =>
                            `${active ? 'text-white dark:text-black bg-indigo-600 dark:bg-indigo-400' : 'text-gray-900 dark:text-gray-100'}
                            cursor-default select-none relative py-2 pl-2 pr-8 transition-colors ease-in-out duration-75`}
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
                                <span className={`${active ? 'text-white' : 'text-indigo-600 dark:text-indigo-300'} absolute inset-y-0 right-0 flex items-center pr-2`}>
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

          <button
            id="sort-direction"
            onClick={() => setAscending(!ascending)}
            className="inline-flex items-center px-3 py-2 rounded-r-md transition-colors bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 focus-visible:outline-none focus-visible:border-gray-300 focus-visible:dark:border-gray-600 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {ascending ? (<>
              <span className="sr-only">Sort ascending</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </>) : (<>
              <span className="sr-only">Sort descending</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </>)}
          </button>
        </div>
      </div>

      <div className="flex-col md:block">
        <div className="overflow-hidden border-b border-gray-200 dark:border-gray-900 transition-colors bg-gray-50 dark:bg-gray-700 rounded-t-lg shadow dark:shadow-gray-700/30">
          <div id="m-table-header" className="flex md:hidden px-6 py-2">
            <span className="text-left text-[0.65rem] lg:text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Champion Masteries
            </span>
          </div>
          <div id="table-header" className="hidden md:flex">
            <div className="flex-1 grid grid-rows-1 grid-cols-18">
              <div className="col-span-5 px-6 py-2 lg:py-3">
                <p className="text-left text-[0.65rem] lg:text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Champion
                </p>
              </div>
              <div className="col-span-3 px-6 py-2 lg:py-3">
                <p className="text-left text-[0.65rem] lg:text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Class
                </p>
              </div>
              <div className="col-span-4 px-6 py-2 lg:py-3">
                <p className="text-left text-[0.65rem] lg:text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Mastery
                </p>
              </div>
              <div className="col-span-2 px-6 py-2 lg:py-3">
                <p className="text-left text-[0.65rem] lg:text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Chest
                </p>
              </div>
              <div className="col-span-4 px-6 py-2 lg:py-3">
                <p className="text-left text-[0.65rem] lg:text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Last Played
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="transition-colors bg-white dark:bg-gray-800 shadow dark:shadow-gray-700/30 overflow-visible rounded-b-lg">
          <ul id="champion-masteries-table" role="list" className="divide-y divide-gray-200 dark:divide-gray-900">
            {
              !resultsTimeout && table.length === 0 && filterTags.length === 0 && !filterChest ? (
                [...Array(20)].map((value, index) => (
                  <li key={index}><LoadingChampionRow /></li>
                ))
              ) : (
                table
              )
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ChampionMasteriesTable
