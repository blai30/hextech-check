import { PaginatedMasteries } from '@/components/client'
import {
  getAccount,
  getChampionMasteries,
  getChampions,
  getLatestVersion,
} from '@/lib/endpoints'

export default async function MasteriesSection({
  region,
  player,
}: {
  region: string
  player: string
}) {
  const version = await getLatestVersion()
  const accountData = await getAccount(player)
  const championsData = await getChampions(version)
  const masteriesData = await getChampionMasteries(region, accountData.puuid)

  return (
    <PaginatedMasteries
      masteriesData={masteriesData}
      championsData={championsData}
      version={version}
    />
  )
}
