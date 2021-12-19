import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'
import api from '@/lib/api'
import { Summoner, League, Champion, ChampionMastery } from '@/models'
import ChampionMasteriesTable from '@/components/ChampionMasteriesTable'
import Header from '@/components/Header'
import SearchForm from '@/components/SearchForm'
import SummonerDetails from '@/components/SummonerDetails'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const router = useRouter()
  const { region, summoner: summonerName } = router.query as { region: string, summoner: string }
  const [latestVersion, setLatestVersion] = useState<string>()
  const [summoner, setSummoner] = useState<Summoner>()
  const [leagues, setLeagues] = useState<League[]>()
  const [champions, setChampions] = useState<{ [key: number]: Champion }>({})
  const [championMasteries, setChampionMasteries] = useState<ChampionMastery[]>([])

  useEffect(() => {
    const getLatestVersion = async () => {
      const response = await axios.get<string[]>('https://ddragon.leagueoflegends.com/api/versions.json')
      setLatestVersion(response.data[0])
    }

    getLatestVersion()
  }, [])

  useEffect(() => {
    if (!region || !summonerName) {
      return
    }

    const getSummoner = async () => {
      const response = await api.get<Summoner>(`/Summoners/${region}/${summonerName}`)
      setSummoner(response.data)
    }

    getSummoner()
  }, [region, summonerName])

  useEffect(() => {
    if (!region || !summonerName) {
      return
    }

    const getLeagues = async () => {
      if (!summoner) {
        return
      }

      const response = await api.get<League[]>(`/Leagues/${region}/${summoner.id}`)
      setLeagues(response.data)
    }

    getLeagues()
  }, [region, summoner, summonerName])

  useEffect(() => {
    const getChampions = async () => {
      const response = await api.get<{ [key: number]: Champion }>('/Champions')
      setChampions(response.data)
    }

    getChampions()
  }, [])

  useEffect(() => {
    if (!region || !summonerName) {
      return
    }

    const getChampionMasteries = async () => {
      const response = await api.get<ChampionMastery[]>(`/ChampionMasteries/${region}/${summonerName}`)
      setChampionMasteries(response.data)
    }

    getChampionMasteries()
  }, [summonerName, region])

  return (
    <>
      <Head>
        <title key="page-title">Hextech Check</title>
        {/* Standard meta. */}
        <meta key="title" name="title" content="Hextech Check" />

        {/* Open Graph. */}
        <meta key="og:title" property="og:title" content="Hextech Check - League of Legends" />
        <meta key="og:site_name" property="og:site_name" content="Hextech Check" />
        <meta key="og:image" property="og:image" content="favicon.png?" />

        {/* Twitter meta. */}
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:title" property="twitter:title" content="Hextech Check" />
        <meta key="twitter:image" property="twitter:image" content="favicon.png" />
      </Head>
      <div className="my-2">
        <div className="container flex flex-col mx-auto p-4 space-y-6">
          <Header />
          <SearchForm />
          {region && summonerName ?
          <>
            <div>
              <SummonerDetails
                latestVersion={latestVersion}
                leagues={leagues}
                summoner={summoner}
                totalMastery={championMasteries.reduce((previousValue, currentValue) => previousValue + currentValue.championPoints, 0)}
              />
            </div>
            <div>
              <ChampionMasteriesTable
                latestVersion={latestVersion}
                champions={champions}
                championMasteries={championMasteries}
              />
            </div>
          </> :
          <>
            <div>
              <p className="text-xl">Enter a summoner name and region.</p>
            </div>
          </>}
        </div>
      </div>
    </>
  )
}

export default Home
