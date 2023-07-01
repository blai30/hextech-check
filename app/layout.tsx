'use client'

import { Footer, Header } from '@/components/shared'
import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/app/providers'

const inter = Inter({ subsets: ['latin'] })

/* prettier-ignore */
export const metadata = {
  title: {
    template: '%s | Hextech Check',
    default: 'Hextech Check',
  },
  description: 'View champion masteries and claimed hextech chests for your League of Legends summoner.',
  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: ['League of Legends', 'Hextech Chest', 'Mastery', 'Champion', 'Summoner', 'Riot Games API', 'Open Source', 'React', 'NextJS', 'Tailwind', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'PWA', 'C#', '.NET', 'Docker', 'Cloud', 'Node', 'GitHub', 'Full', 'Stack', 'Front', 'Back', 'End'],
  authors: [{ name: 'Brian Lai', url: 'https://github.com/blai30/' }],
  colorScheme: 'dark',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={[
          inter.className,
          'bg-gray-100 subpixel-antialiased transition-colors dark:bg-gray-950',
        ].join(' ')}
      >
        <Providers>
          <main className="flex min-h-screen flex-col gap-6 px-4 py-6 print:mx-0 print:max-w-none print:p-0">
            <Header />
            <section className="flex flex-grow flex-col">{children}</section>
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  )
}
