'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'

const regions: Readonly<Record<string, string>> = {
  na: 'North America',
  euw: 'Europe West',
  eune: 'Europe Nordic & East',
  kr: 'Korea',
  br: 'Brazil',
  jp: 'Japan',
  ru: 'Russia',
  oce: 'Oceania',
  tr: 'Turkey',
  lan: 'Latin America North',
  las: 'Latin America South',
}

const SearchForm = () => {
  const router = useRouter()
  const params = useParams() as Record<string, string>
  const [player, setPlayer] = useState<string>('')
  const [region, setRegion] = useState<string>(params['region'] ?? 'na')

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const route = `/${region}/${player.replace('#', '-')}`.toLowerCase()
    router.push(route)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex w-full flex-col items-center gap-2 md:flex-row">
        <Listbox name="region" value={region} onChange={setRegion}>
          <Label className="sr-only">Select region</Label>
          <div className="relative w-full md:w-36">
            <ListboxButton
              id="region-select"
              title="Select region"
              className="w-full cursor-default items-center rounded-md bg-gray-200 py-2 pl-3 pr-8 text-black transition-colors hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yellow-500 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              <span className="flex items-center">
                <span className="hidden uppercase md:block">{region}</span>
                <span className="block md:hidden">{regions[region]}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </span>
            </ListboxButton>

            <ListboxOptions
              transition
              className="absolute left-0 z-20 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white/50 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-lg focus:outline-none dark:bg-gray-700/50 sm:text-sm md:w-72"
            >
              {Object.keys(regions).map((region, index) => (
                <ListboxOption
                  key={index}
                  id={`region-${index}`}
                  className="group relative cursor-default select-none py-2 pl-2 pr-8 text-gray-900 data-[active]:bg-yellow-600 data-[active]:text-white dark:text-gray-100 data-[active]:dark:bg-yellow-400 data-[active]:dark:text-black"
                  value={region}
                >
                  <div className="flex items-center">
                    <span className="w-12 text-right font-bold uppercase">
                      {region}
                    </span>
                    <span className="ml-4 block font-normal group-data-[selected]:font-semibold">
                      {regions[region]}
                    </span>
                  </div>

                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-yellow-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-black dark:text-yellow-300">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>

        <input
          id="player-input"
          name="player"
          title="Player name"
          type="search"
          placeholder="Player name"
          value={player}
          onChange={handleChangeName}
          className="w-full items-center rounded-md bg-gray-200 px-3 py-2 text-black transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
        />

        <button
          id="search-button"
          title="Search"
          disabled={!region || !player}
          className="flex w-full flex-row items-center justify-center rounded-md bg-yellow-200 px-4 py-2 text-black transition-colors hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yellow-500 disabled:cursor-not-allowed disabled:text-gray-400 disabled:opacity-60 disabled:hover:bg-yellow-200 dark:bg-yellow-800 dark:text-white dark:hover:bg-yellow-700 disabled:dark:text-gray-500 disabled:dark:hover:bg-yellow-800 md:w-fit"
        >
          {false ? (
            <svg
              className="h-6 w-6 animate-spin transition-colors"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
    </form>
  )
}

export default SearchForm
