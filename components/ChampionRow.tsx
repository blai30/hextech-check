/* eslint-disable @next/next/no-img-element */
import { formatDistanceToNow, format } from 'date-fns'
import { Champion, ChampionMastery, Tag } from '@/models'
import { LoadingChampionRow } from '@/components'
import { ChestIcon, ClassIcon } from '@/components/common'

const tagClasses = (tag: Tag) => ({
  [Tag.Fighter]: 'text-amber-800 dark:text-amber-200 bg-amber-100 dark:bg-amber-900',
  [Tag.Tank]: 'text-indigo-800 dark:text-indigo-200 bg-indigo-100 dark:bg-indigo-900',
  [Tag.Mage]: 'text-sky-800 dark:text-sky-200 bg-sky-100 dark:bg-sky-900',
  [Tag.Assassin]: 'text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-900',
  [Tag.Support]: 'text-teal-800 dark:text-teal-200 bg-teal-100 dark:bg-teal-900',
  [Tag.Marksman]: 'text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900',
})[tag] ?? 'text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900'

const masteryClasses = (level: number) => ({
  5: 'text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-900',
  6: 'text-fuchsia-800 dark:text-fuchsia-200 bg-fuchsia-100 dark:bg-fuchsia-900',
  7: 'text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900',
})[level] ?? 'text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900'

const ChampionRow = ({
  champion,
  championMastery,
  imageUrl,
  lastPlayed
}: {
  champion: Champion | undefined,
  championMastery: ChampionMastery | undefined,
  imageUrl: string,
  lastPlayed: Date
}) => {
  if (!champion || !championMastery) {
    return <LoadingChampionRow />
  }

  return (
    <div className="px-6 py-4 md:p-0 whitespace-normal space-y-4">
      <div className="grid grid-rows-2 md:grid-rows-1 grid-cols-6 md:grid-cols-18 items-center">

        <div className="md:px-6 md:py-4 col-span-4 md:col-span-5 md:inline-flex h-full items-center">
          <div className="flex gap-4 items-center">
            <div className="overflow-hidden flex-shrink-0 h-12 w-12 rounded-full">
              <div className="relative h-14 w-14">
                <img
                  id={`champion-image-${champion.id}`}
                  className="absolute -inset-1"
                  src={imageUrl}
                  alt={`Champion icon ${champion.name}`}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <span id={`champion-name-${champion.id}`} className="text-left text-black dark:text-white">
                {champion.name}
              </span>
              <div className="flex md:hidden rounded-md">
                <span id={`m-champion-level-${champion.id}`} className={`${masteryClasses(championMastery.championLevel)} inline-flex items-center px-3 rounded-l-md text-sm border border-r-0 border-gray-300 dark:border-gray-600`}>
                  {championMastery.championLevel}
                </span>
                <span id={`m-champion-points-${champion.id}`} className="inline-flex items-center px-3 rounded-r-md text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
                  {championMastery.championPoints.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:px-6 md:py-4 col-span-3 col-start-5 md:row-start-auto md:col-start-auto flex md:inline-flex h-full items-center place-self-end md:place-self-auto">
          <div id={`champion-tags-${champion.id}`} className="flex items-end md:items-start -space-x-2">
            {champion.tags.map((tag, index) => (
              <button key={tag} id={`${champion.id}-tag-${tag}`} className={`${tagClasses(tag)} ${`z-${10 - index * 10}`} relative group flex flex-col items-center p-1 transition-colors rounded-full ring-2 ring-white dark:ring-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500`}>
                <div className="absolute hidden group-hover:block group-focus:block whitespace-nowrap -top-10 px-4 py-2 font-medium text-xs text-black dark:text-white bg-white/60 dark:bg-black/60 backdrop-blur-lg rounded dark:shadow-gray-700/30 shadow-xl">
                  <div className="flex flex-col items-center space-y-1">
                    <p id={`${champion.id}-tag-${Tag[tag]}`}>{Tag[tag]}</p>
                  </div>
                </div>
                {ClassIcon[tag]}
              </button>
            ))}
          </div>
        </div>

        <div className="md:px-6 md:py-4 col-span-4 hidden md:inline-flex h-full items-end md:items-center">
          <div className="flex rounded-md">
            <span id={`champion-level-${champion.id}`} className={`${masteryClasses(championMastery.championLevel)} inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600`}>
              {championMastery.championLevel}
            </span>
            <span id={`champion-points-${champion.id}`} className="inline-flex items-center px-3 rounded-r-md text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
              {championMastery.championPoints.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="md:px-6 md:py-4 col-span-1 md:col-span-2 row-start-2 col-start-6 md:row-start-auto md:col-start-auto flex md:inline-flex h-full items-end md:items-center md:self-auto justify-self-end md:justify-self-auto">
          <div id={`champion-chest-${champion.id}`} className={`${championMastery.chestGranted ? 'text-amber-400 dark:text-amber-300' : 'text-gray-200 dark:text-gray-700'}`}>
            <ChestIcon /> 
          </div>
        </div>

        <div className="md:px-6 md:py-4 col-span-5 md:col-span-4 row-start-2 col-start-1 md:row-start-auto md:col-start-auto flex md:inline-flex h-full items-end md:items-center self-end md:self-auto">
          <button className="relative group flex flex-col items-start focus:outline-none">
            <span id={`m-champion-lastplayed-${champion.id}`} className="block md:hidden text-left text-gray-600 dark:text-gray-300 underline underline-offset-2 decoration-gray-400 decoration-dotted group-focus:decoration-2 group-focus:decoration-solid group-focus:decoration-indigo-500">
              {`Last played ${formatDistanceToNow(lastPlayed)} ago`}
            </span>
            <span id={`champion-lastplayed-${champion.id}`} className="hidden md:block text-left text-gray-600 dark:text-gray-300 underline underline-offset-2 decoration-gray-400 decoration-dotted group-focus:decoration-2 group-focus:decoration-solid group-focus:decoration-indigo-500">
              {`${formatDistanceToNow(lastPlayed)} ago`}
            </span>
            <div id={`champion-lastplayed-tooltip-${champion.id}`} className="absolute hidden group-hover:block group-focus:block whitespace-nowrap z-10 -top-16 md:-translate-x-8 px-4 py-2 font-medium text-xs text-black dark:text-white bg-white/60 dark:bg-black/60 backdrop-blur-lg rounded dark:shadow-gray-700/30 shadow-xl">
              <div className="flex flex-col items-center space-y-1">
                <p>{format(lastPlayed, 'PPPP')}</p>
                <p>{format(lastPlayed, 'pppp')}</p>
              </div>
            </div>
          </button>
        </div>

      </div>
    </div>
  )
}

export default ChampionRow
