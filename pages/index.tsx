import type { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import api from '@/lib/api'
import { Summoner } from '@/models'
import ChampionMasteriesTable from '@/components/ChampionMasteriesTable'
import dayjs from '@/lib/dayjs';

const Home: NextPage = () => {
  const [summoner, setSummoner] = useState<Summoner>()
  const router = useRouter()
  const { platform, summonerName } = router.query

  useEffect(() => {
    const getSummoner = async () => {
      const response = await api.get(`/summoner/${summonerName}?${platform}=0`)
      setSummoner(response.data)
    }

    getSummoner()
  }, [platform, summonerName])

  if (!summoner) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="">
      <div>
        <p>{summoner.id}</p>
        <p>Summoner Name: {summoner.name}</p>
        <p>{summoner.accountId}</p>
        <p>{summoner.profileIconId}</p>
        <p>{summoner.puuid}</p>
        <p>{`${dayjs(summoner.revisionDate).format('L LT')} (${dayjs(summoner.revisionDate).fromNow()})`}</p>
        <p>Level: {summoner.level}</p>
      </div>

      <ChampionMasteriesTable summoner={summonerName} platform={platform} />
    </div>
  )
}

export default Home
