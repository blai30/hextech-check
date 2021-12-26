import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'
import api from '@/lib/api'
import { Summoner, League, Champion, ChampionMastery } from '@/models'
import { ChampionMasteriesTable, SearchForm, SummonerDetails } from '@/components'
import { Header } from '@/components/shared'
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

  const totalMastery = championMasteries.reduce((previousValue, currentValue) => previousValue + currentValue.championPoints, 0)

  return (
    <>
      <Head>
        <title key="page-title">Hextech Check</title>

        {/* Standard meta. */}
        <meta key="title" name="title" content="Hextech Check" />

        {/* Open Graph. */}
        <meta key="og:title" property="og:title" content="Hextech Check - League of Legends" />
        <meta key="og:site_name" property="og:site_name" content="Hextech Check" />
        <meta key="og:image" property="og:image" content={`${process.env.NEXT_PUBLIC_PATH_PREFIX}favicon.png`} />

        {/* Twitter meta. */}
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:title" property="twitter:title" content="Hextech Check" />
        <meta key="twitter:image" property="twitter:image" content={`${process.env.NEXT_PUBLIC_PATH_PREFIX}favicon.png`} />
      </Head>
      <div className="h-full flex flex-col">
        <div className="container mx-auto my-2 p-4 h-3/5 flex flex-col space-y-6">
          <Header />
          {region && summonerName ? (<>
            <SearchForm />
            <div>
              <SummonerDetails
                latestVersion={latestVersion}
                leagues={leagues}
                summoner={summoner}
                totalMastery={totalMastery}
              />
            </div>
            <div>
              <ChampionMasteriesTable
                latestVersion={latestVersion}
                champions={champions}
                championMasteries={championMasteries}
              />
            </div>
          </>) : (
            <div className="h-full flex flex-col space-y-10 md:px-8 justify-center">
              {!region && !summonerName && (
                <div className="flex flex-col items-center">
                  <p className="px-8 whitespace-normal font-light text-center text-xl text-gray-700 dark:text-gray-200">Enter a summoner name and region.</p>
                </div>
              )}
              <SearchForm />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
