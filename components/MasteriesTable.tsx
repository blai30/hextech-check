import {
  getSummoner,
  getChampionMasteries,
  getChampions,
} from '@/lib/endpoints'
import { MasteryCard } from '@/components'

export default async function MasteriesTable({
  region,
  player,
}: {
  region: string
  player: string
}) {
  const playerData = await getSummoner(region, player)
  const championsData = await getChampions()
  const masteriesData = await getChampionMasteries(region, playerData.id)

  return (
    <>
      <div className="grid grid-cols-1 justify-between gap-x-6 gap-y-8 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {masteriesData.map((mastery) => {
          return (
            <MasteryCard
              key={mastery.championId}
              champion={championsData[mastery.championId]}
              mastery={mastery}
            />
          )
        })}
      </div>
    </>
  )
}
