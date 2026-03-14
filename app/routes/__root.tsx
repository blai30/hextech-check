import {
  HeadContent,
  Outlet,
  ScrollRestoration,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { Footer, Header } from '@/components/shared'
import appCss from '@/app/globals.css?url'

const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme') || 'system';
    var isDark = theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Hextech Check' },
      {
        name: 'description',
        content: 'View champion masteries for your League of Legends account.',
      },
      { name: 'theme-color', content: '#fbbf24' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
      },
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    ],
  }),
  component: RootDocument,
})

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-gray-100 subpixel-antialiased dark:bg-gray-950">
        <main className="flex min-h-screen flex-col gap-6 px-4 py-6 print:mx-0 print:max-w-none print:p-0">
          <Header />
          <section className="flex grow flex-col items-center">
            <Outlet />
          </section>
          <Footer />
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
