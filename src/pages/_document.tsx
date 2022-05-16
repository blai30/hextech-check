import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return initialProps
  }

  render() {
    return (
      <Html lang="en" className="">
        <Head>
          {/* Standard meta. */}
          <meta key="author" name="author" content="Brian Lai" />
          <meta
            key="description"
            name="description"
            content="View champion masteries and claimed hextech chests for your League of Legends summoner."
          />
          <meta
            key="keywords"
            name="keywords"
            content="League of Legends, Hextech Chest, Mastery, Champion, Summoner, Riot Games API, Open Source, React, NextJS, Tailwind, HTML, CSS, JavaScript, TypeScript, PWA, C#, .NET, Docker, Cloud, Node, GitHub, Full, Stack, Front, Back, End"
          />
          <meta key="theme-color" name="theme-color" content="#FCD34D" />

          {/* Open Graph. */}
          <meta
            key="og:description"
            property="og:description"
            content="View champion masteries and claimed hextech chests for your League of Legends summoner."
          />
          <meta
            key="og:site_name"
            property="og:site_name"
            content="Hextech Check"
          />
          <meta
            key="og:url"
            property="og:url"
            content="https://hextech-check.bhlai.com/"
          />
          <meta key="og:type" property="og:type" content="website" />
          <meta key="og:locale" property="og:locale" content="en_US" />

          {/* Twitter meta. */}
          <meta
            key="twitter:description"
            property="twitter:description"
            content="View champion masteries and claimed hextech chests for your League of Legends summoner."
          />
          <meta key="twitter:card" name="twitter:card" content="summary" />
          <meta
            key="twitter:creator"
            property="twitter:creator"
            content="@blai30"
          />

          {/* Apple meta. */}
          <meta
            key="apple-mobile-web-app-capable"
            name="apple-mobile-web-app-capable"
            content="yes"
          />
          <meta
            key="apple-mobile-web-app-status-bar-style"
            name="apple-mobile-web-app-status-bar-style"
            content="black"
          />
          <meta
            key="apple-mobile-web-app-title"
            name="apple-mobile-web-app-title"
            content="Hextech Check"
          />
          <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />

          <link rel="canonical" href="https://hextech-check.bhlai.com/" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="manifest" href="/manifest.webmanifest" />

          <link
            rel="stylesheet"
            type="text/css"
            href="https://rsms.me/inter/inter.css"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Cookie&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-gray-100 subpixel-antialiased transition-colors dark:bg-gray-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
