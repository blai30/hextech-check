import { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import { Listbox, Transition } from '@headlessui/react';

const regions = [
  { value: 'NA', label: 'North America' },
  { value: 'EUW', label: 'Europe West' },
  { value: 'EUNE', label: 'Europe Nordic & East' },
  { value: 'KR', label: 'Korea' },
  { value: 'BR', label: 'Brazil' },
  { value: 'JP', label: 'Japan' },
  { value: 'RU', label: 'Russia' },
  { value: 'OCE', label: 'Oceania' },
  { value: 'TR', label: 'Turkey' },
  { value: 'LAN', label: 'Latin America North' },
  { value: 'LAS', label: 'Latin America South' }
]

const SearchForm = () => {
  const [summoner, setName] = useState('')
  const [region, setRegion] = useState(regions[0])
  const router = useRouter()

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push({
      query: {
        summoner,
        region: region.value
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row items-center">

        <Listbox value={region} onChange={setRegion}>
          {({ open }) => (
            <>
              <Listbox.Label className="sr-only">
                Select region
              </Listbox.Label>
              <div className="relative">
                <Listbox.Button className="inline-flex items-center w-24 rounded-l-md transition-colors text-black dark:text-white bg-gray-50 dark:bg-gray-800 border border-r-0 border-gray-300 dark:border-gray-600 pl-3 pr-10 py-2 cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                  <span className="flex items-center">
                    <span className="block">{region.value}</span>
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 w-72 left-0 bg-white dark:bg-gray-700 shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {regions.map((region) => (
                      <Listbox.Option
                        key={region.value}
                        className={({ active }) =>
                          `${active ? 'text-white dark:text-black bg-indigo-600 dark:bg-indigo-400' : 'text-gray-900 dark:text-gray-100'}
                          cursor-default select-none relative py-2 pl-3 pr-9`}
                        value={region}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <span className="w-12 text-right font-bold">
                                {region.value}
                              </span>
                              <span
                                className={`${selected ? 'font-semibold' : 'font-normal'} ml-4 block`}
                              >
                                {region.label}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={`${active ? 'text-white' : 'text-indigo-600 dark:text-indigo-300'} absolute inset-y-0 right-0 flex items-center pr-4`}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>

        <input
          id="summoner"
          name="summoner"
          type="search"
          placeholder="Summoner name"
          value={summoner}
          onChange={handleChangeName}
          className="inline-flex w-full items-center px-3 py-2 transition-colors text-black dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
        />

        <button className="inline-flex items-center px-3 py-2 rounded-r-md transition-colors border border-l-0 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </button>

      </div>
    </form>
  )
}

export default SearchForm
