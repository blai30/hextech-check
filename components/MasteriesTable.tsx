import {
  getChampionMasteries,
  getChampions,
  getLatestVersion,
  getAccount,
} from '@/lib/endpoints'
import { MasteryCard } from '@/components'

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
      <ul className="grid grid-cols-1 justify-between gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {masteriesData.map((mastery) => {
          return (
            <MasteryCard
              key={mastery.championId}
              champion={championsData[mastery.championId]}
              mastery={mastery}
              version={version}
            />
          )
        })}
      </ul>
    </>
  )
}
