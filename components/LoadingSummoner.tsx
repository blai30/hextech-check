export default function LoadingSummoner() {
  return (
    <div className="rounded-lg bg-white p-6 shadow transition-colors dark:bg-gray-800">
      <div className="flex flex-col items-center space-y-4 sm:flex-row sm:gap-x-4 sm:space-y-0">
        <div className="h-16 w-16 animate-pulse rounded-full bg-gray-300 transition-colors dark:bg-gray-600 lg:h-20 lg:w-20"></div>
        <div className="w-full flex-1">
          <div className="flex flex-col items-center space-y-4 sm:grid sm:grid-flow-row sm:grid-cols-12 sm:grid-rows-2 sm:gap-4 sm:space-y-0 lg:gap-6">
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-300 transition-colors dark:bg-gray-600 sm:col-span-4 sm:w-auto lg:h-6"></div>
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-300 transition-colors dark:bg-gray-600 sm:col-span-5 sm:w-auto lg:h-6"></div>
            <div className="h-4 w-4/5 animate-pulse rounded bg-gray-300 transition-colors dark:bg-gray-600 sm:col-span-3 sm:w-auto lg:h-6"></div>
            <div className="h-4 w-3/5 animate-pulse rounded bg-gray-300 transition-colors dark:bg-gray-600 sm:col-span-3 sm:w-auto lg:h-6"></div>
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-300 transition-colors dark:bg-gray-600 sm:col-span-5 sm:w-auto lg:h-6"></div>
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-300 transition-colors dark:bg-gray-600 sm:col-span-4 sm:w-auto lg:h-6"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
