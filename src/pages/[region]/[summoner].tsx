import Head from 'next/head'
import axios from 'axios'
import useSWR from 'swr'
import api from '@/lib/api'
import { fetcher } from '@/hooks/useGet'
import { Summoner, League, ChampionMastery } from '@/models'
import { ChampionMasteriesTable, SearchForm, SummonerDetails } from '@/components'
import { getLayout } from '@/components/shared'
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'

const SummonerPage = ({
  region,
  summonerName,
  latestVersion,
  imageUrl,
}: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const {
    data: summoner,
    error: summonerError,
  } = useSWR<Summoner>(`/Summoners/${region}/${summonerName}`, fetcher)

  const {
    data: leagues,
    error: leaguesError,
  } = useSWR<League[]>(() => `/Leagues/${region}/${summoner!.id}`, fetcher)

  const {
    data: championMasteries,
    error: championMasteriesError,
  } = useSWR<ChampionMastery[]>(`/ChampionMasteries/${region}/${summonerName}`, fetcher)

  if ((!summonerError && !summoner) || (!leaguesError && !leagues) || (!championMasteriesError && !championMasteries)) {
    return <p>Loading...</p>
  }

  const totalMastery = championMasteries!.reduce((previousValue, currentValue) => previousValue + currentValue.championPoints, 0)

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
          imageUrl={imageUrl}
          leagues={leagues as League[]}
          summoner={summoner as Summoner}
          totalMastery={totalMastery as number}
        />
        <ChampionMasteriesTable
          latestVersion={latestVersion as string}
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
      latestVersion,
      imageUrl,
    }
  }
}

SummonerPage.getLayout = (page: NextPage) => getLayout(page)

export default SummonerPage
