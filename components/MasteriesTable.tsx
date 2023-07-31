import {
  getSummoner,
  getChampionMasteries,
  getChampions,
  getLatestVersion,
} from '@/lib/endpoints'
import { MasteryCard } from '@/components'

export default async function MasteriesTable({
  region,
  player,
}: {
  region: string
  player: string
}) {
  const version = await getLatestVersion()
  const playerData = await getSummoner(region, player)
  const championsData = await getChampions(version)
  const masteriesData = await getChampionMasteries(region, playerData.id)

  return (
    <>
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
