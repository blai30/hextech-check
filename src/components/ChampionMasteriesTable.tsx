/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from 'react'
import useSWR from 'swr'
import { Listbox, Switch, Transition } from '@headlessui/react'
import { Champion, ChampionList, ChampionMastery, Tag } from '@/models'
import { fetcher } from '@/hooks/useGet'
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

// prettier-ignore
const sortColumn = (
  sortBy: Column,
  ascending: Boolean,
  champions: ChampionList,
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
  masteries,
}: {
  latestVersion: string
  masteries: ChampionMastery[]
}) => {
  const [resultsTimeout, setResultsTimeout] = useState<boolean>(false)
  const [table, setTable] = useState<JSX.Element[]>([])
  const [query, setQuery] = useState<string>('')
  const [filterTags, setFilterTags] = useState<Tag[]>([])
  const [filterChest, setFilterChest] = useState<boolean>(false)
  const [byColumn, setByColumn] = useState<Column>(Column.Points)
  const [ascending, setAscending] = useState<boolean>(false)

  const { data: champions, error: championsError } = useSWR<ChampionList>(
    `/Champions`,
    fetcher
  )

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
      if (!champions) {
        return
      }

      // Function to determine if a champion is filtered out.
      const filtered = (championMastery: ChampionMastery) => {
        const champion = champions[championMastery.championId]
        return (
          (!filterChest || !championMastery.chestGranted) &&
          champion.name.toLowerCase().includes(query?.toLowerCase()) &&
          filterTags.every((tag) => champion.tags.includes(tag))
        )
      }

      // Sort champion masteries by the selected column.
      const sorted = masteries?.sort(
        sortColumn(byColumn, ascending, champions)
      )

      const finalTable = sorted?.map((championMastery) => {
        const date = new Date(championMastery.lastPlayTime + 'Z')
        const champion = champions[championMastery.championId]
        const imageUrl = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${champion.image.full}`

        return (
          <li
            key={championMastery.championId}
            className={`${filtered(championMastery) ? 'block' : 'hidden'}`}
          >
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
  }, [
    ascending,
    byColumn,
    masteries,
    champions,
    filterChest,
    filterTags,
    latestVersion,
    query,
  ])

  const handleSetFilterTag = (tag: Tag) => {
    if (filterTags.includes(tag)) {
      setFilterTags(filterTags.filter((t) => t !== tag))
    } else {
      setFilterTags([...filterTags, tag])
    }
  }

  return (
    <div className="flex flex-col space-y-6">
      {/* Filter and sort */}
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <input
          id="filter-champion"
          name="filter-champion"
          type="search"
          placeholder="Find champion..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-black transition-colors hover:bg-gray-100 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 focus:dark:border-gray-600 md:w-3/12"
        />

        <div className="flex w-full flex-wrap items-center justify-center gap-2 md:w-auto">
          <div className="grid grid-cols-3 grid-rows-2 gap-2 2xs:grid-cols-6 2xs:grid-rows-1">
            {allTags.map((tag) => (
              <Switch
                key={tag}
                id={`filter-tag-${tag}`}
                checked={filterTags.includes(tag)}
                onChange={() => handleSetFilterTag(tag)}
                className={`${
                  filterTags.includes(tag)
                    ? 'text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white'
                    : 'text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400'
                } group relative col-span-1 flex cursor-pointer flex-col items-center rounded-full p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`}
              >
                <div className="absolute -top-10 z-10 hidden whitespace-nowrap rounded bg-white/60 px-4 py-2 text-xs font-medium text-black shadow-xl backdrop-blur-lg group-hover:block group-focus-visible:block dark:bg-black/60 dark:text-white dark:shadow-gray-700/30">
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
            className={`${
              filterChest
                ? 'text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white'
                : 'text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400'
            } group relative flex cursor-pointer flex-col items-center rounded-full p-1 transition-colors focus:ring-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset`}
          >
            <div className="absolute -top-14 z-10 hidden whitespace-nowrap rounded bg-white/60 px-4 py-2 text-xs font-medium text-black shadow-xl backdrop-blur-lg group-hover:block group-focus-visible:block dark:bg-black/60 dark:text-white dark:shadow-gray-700/30">
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
                  <Listbox.Button
                    id="sort-column-select"
                    className="inline-flex w-full cursor-default items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-100 py-2 pl-3 pr-8 text-black transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                  >
                    <span className="flex items-center">
                      <span className="block">{byColumn}</span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                        />
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
                    <Listbox.Options className="absolute left-0 z-20 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white/50 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-lg focus:outline-none dark:bg-gray-700/50 sm:text-sm">
                      {allColumns.map((column) => (
                        <Listbox.Option
                          key={column}
                          className={({ active }) =>
                            `${
                              active
                                ? 'bg-indigo-600 text-white dark:bg-indigo-400 dark:text-black'
                                : 'text-gray-900 dark:text-gray-100'
                            }
                            relative cursor-default select-none py-2 pl-2 pr-8 transition-colors duration-75 ease-in-out`
                          }
                          value={column}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <span
                                  className={`${
                                    selected ? 'font-semibold' : 'font-normal'
                                  } ml-2 block`}
                                >
                                  {column}
                                </span>
                              </div>

                              {selected ? (
                                <span
                                  className={`${
                                    active
                                      ? 'text-white'
                                      : 'text-indigo-600 dark:text-indigo-300'
                                  } absolute inset-y-0 right-0 flex items-center pr-2`}
                                >
                                  <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
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
            className="inline-flex items-center rounded-r-md border border-gray-300 bg-gray-100 px-3 py-2 transition-colors hover:bg-gray-200 focus-visible:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 focus-visible:dark:border-gray-600"
          >
            {ascending ? (
              <>
                <span className="sr-only">Sort ascending</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            ) : (
              <>
                <span className="sr-only">Sort descending</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-col md:block">
        <div className="overflow-hidden rounded-t-lg border-b border-gray-200 bg-gray-50 shadow transition-colors dark:border-gray-900 dark:bg-gray-700 dark:shadow-gray-700/30">
          <div id="m-table-header" className="flex px-6 py-2 md:hidden">
            <span className="text-left text-[0.65rem] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300 lg:text-xs">
              Champion Masteries
            </span>
          </div>
          <div id="table-header" className="hidden md:flex">
            <div className="grid flex-1 grid-cols-18 grid-rows-1">
              <div className="col-span-5 px-6 py-2 lg:py-3">
                <p className="text-left text-[0.65rem] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300 lg:text-xs">
                  Champion
                </p>
              </div>
              <div className="col-span-3 px-6 py-2 lg:py-3">
                <p className="text-left text-[0.65rem] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300 lg:text-xs">
                  Class
                </p>
              </div>
              <div className="col-span-4 px-6 py-2 lg:py-3">
                <p className="text-left text-[0.65rem] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300 lg:text-xs">
                  Mastery
                </p>
              </div>
              <div className="col-span-2 px-6 py-2 lg:py-3">
                <p className="text-left text-[0.65rem] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300 lg:text-xs">
                  Chest
                </p>
              </div>
              <div className="col-span-4 px-6 py-2 lg:py-3">
                <p className="text-left text-[0.65rem] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300 lg:text-xs">
                  Last Played
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-visible rounded-b-lg bg-white shadow transition-colors dark:bg-gray-800 dark:shadow-gray-700/30">
          <ul
            id="champion-masteries-table"
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-900"
          >
            {
              // prettier-ignore
              !resultsTimeout && (!table || table?.length === 0) && filterTags.length === 0 && !filterChest ? (
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
