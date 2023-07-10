import {
  getChampionMasteries,
  getChampions,
  getLeagues,
  getSummoner,
} from '@/lib/endpoints'
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

export default async function PlayerPage({
  params: { region, player },
}: {
  params: { region: string; player: string }
}) {
  // const playerData = await getSummoner(region, player)
  // const leaguesData = await getLeagues(region, playerData.id)
  // const championsData = await getChampions()
  // const masteriesData = await getChampionMasteries(region, playerData.id)

  // await new Promise((resolve) => setTimeout(resolve, 2000))

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-6">
        <SearchForm />
        <Suspense fallback={<LoadingSummoner />}>
          <SummonerDetails region={region} player={player} />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <MasteriesTable region={region} player={player} />
        </Suspense>
      </div>
    </div>
  )
}
