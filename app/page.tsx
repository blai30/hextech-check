import { SearchForm } from '@/components'

export default function Home() {
  return (
    <div className="flex max-w-xl flex-1 flex-col items-center justify-center gap-10 md:px-8">
      <p className="whitespace-normal px-8 text-center text-2xl font-light text-gray-700 dark:text-gray-200">
        Enter Riot ID and region.
      </p>
      <SearchForm />
    </div>
  )
}
