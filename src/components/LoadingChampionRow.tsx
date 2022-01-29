const LoadingChampionRow = () => {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center gap-4">
        <div className="hidden h-12 w-12 animate-pulse rounded-full bg-gray-300 dark:bg-gray-600 md:inline-flex"></div>
        <div className="w-full flex-1">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:gap-4 md:space-y-0 lg:gap-6">
            <div className="flex flex-row items-center gap-4 md:hidden">
              <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300 dark:bg-gray-600 md:hidden"></div>
              <div className="flex-1 space-y-4">
                <div className="h-4 animate-pulse rounded bg-gray-300 dark:bg-gray-600 lg:h-6"></div>
                <div className="h-4 animate-pulse rounded bg-gray-300 dark:bg-gray-600 lg:h-6"></div>
              </div>
            </div>
            <div className="h-4 animate-pulse rounded bg-gray-300 dark:bg-gray-600 md:hidden md:w-4/12 lg:h-6"></div>
            <div className="hidden h-4 animate-pulse rounded bg-gray-300 dark:bg-gray-600 md:inline-flex md:w-4/12 lg:h-6"></div>
            <div className="hidden h-4 animate-pulse rounded bg-gray-300 dark:bg-gray-600 md:inline-flex md:w-3/12 lg:h-6"></div>
            <div className="hidden h-4 animate-pulse rounded bg-gray-300 dark:bg-gray-600 md:inline-flex md:w-5/12 lg:h-6"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingChampionRow
