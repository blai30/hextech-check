const getPageNumbers = (current: number, total: number) => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  if (current <= 3) {
    return [1, 2, 3, 4, '...', total]
  }
  if (current >= total - 2) {
    return [1, '...', total - 3, total - 2, total - 1, total]
  }
  return [1, '...', current - 1, current, current + 1, '...', total]
}

export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {`Showing ${startIndex + 1} to ${endIndex} of ${totalItems} results`}
      </p>
      <nav className="flex flex-row gap-1" aria-label="Pagination">
        <button
          id="previous-page-button"
          name="Previous page button"
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-800 focus-visible:dark:ring-offset-gray-900"
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        {getPageNumbers(currentPage, totalPages).map((pageNumber, idx) => (
          <button
            key={idx}
            id={`page-${pageNumber}-button`}
            name={`Page ${pageNumber} button`}
            type="button"
            onClick={() =>
              typeof pageNumber === 'number' && onPageChange(pageNumber)
            }
            disabled={pageNumber === '...'}
            className={[
              'flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 focus-visible:dark:ring-offset-gray-900',
              pageNumber === currentPage
                ? 'bg-yellow-500 text-white dark:bg-yellow-700'
                : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800',
            ].join(' ')}
          >
            {pageNumber}
          </button>
        ))}
        <button
          id="next-page-button"
          name="Next page button"
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-800 focus-visible:dark:ring-offset-gray-900"
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </nav>
    </div>
  )
}
