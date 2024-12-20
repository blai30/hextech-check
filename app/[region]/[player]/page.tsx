import { Suspense } from 'react'
import type { Metadata } from 'next'
import {
  LoadingSummoner,
  PaginatedMasteries,
  SearchForm,
  SummonerDetails,
} from '@/components'
import {
  getAccount,
  getChampionMasteries,
  getChampions,
  getLatestVersion,
  getLeagues,
  getProfileIconUrl,
  getSummoner,
} from '@/lib/endpoints'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string; player: string }>
}): Promise<Metadata> {
  const { region, player } = await params
  const version = await getLatestVersion()
  const accountData = await getAccount(player)
  const playerData = await getSummoner(region, accountData.puuid)
  const championsData = await getChampions(version)
  const masteriesData = await getChampionMasteries(region, accountData.puuid)

  if (!accountData || !playerData) {
    return {
      title: 'Summoner not found',
    }
  }

  const totalMastery = masteriesData.reduce(
    (acc, cur) => acc + cur.championPoints,
    0
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

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ region: string; player: string }>
}) {
  const { region, player } = await params
  const version = await getLatestVersion()
  const accountData = await getAccount(player)
  const championsData = await getChampions(version)
  const masteriesData = await getChampionMasteries(region, accountData.puuid)
  const playerData = await getSummoner(region, accountData.puuid)
  const leaguesData = await getLeagues(region, playerData.id)
  const imageUrl = await getProfileIconUrl(playerData.profileIconId)

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-6">
        <SearchForm defaultRegion={region} defaultPlayer={player} />
        <Suspense fallback={<LoadingSummoner />}>
          <SummonerDetails
            accountData={accountData}
            playerData={playerData}
            imageUrl={imageUrl}
            masteriesData={masteriesData}
            leaguesData={leaguesData}
          />
        </Suspense>
        <Suspense fallback={<span>Loading...</span>}>
          <PaginatedMasteries
            masteriesData={masteriesData}
            championsData={championsData}
            version={version}
          />
        </Suspense>
      </div>
    </div>
  )
}
