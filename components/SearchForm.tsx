import { useRouter } from 'next/router';
import { useState } from 'react'

const SearchForm = () => {
  const [name, setName] = useState('')
  const [region, setRegion] = useState('')
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
        name,
        region
      }
    })
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={name} onChange={handleChangeName} required />
        <select name="region" id="region" value={region} onChange={handleChangeRegion} required>
          <option value="">Select a region</option>
          <option value="NA">North America</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SearchForm
