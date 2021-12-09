import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import api from '@/lib/api'
import { Summoner } from '@/models'
import ChampionMasteriesTable from '@/components/ChampionMasteriesTable'

const Home: NextPage = () => {
  const [summoner, setSummoner] = useState<Summoner>()
  const router = useRouter()
  const { region, name } = router.query

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    const getSummoner = async () => {
      const response = await api.get(`/Summoners/${region}/${name}`)
      setSummoner(response.data)
    }

    getSummoner()
  }, [region, name])

  if (!summoner) {
    return (
      <div>Loading...</div>
    )
  }

  const date = new Date(summoner.revisionDate + 'Z')

  return (
    <div className="">
      <div>
        <p>{summoner.id}</p>
        <p>{summoner.name}</p>
        <p>{summoner.accountId}</p>
        <p>{summoner.profileIconId}</p>
        <p>{summoner.puuid}</p>
        <p>{`${format(date, 'Pp')} (${formatDistanceToNow(date)} ago)`}</p>
        <p>{summoner.level}</p>
      </div>

      <ChampionMasteriesTable name={name} region={region} />
    </div>
  )
}

export default Home
