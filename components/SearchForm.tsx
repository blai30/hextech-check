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
                <Listbox.Button className="inline-flex items-center w-24 rounded-l-md text-black dark:text-white bg-gray-50 dark:bg-gray-800 border border-r-0 border-gray-300 dark:border-gray-600 pl-3 pr-10 py-2 cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
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
                  <Listbox.Options className="absolute z-10 mt-1 w-72 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {regions.map((region) => (
                      <Listbox.Option
                        key={region.value}
                        className={({ active }) =>
                          `${active ? 'text-white bg-indigo-600' : 'text-gray-900'}
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
                                className={`${active ? 'text-white' : 'text-indigo-600'} absolute inset-y-0 right-0 flex items-center pr-4`}
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
        {/* <label htmlFor="region" className="sr-only">
          Region
        </label>
        <select
          id="region"
          name="region"
          value={region}
          onChange={handleChangeRegion}
          className="inline-flex items-center px-3 rounded-l-md text-black dark:text-white bg-gray-50 dark:bg-gray-800 border border-r-0 border-gray-300 dark:border-gray-600"
        >
          {regions.map(({ value, label }) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select> */}

        <input
          id="summoner"
          name="summoner"
          type="text"
          placeholder="Summoner name"
          value={summoner}
          onChange={handleChangeName}
          className="inline-flex w-full items-center px-3 text-black dark:text-white bg-white dark:bg-gray-900 border border-r-0 border-gray-300 dark:border-gray-600"
        />

        <button
          id="submit"
          type="submit"
          className="inline-flex items-center px-3 py-2 rounded-r-md text-white border border-gray-300 dark:border-gray-600 bg-blue-500 hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchForm
