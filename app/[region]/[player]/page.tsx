import {
  LoadingSummoner,
  MasteriesTable,
  SearchForm,
  SummonerDetails,
} from '@/components'
import { Suspense } from 'react'

export const metadata = {
  title: 'Player',
}

export default function PlayerPage({
  params: { region, player },
}: {
  params: { region: string; player: string }
}) {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-6">
        <SearchForm />
        <Suspense fallback={<LoadingSummoner />}>
          <SummonerDetails region={region} player={player} />
        </Suspense>
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <input
            id="filter-champion"
            name="filter-champion"
            title="Search champion"
            type="search"
            placeholder="Find champion..."
            className="w-full items-center rounded-md bg-gray-200 px-3 py-2 text-black transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 md:w-3/12"
          />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <MasteriesTable region={region} player={player} />
        </Suspense>
      </div>
    </div>
  )
}
