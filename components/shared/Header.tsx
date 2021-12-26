import Link from 'next/link'
import { DarkToggle } from '@/components/shared'
import { ChestIcon } from '@/components/common'

const Header = () => {
  return (
    <nav className="w-full">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <a id="home-link" className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-50 transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
              <span className="sr-only">Home</span>
              <ChestIcon />
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg> */}
            </a>
          </Link>
          <Link href="https://github.com/blai30/hextech-check">
            <a id="github-link" className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-50 transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
              <span className="sr-only">GitHub</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-8 w-8" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </a>
          </Link>
        </div>
        <div className="flex items-center">
          <DarkToggle />
        </div>
      </div>
    </nav>
  )
}

export default Header
