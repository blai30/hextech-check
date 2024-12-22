import { Suspense } from 'react'
import type { Metadata } from 'next'
import { LoadingSummoner, LoadingTable, SearchForm } from '@/components/client'
import { MasteriesSection, SummonerSection } from '@/components/server'
import {
  getAccount,
  getChampionMasteries,
  getChampions,
  getLatestVersion,
  getSummoner,
} from '@/lib/endpoints'

type Props = {
  params: Promise<{ region: string; player: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, player } = await params
  const version = await getLatestVersion()
  const accountData = await getAccount(player)
  const playerData = await getSummoner(region, accountData.puuid)
  const championsData = await getChampions(version)
  const masteriesData = await getChampionMasteries(region, accountData.puuid)

  if (!accountData || !playerData) {
    return {
      title: 'Player not found',
    }
  }

  const totalMastery = masteriesData.reduce(
    (acc, cur) => acc + cur.championPoints,
    0,
  )

  const topFive = masteriesData.slice(0, 5).map((mastery, index) => {
    const champion = championsData[mastery.championId]
    const points = mastery.championPoints.toLocaleString()
    return `${index + 1}. ${champion.name} - ${points}`
  })

  return {
    title: `${accountData.gameName}#${accountData.tagLine}`,
    description: `Total mastery: ${totalMastery.toLocaleString()}\n${topFive.join('\n')}`,
    openGraph: {
      images: [
        `http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${playerData.profileIconId}.png`,
      ],
    },
  }
}

export default async function PlayerPage({ params }: Props) {
  const { region, player } = await params

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-6">
        <SearchForm defaultRegion={region} defaultPlayer={player} />
        <Suspense fallback={<LoadingSummoner />}>
          <SummonerSection region={region} player={player} />
        </Suspense>
        <Suspense fallback={<LoadingTable />}>
          <MasteriesSection region={region} player={player} />
        </Suspense>
      </div>
    </div>
  )
}
