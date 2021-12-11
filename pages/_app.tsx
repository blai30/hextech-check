import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    // <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
    //   <Component {...pageProps} />
    // </ThemeProvider>
    <Component {...pageProps} />
  )
}

export default MyApp
