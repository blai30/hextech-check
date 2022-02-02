import { NextPage } from 'next'
import { Footer, Header } from '@/components/shared'

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <main id="layout" className="">
      <div className="container mx-auto my-2 flex min-h-screen grow flex-col gap-6 p-4 print:mx-0 print:max-w-none print:p-0">
        <Header />
        {children}
        <Footer />
      </div>
    </main>
  )
}

export const getLayout = (page: NextPage) => <Layout>{page}</Layout>

export default Layout
