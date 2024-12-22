'use client'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="mx-auto mt-8 flex max-w-7xl flex-col items-center gap-8 border-t border-gray-200 px-4 py-12 transition-colors dark:border-gray-800 sm:px-6 md:flex-row md:justify-between md:gap-0 lg:px-8">
        {/* <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-8 w-8" aria-hidden="true" />
            </a>
          ))}
        </div> */}
        {/* <div className="md:order-1"> */}
        <div>
          <p className="text-center text-base text-gray-400">
            &copy; {year}{' '}
            <a
              href="https://github.com/blai30"
              className="text-rose-700 transition-colors hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:text-rose-200 dark:hover:text-rose-300"
            >
              blai30
            </a>{' '}
            - Hextech Check
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
