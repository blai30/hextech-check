import { useEffect, useState } from 'react'
import api from '@/lib/api'
import { Champion, ChampionMastery, Summoner } from '@/models'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [summoner, setSummoner] = useState<Summoner>()
  const [championMasteries, setChampionMasteries] = useState<ChampionMastery[]>([])
  const [championsTable, setChampionsTable] = useState<JSX.Element[]>([])

  useEffect(() => {
    const getSummoner = async () => {
      const response = await api.get('/summoner/Pse?platform=0')
      setSummoner(response.data)
    }

    const getChampionMasteries = async () => {
      const response = await api.get('/summoner/championmasteries/Pse?platform=0')
      setChampionMasteries(response.data)
    }

    const getChampionsTable = async () => {
      let table: JSX.Element[] = []

      championMasteries.map(async (championMastery) => {
        const response = await api.get<Champion>(`/champion/${championMastery.championId}`)
        const champion = response.data

        table.push(
          <tr key={championMastery.championId}>
            <td>{champion.name}</td>
            <td>{championMastery.championLevel}</td>
            <td>{championMastery.championPoints}</td>
            <td>{championMastery.chestGranted ? 'Yes' : 'No'}</td>
            <td>{championMastery.lastPlayTime}</td>
          </tr>
        )
      })

      setChampionsTable(table)
    }

    getSummoner()
    getChampionMasteries()
    getChampionsTable()
  }, [])

  if (!summoner || !championMasteries || !championsTable) {
    return <div>Loading...</div>
  }

  return (
    <div className="prose dark:prose-light">
      <div>
        <p>{summoner.id}</p>
        <p>{summoner.accountId}</p>
        <p>{summoner.name}</p>
        <p>{summoner.profileIconId}</p>
        <p>{summoner.puuid}</p>
        <p>{summoner.revisionDate}</p>
        <p>{summoner.summonerLevel}</p>
      </div>

      <table className="table-auto">
        <thead>
          <tr>
            <th>Champion</th>
            <th>Mastery Level</th>
            <th>Mastery Points</th>
            <th>Chest Obtained</th>
            <th>Last Played</th>
          </tr>
        </thead>
        <tbody>
          {championsTable}
        </tbody>
      </table>
    </div>
  )
}

export default Home
