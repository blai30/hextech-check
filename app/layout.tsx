import { Metadata, Viewport } from 'next'
import { Geist, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Providers } from '@/app/providers'
import { Footer, Header } from '@/components/shared'
import './globals.css'

/* prettier-ignore */
export const metadata: Metadata = {
  title: {
    template: '%s | Hextech Check',
    default: 'Hextech Check',
  },
  description: 'View champion masteries for your League of Legends account.',
  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: ['League of Legends', 'Hextech Chest', 'Mastery', 'Champion', 'Summoner', 'Riot Games API', 'Open Source', 'React', 'NextJS', 'Tailwind', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'PWA', 'C#', '.NET', 'Docker', 'Cloud', 'Node', 'GitHub', 'Full', 'Stack', 'Front', 'Back', 'End'],
  authors: [{ name: 'Brian Lai', url: 'https://github.com/blai30/' }],
  creator: 'blai30',
  publisher: 'blai30',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hextech-check.vercel.app/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    images: '/favicon.png',
  },
  twitter: {
    card: 'summary',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#fbbf24',
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={[
        'h-full scheme-light dark:scheme-dark',
        geist.variable,
        inter.variable,
      ].join(' ')}
    >
      <body className="bg-gray-100 subpixel-antialiased dark:bg-gray-950">
        <Providers>
          <main className="flex min-h-screen flex-col gap-6 px-4 py-6 print:mx-0 print:max-w-none print:p-0">
            <Header />
            <section className="flex grow flex-col items-center">
              {children}
            </section>
            <Footer />
          </main>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
