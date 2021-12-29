import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from 'axios'
import api from '@/lib/api'
import { Summoner, League, Champion, ChampionMastery } from '@/models'
import { ChampionMasteriesTable, SearchForm, SummonerDetails } from '@/components'
import { getLayout } from '@/components/shared'
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'

const SummonerPage = ({
  region,
  summonerName,
  imageUrl,
}: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
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
    const getSummoner = async () => {
      const response = await api.get<Summoner>(`/Summoners/${region}/${summonerName}`)
      setSummoner(response.data)
    }

    getSummoner()
  }, [region, summonerName])

  useEffect(() => {
    const getLeagues = async () => {
      if (!summoner) {
        return
      }

      const response = await api.get<League[]>(`/Leagues/${region}/${summoner.id}`)
      setLeagues(response.data)
    }

    getLeagues()
  }, [region, summoner])

  useEffect(() => {
    const getChampions = async () => {
      const response = await api.get<{ [key: number]: Champion }>('/Champions')
      setChampions(response.data)
    }

    getChampions()
  }, [])

  useEffect(() => {
    const getChampionMasteries = async () => {
      const response = await api.get<ChampionMastery[]>(`/ChampionMasteries/${region}/${summonerName}`)
      setChampionMasteries(response.data)
    }

    getChampionMasteries()
  }, [region, summonerName])

  const totalMastery = championMasteries.reduce((previousValue, currentValue) => previousValue + currentValue.championPoints, 0)

  return (
    <>
      <Head>
        <title key="page-title">{summonerName} ({region}) - Hextech Check</title>
        <meta key="title" name="title" property="title" content={`${summonerName} (${region})`} />
        <meta key="og:title" name="og:title" property="og:title" content={`${summonerName} (${region})`} />
        <meta key="og:image" name="og:image" property="og:image" content={imageUrl} />
        <meta key="twitter:url" name="twitter:url" property="twitter:url" content={`https://hextech-check.bhlai.com/${region}/${summonerName}/`} />
        <meta key="twitter:title" name="twitter:title" property="twitter:title" content={`${summonerName} (${region}) - Hextech Check`} />
        <meta key="twitter:image" name="twitter:image" property="twitter:image" content={imageUrl} />
      </Head>
      <div className="flex flex-col grow space-y-6">
        <SearchForm />
        <SummonerDetails
          latestVersion={latestVersion as string}
          leagues={leagues as League[]}
          summoner={summoner as Summoner}
          totalMastery={totalMastery as number}
        />
        <ChampionMasteriesTable
          latestVersion={latestVersion as string}
          champions={champions as { [key: number]: Champion }}
          championMasteries={championMasteries as ChampionMastery[]}
        />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { region, summoner: summonerName } = context.query as { region: string, summoner: string }

  const summoner = await api
    .get<Summoner>(`/Summoners/${region}/${summonerName}`)
    .then((response) => response.data)
    .catch(() => null)

  if (!summoner) {
    return {
      props: {}
    }
  }

  const latestVersion = await axios
    .get<string>('https://ddragon.leagueoflegends.com/api/versions.json')
    .then((response) => response.data[0])

  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/profileicon/${summoner.profileIconId}.png`

  return {
    props: {
      region,
      summonerName: summoner.name,
      imageUrl,
    }
  }
}

SummonerPage.getLayout = (page: NextPage) => getLayout(page)

export default SummonerPage
