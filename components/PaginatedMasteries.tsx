'use client'

import { useState } from 'react'
import { MasteryCard } from '@/components'
import { Pagination } from '@/components/common'
import { ChampionDto, ChampionMasteryDto } from '@/models/riotapi'

const ITEMS_PER_PAGE = 24

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
  const totalPages = Math.ceil(masteriesData.length / ITEMS_PER_PAGE)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentMasteries = masteriesData.slice(startIndex, endIndex)

  return (
    <div className="flex flex-col gap-8">
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
