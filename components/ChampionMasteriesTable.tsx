import { useEffect, useState } from 'react'
import api from '@/lib/api'
import dayjs from '@/lib/dayjs'
import { ChampionMastery } from '@/models'

const ChampionMasteriesTable = ({ summoner, platform }) => {
  const [championMasteries, setChampionMasteries] = useState<ChampionMastery[]>([])
  const [championNames, setChampionNames] = useState<{ [key: string]: string }>({})
  const [championsTable, setChampionsTable] = useState<JSX.Element[]>([])

  useEffect(() => {
    const getChampionMasteries = async () => {
      const response = await api.get<ChampionMastery[]>(`/summoner/championmasteries/${summoner}?platform=${platform}`)
      setChampionMasteries(response.data)
    }

    getChampionMasteries()
  }, [platform, summoner])

  useEffect(() => {
    const getChampionNames = async () => {
      const response = await api.get('/champion')
      setChampionNames(response.data)
    }

    getChampionNames()
  }, [])

  useEffect(() => {

    const getChampionsTable = async () => {
      let table: JSX.Element[] = []
  
      championMasteries.forEach((championMastery) => {
        const date = dayjs(championMastery.lastPlayTime).format('L LT')
        const ago = dayjs(championMastery.lastPlayTime).fromNow()

        table.push(
          <tr key={championMastery.championId}>
            <td>{championNames[championMastery.championId.toString()]}</td>
            <td>{championMastery.championLevel}</td>
            <td>{championMastery.championPoints.toLocaleString()}</td>
            <td className={`${championMastery.chestGranted ? 'bg-green-600' : 'bg-red-600'}`}>{championMastery.chestGranted ? 'Yes' : 'No'}</td>
            <td>{`${date} (${ago})`}</td>
          </tr>
        )
      })
  
      setChampionsTable(table)
    }

    getChampionsTable()
  }, [championMasteries, championNames])

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th scope="col" className="">Champion</th>
          <th scope="col" className="">Mastery Level</th>
          <th scope="col" className="">Mastery Points</th>
          <th scope="col" className="">Chest Obtained</th>
          <th scope="col" className="">Last Played</th>
        </tr>
      </thead>
      <tbody>
        {championsTable}
      </tbody>
    </table>
  )
}

export default ChampionMasteriesTable
