import {
  LoadingSummoner,
  MasteriesTable,
  SearchForm,
  SummonerDetails,
} from '@/components'
import { Suspense } from 'react'
import type { Metadata, ResolvingMetadata } from 'next'
import { getLatestVersion, getSummoner } from '@/lib/endpoints'

export async function generateMetadata(
  {
    params: { region, player },
  }: {
    params: { region: string; player: string }
  },
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const version = await getLatestVersion()
  const playerData = await getSummoner(region, player)

  return {
    title: playerData.name,
    openGraph: {
      images: [`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${playerData.profileIconId}.png`],
    },
  }
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
        <Suspense fallback={<div>Loading...</div>}>
          <MasteriesTable region={region} player={player} />
        </Suspense>
      </div>
    </div>
  )
}
