import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps, router }: AppProps) {
  // @ts-ignore
  const getLayout = Component.getLayout || ((page: NextPage) => page)

  return (
    <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  )
}

export default MyApp
