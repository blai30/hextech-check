'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DarkToggle } from '@/components/shared'
import { ChestIcon } from '@/components/common'

const Header = () => {
  const [copied, setCopied] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [copied])

  const copyToClipboard = (e: React.MouseEvent) => {
    e.preventDefault()
    setCopied(true)
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <nav className="container mx-auto w-full">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex items-center justify-start gap-4">
          <Link
            href="/"
            id="home-link"
            title="Homepage"
            className="rounded-full text-gray-500 transition-colors hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <span className="sr-only">Home</span>
            <ChestIcon className="h-8 w-8" />
          </Link>
          <Link
            href="https://github.com/blai30/hextech-check"
            id="github-link"
            title="GitHub repository"
            className="rounded-full text-gray-500 transition-colors hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <span className="sr-only">GitHub</span>
            <svg fill="currentColor" className="h-8 w-8" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </Link>
        </div>
        <button
          title="Copy URL to clipboard"
          type="button"
          onClick={copyToClipboard}
          className={[
            'group order-last items-center justify-center rounded-lg px-2 py-1 outline-2 outline-offset-8 outline-gray-200 transition-all duration-75 ease-in-out hover:outline hover:outline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:outline-gray-700 2xs:order-none lg:py-0',
            pathname === '/' ? 'hidden' : 'flex',
          ].join(' ')}
        >
          <h3 className="select-none truncate text-base text-gray-800 opacity-80 transition group-hover:opacity-100 dark:text-gray-100 lg:text-xl">
            {`~${pathname}`}
          </h3>
          <div className="flex items-center justify-end pl-8">
            <span
              className={`${
                copied ? 'opacity-100' : 'opacity-40'
              } absolute h-6 w-6 transition group-hover:opacity-100`}
            >
              <svg
                className={`${
                  copied ? 'scale-0' : 'scale-100'
                } absolute h-6 w-6 text-gray-700 transition duration-300 ease-in-out dark:text-gray-200`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <svg
                className={`${
                  copied ? 'scale-100' : 'scale-0'
                } absolute h-6 w-6 text-green-700 transition duration-300 ease-in-out dark:text-green-200`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </button>
        <div className="flex items-center justify-end">
          <DarkToggle />
        </div>
      </div>
    </nav>
  )
}

export default Header
