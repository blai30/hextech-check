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
      <div className="mt-4">
        <SearchForm />
      </div>
      {region && summoner ?
      <>
        <div className="mt-4">
          <SummonerDetails region={region} summonerName={summoner} />
        </div>
        <div className="mt-4">
          <ChampionMasteriesTable region={region} summonerName={summoner} />
        </div>
      </> :
      <>
        <div className="mt-4">
          <p className="">Enter a summoner name and region.</p>
        </div>
      </>}
    </div>
  )
}

export default Home
