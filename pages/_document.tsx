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
      <Html lang="en" className="h-full">
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
          <meta key="theme-color" name="theme-color" content="#002137" />

          {/* Open Graph. */}
          <meta
            key="og:description"
            property="og:description"
            content="View champion masteries and claimed hextech chests for your League of Legends summoner."
          />
          <meta key="og:url" property="og:url" content="https://www.bhlai.com/hextech-check" />
          <meta key="og:type" property="og:type" content="website" />

          {/* Twitter meta. */}
          <meta
            key="twitter:description"
            property="twitter:description"
            content="View champion masteries and claimed hextech chests for your League of Legends summoner."
          />
          <meta key="twitter:url" property="twitter:url" content="https://www.bhlai.com/hextech-check" />
          <meta key="twitter:creator" property="twitter:creator" content="@blai30" />

          {/* Apple meta. */}
          <meta key="apple-mobile-web-app-capable" name="apple-mobile-web-app-capable" content="yes" />
          <meta key="apple-mobile-web-app-status-bar-style" name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta key="apple-mobile-web-app-title" name="apple-mobile-web-app-title" content="Hextech Check" />
          <link
            rel="apple-touch-icon"
            href={`${process.env.NEXT_PUBLIC_PATH_PREFIX}icons/icon-128x128.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href={`${process.env.NEXT_PUBLIC_PATH_PREFIX}icons/icon-152x152.png`}
          />

          <link
            rel="canonical"
            href="https://www.bhlai.com/hextech-check"
          />
          <link
            rel="icon"
            href={`${process.env.NEXT_PUBLIC_PATH_PREFIX}favicon.svg`}
            type="image/svg+xml"
          />
          <link
            rel="icon"
            href={`${process.env.NEXT_PUBLIC_PATH_PREFIX}favicon.png`}
            type="image/x-icon"
          />
          <link
            rel="shortcut icon"
            href={`${process.env.NEXT_PUBLIC_PATH_PREFIX}favicon.ico`}
            type="image/x-icon"
          />
          <link
            rel="shortcut icon"
            href={`${process.env.NEXT_PUBLIC_PATH_PREFIX}favicon.png`}
            type="image/x-icon"
          />
          <link
            rel="mask-icon"
            href={`${process.env.NEXT_PUBLIC_PATH_PREFIX}favicon.svg`}
            type="image/svg+xml"
            color="#002137"
          />
          <link
            rel="apple-touch-icon"
            href={`${process.env.NEXT_PUBLIC_PATH_PREFIX}favicon.png`}
            type="image/x-icon"
          />
          <link rel="manifest" href={`${process.env.NEXT_PUBLIC_PATH_PREFIX}manifest.json`} />

          <link rel="stylesheet" type="text/css" href="https://rsms.me/inter/inter.css" />
          <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" />
        </Head>
        <body className="subpixel-antialiased h-full transition-colors bg-gray-50 dark:bg-gray-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
