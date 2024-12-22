'use client'

import { useMemo, useState } from 'react'
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Switch,
} from '@headlessui/react'
import { MasteryCard } from '@/components/client'
import { ChestIcon, ClassIcon, Pagination } from '@/components/common'
import { ChampionDto, ChampionMasteryDto, Tag } from '@/models/riotapi'

const ITEMS_PER_PAGE = 24

enum SortingOption {
  Name = 'Name',
  Points = 'Points',
  Level = 'Level',
  LastPlayed = 'Last Played',
  Chest = 'Chest',
}

const sortingOptions: SortingOption[] = [
  SortingOption.Name,
  SortingOption.Points,
  SortingOption.Level,
  SortingOption.LastPlayed,
  SortingOption.Chest,
]

const tags: Tag[] = [
  Tag.Fighter,
  Tag.Mage,
  Tag.Assassin,
  Tag.Tank,
  Tag.Support,
  Tag.Marksman,
]

// prettier-ignore
const sortByCompare = (
  sortBy: SortingOption,
  ascending: boolean,
  champions: { [key: string]: ChampionDto },
) => (
  a: ChampionMasteryDto,
  b: ChampionMasteryDto
) => ({
  [SortingOption.Name]: champions[a.championId].name.localeCompare(champions[b.championId].name),
  [SortingOption.Points]: a.championPoints - b.championPoints,
  [SortingOption.Level]: a.championLevel - b.championLevel,
  [SortingOption.LastPlayed]: a.lastPlayTime - b.lastPlayTime,
  [SortingOption.Chest]: Number(a.chestGranted) - Number(b.chestGranted),
})[sortBy] * (ascending ? 1 : -1)

// prettier-ignore
const tagClasses: Readonly<Record<Tag, string>> = {
  [Tag.Fighter]: 'text-amber-600 hover:text-amber-700 dark:text-amber-300 dark:hover:text-amber-200',
  [Tag.Tank]: 'text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200',
  [Tag.Mage]: 'text-sky-600 hover:text-sky-700 dark:text-sky-300 dark:hover:text-sky-200',
  [Tag.Assassin]: 'text-red-600 hover:text-red-700 dark:text-red-300 dark:hover:text-red-200',
  [Tag.Support]: 'text-teal-600 hover:text-teal-700 dark:text-teal-300 dark:hover:text-teal-200',
  [Tag.Marksman]: 'text-green-600 hover:text-green-700 dark:text-green-300 dark:hover:text-green-200',
}

export default function PaginatedMasteries({
  masteriesData,
  championsData,
  version,
}: {
  masteriesData: ChampionMasteryDto[]
  championsData: { [key: string]: ChampionDto }
  version: string
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortingOption>(SortingOption.Points)
  const [ascending, setAscending] = useState(false)
  const [filterTags, setFilterTags] = useState<Tag[]>([])
  const [filterChest, setFilterChest] = useState<boolean>(false)

  // Filter and sort masteries based on the query, tags, and chest filter.
  const filteredMasteries = useMemo(() => {
    return masteriesData
      .filter((mastery) => {
        const champion = championsData[mastery.championId]
        const matchedQuery = query
          ? champion.name.toLowerCase().includes(query.toLowerCase())
          : true
        const hasTag =
          filterTags.length === 0 ||
          filterTags.every((tag) => champion.tags.includes(tag))
        const hasChest = !filterChest || !mastery.chestGranted
        return matchedQuery && hasTag && hasChest
      })
      .sort(sortByCompare(sortBy, ascending, championsData))
  }, [ascending, championsData, filterChest, filterTags, masteriesData, query, sortBy])

  // Paginate the filtered masteries.
  const totalPages = Math.ceil(filteredMasteries.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentMasteries = filteredMasteries.slice(startIndex, endIndex)

  const toggleFilterTag = (tag: Tag) => {
    setCurrentPage(1)
    if (filterTags.includes(tag)) {
      setFilterTags(filterTags.filter((t) => t !== tag))
    } else {
      setFilterTags([...filterTags, tag])
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
        {/* Search by name query */}
        <input
          id="search-champion-name"
          type="search"
          name="Search champion name"
          aria-label="Search champion name"
          placeholder="Search champion"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-10 w-full items-center rounded-md bg-gray-200 px-3 py-2 text-black hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 md:w-48 lg:w-72"
        />

        {/* Filter by tags and chest */}
        <div className="grid grid-cols-4 items-center justify-center gap-2 2xs:grid-cols-7">
          {tags.map((tagName) => (
            <Switch
              key={tagName}
              id={`filter-tag-${tagName}`}
              name={`Filter by ${tagName}`}
              aria-label={`Filter by ${tagName}`}
              checked={filterTags.includes(tagName)}
              onChange={() => toggleFilterTag(tagName)}
              className={[
                'group flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yellow-500',
                filterTags.includes(tagName)
                  ? tagClasses[tagName]
                  : 'text-gray-300 hover:text-gray-400 dark:text-gray-700 dark:hover:text-gray-500',
              ].join(' ')}
            >
              <ClassIcon className="h-8 w-8" tag={tagName} />
            </Switch>
          ))}
          <Switch
            id="filter-chest"
            name="Filter by chest"
            aria-label="Filter by chest"
            checked={filterChest}
            onChange={() => setFilterChest(!filterChest)}
            className={[
              'group flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yellow-500',
              filterChest
                ? 'text-yellow-600 hover:text-yellow-700 dark:text-yellow-300 dark:hover:text-yellow-200'
                : 'text-gray-300 hover:text-gray-400 dark:text-gray-700 dark:hover:text-gray-500',
            ].join(' ')}
          >
            <ChestIcon className="h-8 w-8" />
          </Switch>
        </div>

        {/* Sorting options */}
        <div className="flex w-full flex-row items-center justify-center gap-2 md:w-48 lg:w-72">
          <Listbox name="sorting" value={sortBy} onChange={setSortBy}>
            <Label className="sr-only">Sort masteries</Label>
            <div className="relative w-full">
              <ListboxButton
                id="sort-masteries-dropdown"
                title="Sort masteries dropdown"
                className="h-10 w-full cursor-default items-center rounded-md bg-gray-200 py-2 pl-3 pr-8 text-black hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yellow-500 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                <span className="flex items-center">{sortBy}</span>
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
              </ListboxButton>
              <ListboxOptions
                transition
                modal={false}
                className="absolute left-0 z-20 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white/50 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-lg focus:outline-none dark:bg-gray-700/50 sm:text-sm md:w-72"
              >
                {sortingOptions.map((option, index) => (
                  <ListboxOption
                    key={index}
                    id={`sort-option-${index}`}
                    className="group relative cursor-default select-none py-2 pl-2 pr-8 text-gray-900 data-[active]:bg-yellow-600 data-[active]:text-white dark:text-gray-100 data-[active]:dark:bg-yellow-400 data-[active]:dark:text-black"
                    value={option}
                  >
                    <span className="flex items-center font-normal group-data-[selected]:font-semibold">
                      {option}
                    </span>

                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-yellow-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-black dark:text-yellow-300">
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
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>

          {/* Sorting direction control */}
          <button
            id="sort-direction"
            type="button"
            title="Sorting direction button"
            name="Sorting direction button"
            onClick={() => setAscending(!ascending)}
            className="flex h-10 cursor-default items-center justify-center rounded-md bg-gray-200 px-2 text-black hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yellow-500 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            {ascending ? (
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
                />
              </svg>
            ) : (
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Top pagination controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredMasteries.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChangeAction={setCurrentPage}
      />

      {/* Table of champion mastery cards */}
      <ul className="grid grid-cols-1 justify-between gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {currentMasteries.map((mastery) => (
          <li key={mastery.championId}>
            <MasteryCard
              champion={championsData[mastery.championId]}
              mastery={mastery}
              version={version}
              className="h-full w-full"
            />
          </li>
        ))}
      </ul>

      {/* Bottom pagination controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredMasteries.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChangeAction={setCurrentPage}
      />
    </div>
  )
}
