import { getChampionMasteries, getChampions, getLeagues, getSummoner } from '@/lib/endpoints'

export const metadata = {
  title: 'Summoner',
}

export default async function SummonerPage({
  params: { region, summoner },
}: {
  params: { region: string; summoner: string }
}) {
  const summonerData = await getSummoner(region, summoner)
  const leaguesData = await getLeagues(region, summonerData.id)
  const championsData: RiotGamesAPI.LolStaticData.ChampionListDto = await getChampions()
  const masteryData: RiotGamesAPI.ChampionMastery.ChampionMasteryDto[] = await getChampionMasteries(region, summonerData.id)
  const champions: { [key: string]: RiotGamesAPI.LolStaticData.ChampionDto } = Object.keys(championsData.data).reduce((acc, key) => {
    acc[championsData.data[key].key] = championsData.data[key]
    return acc
  }, {} as { [key: string]: RiotGamesAPI.LolStaticData.ChampionDto })

  return (
    <main>
      {/* <h1 className="bg-pink-400">{JSON.stringify(summonerData)}</h1>
      <h1 className="bg-green-400">{JSON.stringify(leaguesData)}</h1>
      <h1 className="bg-blue-400">{JSON.stringify(championsData)}</h1>
      <h1 className="bg-orange-400">{JSON.stringify(masteryData)}</h1> */}
      {masteryData.map((mastery) => {
        return (
          <div key={mastery.championId}>
            {champions[mastery.championId].name}
            <h1>{mastery.championLevel}</h1>
            <h2>{mastery.championPoints}</h2>
          </div>
        )
      })}
    </main>
  )
}
