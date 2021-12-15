import Link from 'next/link'
import DarkToggle from './DarkToggle'

const Header = () => {
  return (
    <nav className="w-full">
      <div className="flex flex-row items-center justify-between">
        <Link href="/">
          <a className="tracking-wide font-bold text-lg text-gray-600 dark:text-gray-300">
            Masteries
          </a>
        </Link>
        <DarkToggle />
      </div>
    </nav>
  )
}

export default Header
