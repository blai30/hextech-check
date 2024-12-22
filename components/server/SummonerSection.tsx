import { Suspense } from 'react'
import { LoadingSummoner, SummonerDetails } from '@/components/client'
import {
  getAccount,
  getChampionMasteries,
  getLeagues,
  getProfileIconUrl,
  getSummoner,
} from '@/lib/endpoints'

export default async function SummonerSection({
  region,
  player,
}: {
  region?: string
  player?: string
}) {
  const accountData = await getAccount(player)
  const masteriesData = await getChampionMasteries(region, accountData.puuid)
  const playerData = await getSummoner(region, accountData.puuid)
  const leaguesData = await getLeagues(region, playerData.id)
  const imageUrl = await getProfileIconUrl(playerData.profileIconId)

  return (
    <Suspense fallback={<LoadingSummoner />}>
      <SummonerDetails
        accountData={accountData}
        playerData={playerData}
        imageUrl={imageUrl}
        masteriesData={masteriesData}
        leaguesData={leaguesData}
      />
    </Suspense>
  )
}
