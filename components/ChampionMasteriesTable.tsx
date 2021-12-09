import { useEffect, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import api from '@/lib/api'
import { ChampionMastery } from '@/models'

const ChampionMasteriesTable = ({ name, region }) => {
  const [championNames, setChampionNames] = useState<{ [key: string]: string }>({})
  const [championMasteries, setChampionMasteries] = useState<ChampionMastery[]>([])
  const [championsTable, setChampionsTable] = useState<JSX.Element[]>([])

  useEffect(() => {
    const getChampionNames = async () => {
      const response = await api.get('/ChampionNames')
      setChampionNames(response.data)
    }

    getChampionNames()
  }, [])

  useEffect(() => {
    const getChampionMasteries = async () => {
      const response = await api.get<ChampionMastery[]>(`/ChampionMasteries/?region=${region}&name=${name}`)
      setChampionMasteries(response.data)
    }

    getChampionMasteries()
  }, [championNames])

  useEffect(() => {
    const getChampionsTable = async () => {
      let table: JSX.Element[] = []
  
      championMasteries.forEach((championMastery) => {
        const date = new Date(championMastery.lastPlayTime + 'Z')

        table.push(
          <tr key={championMastery.championId}>
            <td>{championNames[championMastery.championId.toString()]}</td>
            <td>{championMastery.championLevel}</td>
            <td>{championMastery.championPoints.toLocaleString()}</td>
            <td className={`${championMastery.chestGranted ? 'bg-green-600' : 'bg-red-600'}`}>{championMastery.chestGranted ? 'Yes' : 'No'}</td>
            <td>{`${format(date, 'Pp')} (${formatDistanceToNow(date)} ago)`}</td>
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
