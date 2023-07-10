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
    <div className="flex flex-wrap justify-between gap-x-4 gap-y-8">
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
  )
}
