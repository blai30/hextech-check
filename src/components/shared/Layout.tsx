import { NextPage } from 'next'
import { Footer, Header } from '@/components/shared'

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <main id="layout" className="">
      <div className="flex flex-col grow min-h-screen container mx-auto my-2 p-4 space-y-6">
        <Header />
        {children}
        <Footer />
      </div>
    </main>
  )
}

export const getLayout = (page: NextPage) => <Layout>{page}</Layout>

export default Layout
