/* eslint-disable @next/next/no-html-link-for-pages */
import DarkToggle from './DarkToggle'

const Header = () => {
  return (
    <nav className="w-full">
      <div className="flex flex-row items-center justify-between">
        <a href="/" className="tracking-wide font-bold text-lg text-gray-600 dark:text-gray-300">Masteries</a>
        <DarkToggle />
      </div>
    </nav>
  )
}

export default Header
