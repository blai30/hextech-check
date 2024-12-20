'use client'

import { useState } from 'react'
import { MasteryCard } from '@/components'
import { ChampionDto, ChampionMasteryDto } from '@/models/riotapi'

const ITEMS_PER_PAGE = 24

const getPageNumbers = (current: number, total: number) => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  if (current <= 3) {
    return [1, 2, 3, 4, '...', total]
  }

  if (current >= total - 2) {
    return [1, '...', total - 3, total - 2, total - 1, total]
  }

  return [1, '...', current - 1, current, current + 1, '...', total]
}

export default function PaginatedMasteryList({
  masteriesData,
  championsData,
  version,
}: {
  masteriesData: ChampionMasteryDto[]
  championsData: { [key: string]: ChampionDto }
  version: string
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(masteriesData.length / ITEMS_PER_PAGE)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentMasteries = masteriesData.slice(startIndex, endIndex)

  return (
    <div className="flex flex-col gap-8">
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

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {`Showing ${startIndex + 1} to ${Math.min(endIndex, masteriesData.length)} of ${masteriesData.length} results`}
        </p>
        <nav className="flex flex-row gap-1" aria-label="Pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          {getPageNumbers(currentPage, totalPages).map((pageNum, idx) => (
            <button
              key={idx}
              onClick={() =>
                typeof pageNum === 'number' && setCurrentPage(pageNum)
              }
              disabled={pageNum === '...'}
              className={`flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium ${
                pageNum === currentPage
                  ? 'bg-yellow-500 text-white dark:bg-yellow-700'
                  : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              {pageNum}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  )
}
