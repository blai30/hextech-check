const LoadingSummoner = () => {
  return (
    <div className="p-6 transition-colors bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:gap-x-4">
        <div className="h-16 w-16 lg:h-20 lg:w-20 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
        <div className="w-full flex-1">
          <div className="flex flex-col sm:grid sm:grid-flow-row sm:grid-rows-2 sm:grid-cols-12 sm:gap-4 lg:gap-6 items-center space-y-4 sm:space-y-0">
            <div className="w-2/3 sm:w-auto sm:col-span-4 h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
            <div className="w-1/2 sm:w-auto sm:col-span-5 h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
            <div className="w-4/5 sm:w-auto sm:col-span-3 h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
            <div className="w-3/5 sm:w-auto sm:col-span-3 h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
            <div className="w-5/6 sm:w-auto sm:col-span-5 h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
            <div className="w-1/2 sm:w-auto sm:col-span-4 h-4 lg:h-6 rounded bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSummoner
