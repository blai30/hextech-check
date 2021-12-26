const LoadingChampionRow = () => {
  return (
    <div className="px-6 py-4">
      <div className="flex gap-4 items-center">
        <div className="hidden md:inline-flex h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
        <div className="w-full flex-1">
          <div className="flex flex-col md:flex-row md:gap-4 lg:gap-6 md:items-center space-y-4 md:space-y-0">
            <div className="md:hidden flex flex-row items-center gap-4">
              <div className="md:hidden h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
              <div className="flex-1 space-y-4">
                <div className="h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                <div className="h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
              </div>
            </div>
            <div className="md:hidden md:w-4/12 h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
            <div className="hidden md:inline-flex md:w-4/12 h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
            <div className="hidden md:inline-flex md:w-3/12 h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
            <div className="hidden md:inline-flex md:w-5/12 h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingChampionRow
