import { useRouter } from 'next/router'
import ChampionMasteriesTable from '@/components/ChampionMasteriesTable'
import SearchForm from '@/components/SearchForm'
import SummonerDetails from '@/components/SummonerDetails'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const router = useRouter()
  const { region, summoner } = router.query as { region: string, summoner: string }

  return (
    <div className="container mx-auto px-4">
      <SearchForm />
      {region && summoner &&
      <>
        <SummonerDetails region={region} summonerName={summoner} />
        <ChampionMasteriesTable region={region} summonerName={summoner} />
      </>}
    </div>
  )
}

export default Home
