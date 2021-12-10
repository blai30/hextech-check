import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

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

  const handleSubmit = () => {
    router.push(`/${region}/${name}`)
  }

  const getLink = () => {
    if (region && name) {
      return `/${region}/${name}`
    }

    return '/'
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={name} onChange={handleChangeName} required />
        <select name="region" id="region" value={region} onChange={handleChangeRegion} required>
          <option value="">Select a region</option>
          <option value="NA">North America</option>
        </select>
        <Link href={getLink()}>Submit</Link>
      </form>
    </div>
  )
}

export default SearchForm
