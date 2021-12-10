import { useRouter } from 'next/router'
import ChampionMasteriesTable from '@/components/ChampionMasteriesTable'
import SearchForm from '@/components/SearchForm'
import SummonerDetails from '@/components/SummonerDetails'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const router = useRouter()
  const { region, name } = router.query as { region: string, name: string }

  return (
    <div className="">
      <SearchForm />
      {region && name &&
      <>
        <SummonerDetails region={region} name={name} />
        <ChampionMasteriesTable region={region} name={name} />
      </>}
    </div>
  )
}

export default Home
