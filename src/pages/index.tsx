import Head from 'next/head'
import { SearchForm } from '@/components'
import { Footer, Header } from '@/components/shared'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title key="page-title">Hextech Check</title>

        {/* Standard meta. */}
        <meta key="title" name="title" content="Hextech Check" />

        {/* Open Graph. */}
        <meta key="og:title" property="og:title" content="Hextech Check - League of Legends" />
        <meta key="og:site_name" property="og:site_name" content="Hextech Check" />
        <meta key="og:image" property="og:image" content="favicon.png" />

        {/* Twitter meta. */}
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:title" property="twitter:title" content="Hextech Check" />
        <meta key="twitter:image" property="twitter:image" content="favicon.png" />
      </Head>
      <main className="flex flex-col grow container mx-auto my-2 p-4 space-y-6">
        <Header />
        <div className="grow justify-center space-y-10 md:px-8 flex flex-col">
          <p className="px-8 whitespace-normal font-light text-center text-xl text-gray-700 dark:text-gray-200">
            Enter a summoner name and region.
          </p>
          <SearchForm />
        </div>
        <Footer />
      </main>
    </>
  )
}

export default Home
