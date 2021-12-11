import { useState } from 'react'
import { useRouter } from 'next/router'

const regions = [
  { value: 'NA', label: 'North America' },
  { value: 'EUW', label: 'Europe West' },
  { value: 'EUNE', label: 'Europe Nordic & East' },
  { value: 'KR', label: 'Korea' },
  { value: 'BR', label: 'Brazil' },
  { value: 'JP', label: 'Japan' },
  { value: 'RU', label: 'Russia' },
  { value: 'OCE', label: 'Oceania' },
  { value: 'TR', label: 'Turkey' },
  { value: 'LAN', label: 'Latin America North' },
  { value: 'LAS', label: 'Latin America South' }
]

const SearchForm = () => {
  const [summoner, setName] = useState('')
  const [region, setRegion] = useState('NA')
  const router = useRouter()

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleChangeRegion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push({
      query: {
        summoner,
        region
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row items-center">
        <label htmlFor="region" className="sr-only">
          Region
        </label>
        <select
          id="region"
          name="region"
          value={region}
          onChange={handleChangeRegion}
          className="h-full border-gray-300 sm:text-sm rounded-md"
        >
          {regions.map(({ value, label }) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <input
          id="summoner"
          name="summoner"
          type="text"
          placeholder="Summoner name"
          value={summoner}
          onChange={handleChangeName}
          className="block w-full sm:text-sm border-gray-300 rounded-md"
        />

        <button id="submit" type="submit" className="px-3 py-1 bg-green-400 hover:bg-green-300 rounded-md">Submit</button>
      </div>
    </form>
  )
}

export default SearchForm
