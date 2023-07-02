import {
  getChampionMasteries,
  getChampions,
  getLeagues,
  getSummoner,
} from '@/lib/endpoints'
import { SearchForm, SummonerDetails } from '@/components'

export const metadata = {
  title: 'Player',
}

export default async function PlayerPage({
  params: { region, player },
}: {
  params: { region: string; player: string }
}) {
  const playerData = await getSummoner(region, player)
  const leaguesData = await getLeagues(region, playerData.id)
  const championsData = await getChampions()
  const masteriesData = await getChampionMasteries(region, playerData.id)

  await new Promise((resolve) => setTimeout(resolve, 2000))

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-6">
        <SearchForm />
        <SummonerDetails />
        <div>{leaguesData.map((league, index) => {
          return (
            <div key={index}>
              <h2>{league.queueType}</h2>
              <h1>{league.rank}</h1>
              <h3>{league.tier}</h3>
              <h3>{league.leaguePoints}</h3>
            </div>
          )
        })}</div>
        {masteriesData.map((mastery) => {
          return (
            <div key={mastery.championId}>
              {championsData[mastery.championId].name}
              <h1>{mastery.championLevel}</h1>
              <h2>{mastery.championPoints}</h2>
            </div>
          )
        })}
      </div>
    </div>
  )
}
