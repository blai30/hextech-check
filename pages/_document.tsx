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
      <Html className="h-full bg-gray-50">
        <Head>
          <link rel="stylesheet" type="text/css" href="https://rsms.me/inter/inter.css" />
          <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Lato" />
        </Head>
        <body className="h-full subpixel-antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
