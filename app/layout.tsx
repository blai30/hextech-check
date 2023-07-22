import './globals.css'
import localFont from 'next/font/local'
import { Inter } from 'next/font/google'
import { Providers } from '@/app/providers'
import { Footer, Header } from '@/components/shared'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const beaufortforlol = localFont({
  src: [
    { path: '../public/fonts/BeaufortForLoL-TTF/BeaufortforLOL-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../public/fonts/BeaufortForLoL-TTF/BeaufortforLOL-BoldItalic.ttf', weight: '700', style: 'italic' },
    { path: '../public/fonts/BeaufortForLoL-TTF/BeaufortforLOL-Heavy.ttf', weight: '800', style: 'normal' },
    { path: '../public/fonts/BeaufortForLoL-TTF/BeaufortforLOL-HeavyItalic.ttf', weight: '800', style: 'italic' },
    { path: '../public/fonts/BeaufortForLoL-TTF/BeaufortforLOL-Italic.ttf', weight: '400', style: 'italic' },
    { path: '../public/fonts/BeaufortForLoL-TTF/BeaufortforLOL-Light.ttf', weight: '100', style: 'normal' },
    { path: '../public/fonts/BeaufortForLoL-TTF/BeaufortforLOL-LightItalic.ttf', weight: '100', style: 'italic' },
    { path: '../public/fonts/BeaufortForLoL-TTF/BeaufortforLOL-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../public/fonts/BeaufortForLoL-TTF/BeaufortforLOL-MediumItalic.ttf', weight: '500', style: 'italic' },
    { path: '../public/fonts/BeaufortForLoL-TTF/BeaufortforLOL-Regular.ttf', weight: '400', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-beaufortforlol',
})

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
    <html lang="en" className={[inter.variable, beaufortforlol.variable].join(' ')}>
      <body
        className={[
          // inter.className,
          'font-sans bg-gray-100 subpixel-antialiased transition-colors dark:bg-gray-950',
        ].join(' ')}
      >
        <Providers>
          <main className="flex min-h-screen flex-col gap-6 px-4 py-6 print:mx-0 print:max-w-none print:p-0">
            <Header />
            <section className="flex flex-grow flex-col items-center">
              {children}
            </section>
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  )
}
