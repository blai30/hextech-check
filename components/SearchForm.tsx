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
          className="inline-flex items-center px-3 rounded-l-md text-black dark:text-white bg-gray-50 dark:bg-gray-800 border border-r-0 border-gray-300 dark:border-gray-600"
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
          className="inline-flex flex-1 items-center px-3 text-black dark:text-white bg-white dark:bg-gray-900 border border-r-0 border-gray-300 dark:border-gray-600"
        />

        <button
          id="submit"
          type="submit"
          className="inline-flex items-center px-3 py-2 rounded-r-md text-white border border-gray-300 dark:border-gray-600 bg-blue-500 hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchForm
