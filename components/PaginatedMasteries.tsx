'use client'

import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { MasteryCard } from '@/components'
import { ChestIcon, ClassIcon, Pagination } from '@/components/common'
import { ChampionDto, ChampionMasteryDto, Tag } from '@/models/riotapi'

const ITEMS_PER_PAGE = 24

const tags: Tag[] = [
  Tag.Fighter,
  Tag.Mage,
  Tag.Assassin,
  Tag.Tank,
  Tag.Support,
  Tag.Marksman,
]

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
  const [filterTags, setFilterTags] = useState<Tag[]>([])
  const [filterChest, setFilterChest] = useState<boolean>(false)
  const totalPages = Math.ceil(masteriesData.length / ITEMS_PER_PAGE)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentMasteries = masteriesData.slice(startIndex, endIndex)

  const toggleFilterTag = (tag: Tag) => {
    if (filterTags.includes(tag)) {
      setFilterTags(filterTags.filter((t) => t !== tag))
    } else {
      setFilterTags([...filterTags, tag])
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
        <input
          id="search-champion-name"
          type="search"
          name="Search champion name"
          aria-label="Search champion name"
          placeholder="Search champion"
          className="h-10 w-full items-center rounded-md bg-gray-200 px-3 py-2 text-black transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 md:w-48 lg:w-72"
        />
        <div className="grid grid-cols-4 2xs:grid-cols-7 items-center justify-center gap-2">
          {tags.map((tagName) => (
            <Switch
              key={tagName}
              id={`filter-tag-${tagName}`}
              name={`Filter by ${tagName}`}
              aria-label={`Filter by ${tagName}`}
              checked={filterTags.includes(tagName)}
              onChange={() => toggleFilterTag(tagName)}
              className={[
                'group flex h-10 w-10 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yellow-500',
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
              'group flex h-10 w-10 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yellow-500',
              filterChest
                ? 'text-yellow-600 hover:text-yellow-700 dark:text-yellow-300 dark:hover:text-yellow-200'
                : 'text-gray-300 hover:text-gray-400 dark:text-gray-700 dark:hover:text-gray-500',
            ].join(' ')}
          >
            <ChestIcon className="h-8 w-8" />
          </Switch>
        </div>
        <button className="h-10 w-full items-center rounded-md bg-gray-200 px-3 py-2 text-black transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 md:w-48 lg:w-72"></button>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={masteriesData.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={masteriesData.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
