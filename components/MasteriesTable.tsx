import { Suspense } from 'react'
import {
  getChampionMasteries,
  getChampions,
  getLatestVersion,
  getAccount,
} from '@/lib/endpoints'
import PaginatedMasteries from '@/components/PaginatedMasteries'

export default async function MasteriesTable({
  region,
  player,
}: {
  region: string
  player: string
}) {
  // const [query, setQuery] = useState('')
  const version = await getLatestVersion()
  const accountData = await getAccount(player)
  const championsData = await getChampions(version)
  const masteriesData = await getChampionMasteries(region, accountData.puuid)

  return (
    <>
      {/* <form className="flex flex-col items-center md:flex-row md:justify-between">
        <input
          id="filter-champion"
          name="filter-champion"
          title="Search champion"
          type="search"
          // value={query}
          // onChange={(e) => setQuery(e.target.value)}
          placeholder="Find champion..."
          className="w-full items-center rounded-md bg-gray-200 px-3 py-2 text-black transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 md:w-3/12"
        />
      </form> */}
      <Suspense fallback={<div>Loading...</div>}>
        <PaginatedMasteries
          masteriesData={masteriesData}
          championsData={championsData}
          version={version}
        />
      </Suspense>
    </>
  )
}
