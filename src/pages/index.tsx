import { SearchForm } from '@/components'
import { getLayout } from '@/components/shared'
import type { NextPage } from 'next'

const Home = () => {
  return (
    <>
      <div className="flex flex-col grow items-center justify-center space-y-10 md:px-8">
        <p className="px-8 whitespace-normal font-light text-center text-xl text-gray-700 dark:text-gray-200">
          Enter a summoner name and region.
        </p>
        <SearchForm />
      </div>
    </>
  )
}

Home.getLayout = (page: NextPage) => getLayout(page)

export default Home
