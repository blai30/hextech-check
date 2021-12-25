import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { useTheme } from 'next-themes'

const DarkToggle = () => {
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  const [mounted, setMounted] = useState(false)

  // Delay display until mounted to client, this will ensure initial state.
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  return (
    <div className="inline-flex items-center space-x-2">
      <Switch
        id="dark-toggle"
        checked={currentTheme === 'light'}
        onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="relative group inline-flex flex-shrink-0 px-1 border-2 border-transparent bg-gray-500 dark:bg-gray-400 hover:bg-black dark:hover:bg-white transition rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-50 focus:dark:ring-offset-gray-900"
      >
        <span className="sr-only">Toggle dark mode</span>
        <span
          aria-hidden="true"
          className="absolute -translate-x-1 dark:translate-x-9 bg-gray-50 dark:bg-gray-900 pointer-events-none inline-block w-8 h-8 rounded-full transition ease-in-out duration-200"
        />
        {/* Sun icon. */}
        <svg xmlns="http://www.w3.org/2000/svg" className="z-10 h-6 w-6 m-1 -translate-x-1 text-gray-500 dark:text-gray-800 group-hover:text-black dark:group-hover:text-black transition" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
        {/* Moon icon. */}
        <svg xmlns="http://www.w3.org/2000/svg" className="z-10 h-6 w-6 m-1 translate-x-1 text-gray-50 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white transition" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </Switch>
    </div>
  )
}

export default DarkToggle
