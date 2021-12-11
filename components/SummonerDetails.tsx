import { useEffect, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import api from '@/lib/api'
import { Summoner } from '@/models'

const SummonerDetails = ({ region, summonerName }: { summonerName: string, region: string }) => {
  const [summoner, setSummoner] = useState<Summoner>()

  useEffect(() => {
    const getSummoner = async () => {
      const response = await api.get(`/Summoners/${region}/${summonerName}`)
      setSummoner(response.data)
    }

    getSummoner()
  }, [region, summonerName])

  if (!summoner) {
    return (
      <div>Loading...</div>
    )
  }

  const date = new Date(summoner.revisionDate + 'Z')

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <p>{summoner.profileIconId}</p>
      <p>{summoner.name}</p>
      <p>{summoner.level}</p>
      <p>{`${format(date, 'Pp')} (${formatDistanceToNow(date)} ago)`}</p>
    </div>
  )
}

export default SummonerDetails
