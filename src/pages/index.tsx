import Head from 'next/head'
import { SearchForm } from '@/components'
import { getLayout } from '@/components/shared'
import type { NextPage } from 'next'

const Home = () => {
  return (
    <>
      <Head>
        <title key="page-title">Home - Hextech Check</title>

        {/* Standard meta. */}
        <meta key="title" name="title" content="Home - Hextech Check" />

        {/* Open Graph. */}
        <meta
          key="og:title"
          property="og:title"
          content="Home - Hextech Check"
        />
        <meta key="og:image" property="og:image" content="/favicon.png" />

        {/* Twitter meta. */}
        <meta
          key="twitter:title"
          property="twitter:title"
          content="Home - Hextech Check"
        />
        <meta
          key="twitter:image"
          property="twitter:image"
          content="/favicon.png"
        />
      </Head>
      <div className="flex grow flex-col items-center justify-center space-y-10 md:px-8">
        <p className="whitespace-normal px-8 text-center text-xl font-light text-gray-700 dark:text-gray-200">
          Enter a summoner name and region.
        </p>
        <SearchForm />
      </div>
    </>
  )
}

Home.getLayout = (page: NextPage) => getLayout(page)

export default Home
