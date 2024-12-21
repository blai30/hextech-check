import { Suspense } from 'react'
import type { Metadata } from 'next'
import {
  LoadingSummoner,
  MasteriesTable,
  SearchForm,
  SummonerDetails,
} from '@/components'
import { getAccount, getLatestVersion, getSummoner } from '@/lib/endpoints'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string; player: string }>
}): Promise<Metadata> {
  const { region, player } = await params
  const version = await getLatestVersion()
  const accountData = await getAccount(player)
  const playerData = await getSummoner(region, accountData.puuid)

  if (!accountData || !playerData) {
    return {
      title: 'Summoner not found',
    }
  }

  return {
    title: `${accountData.gameName}#${accountData.tagLine}`,
    openGraph: {
      images: [
        `http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${playerData.profileIconId}.png`,
      ],
    },
  }
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ region: string; player: string }>
}) {
  const { region, player } = await params

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-6">
        <SearchForm defaultRegion={region} defaultPlayer={player} />
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
