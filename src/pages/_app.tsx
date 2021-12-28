import '@/styles/globals.css'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps, router }: AppProps) {
  // @ts-ignore
  const getLayout = Component.getLayout || ((page: NextPage) => page)

  return (
    <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
      <DefaultSeo
        title="Hextech Check"
        description="View champion masteries and claimed hextech chests for your League of Legends summoner."
        canonical="https://hextech-check.bhlai.com/"
        openGraph={{
          url: "https://hextech-check.bhlai.com/",
          title: "Hextech Check",
          description: "View champion masteries and claimed hextech chests for your League of Legends summoner.",
          images: [
            {
              url: "favicon.png",
              width: 128,
              height: 128,
              alt: "Hextech Check",
            },
          ],
          site_name: "Hextech Check",
        }}
        twitter={{
          handle: "@blai30",
          site: "@blai30",
          cardType: "summary_large_image",
        }}
      />
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  )
}

export default MyApp
