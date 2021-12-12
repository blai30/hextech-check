import { useRouter } from 'next/router'
import ChampionMasteriesTable from '@/components/ChampionMasteriesTable'
import SearchForm from '@/components/SearchForm'
import SummonerDetails from '@/components/SummonerDetails'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const router = useRouter()
  const { region, summoner } = router.query as { region: string, summoner: string }

  return (
    <div className="container flex flex-col mx-auto p-4 space-y-4">
      <SearchForm />
      {region && summoner ?
      <>
        <div>
          <SummonerDetails region={region} summonerName={summoner} />
        </div>
        <div>
          <ChampionMasteriesTable region={region} summonerName={summoner} />
        </div>
      </> :
      <>
        <div>
          <p className="">Enter a summoner name and region.</p>
        </div>
      </>}
    </div>
  )
}

export default Home
