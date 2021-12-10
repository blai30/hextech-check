import { useEffect, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import api from '@/lib/api'
import { Summoner } from '@/models'

const SummonerDetails = ({ name, region }: { name: string, region: string }) => {
  const [summoner, setSummoner] = useState<Summoner>()

  useEffect(() => {
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
    <div>
      <p>{summoner.id}</p>
      <p>{summoner.name}</p>
      <p>{summoner.accountId}</p>
      <p>{summoner.profileIconId}</p>
      <p>{summoner.puuid}</p>
      <p>{`${format(date, 'Pp')} (${formatDistanceToNow(date)} ago)`}</p>
      <p>{summoner.level}</p>
    </div>
  )
}

export default SummonerDetails
