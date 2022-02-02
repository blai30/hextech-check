/* eslint-disable @next/next/no-img-element */
import { formatDistanceToNow, format } from 'date-fns'
import { Champion, ChampionMastery, Tag } from '@/models'
import { LoadingChampionRow } from '@/components'
import { ChestIcon, ClassIcon } from '@/components/common'

// prettier-ignore
const tagClasses = (tag: Tag) => ({
  [Tag.Fighter]: 'text-amber-800 dark:text-amber-200 bg-amber-100 dark:bg-amber-900',
  [Tag.Tank]: 'text-indigo-800 dark:text-indigo-200 bg-indigo-100 dark:bg-indigo-900',
  [Tag.Mage]: 'text-sky-800 dark:text-sky-200 bg-sky-100 dark:bg-sky-900',
  [Tag.Assassin]: 'text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-900',
  [Tag.Support]: 'text-teal-800 dark:text-teal-200 bg-teal-100 dark:bg-teal-900',
  [Tag.Marksman]: 'text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900',
})[tag] ?? 'text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900'

// prettier-ignore
const masteryClasses = (level: number) => ({
  5: 'text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-900',
  6: 'text-fuchsia-800 dark:text-fuchsia-200 bg-fuchsia-100 dark:bg-fuchsia-900',
  7: 'text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900',
})[level] ?? 'text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900'

const ChampionRow = ({
  champion,
  mastery,
  imageUrl,
  lastPlayed,
}: {
  champion: Champion | undefined
  mastery: ChampionMastery | undefined
  imageUrl: string
  lastPlayed: Date
}) => {
  if (!champion || !mastery) {
    return <LoadingChampionRow />
  }

  return (
    <div className="space-y-4 whitespace-normal px-4 py-4 2xs:px-6 md:p-0">
      <div className="grid grid-cols-6 grid-rows-3 items-center 2xs:grid-rows-2 md:grid-cols-18 md:grid-rows-1">
        <div className="col-span-full h-full items-center 2xs:col-span-4 md:col-span-5 md:inline-flex md:px-6 md:py-4">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full lg:h-12 lg:w-12">
              <div className="relative h-12 w-12 lg:h-14 lg:w-14">
                <img
                  id={`champion-image-${champion.id}`}
                  src={imageUrl}
                  alt={`Champion icon ${champion.name}`}
                  title={imageUrl}
                  className="absolute -inset-1"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <span
                id={`champion-name-${champion.id}`}
                className="text-left text-sm text-black dark:text-white lg:text-base"
              >
                {champion.name}
              </span>
              <div className="flex rounded-md md:hidden">
                <span
                  id={`m-champion-level-${champion.id}`}
                  title="Mastery level"
                  className={`${masteryClasses(
                    mastery.championLevel
                  )} inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-2.5 text-sm dark:border-gray-600`}
                >
                  {mastery.championLevel}
                </span>
                <span
                  id={`m-champion-points-${champion.id}`}
                  title="Mastery points"
                  className="inline-flex items-center rounded-r-md border border-gray-300 px-2.5 text-sm text-gray-900 dark:border-gray-600 dark:text-gray-100"
                >
                  {mastery.championPoints.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2 2xs:col-span-3 row-start-2 flex h-full translate-y-3 items-center 2xs:col-start-5 2xs:row-start-1 2xs:translate-y-0 2xs:place-self-end md:col-start-auto md:row-start-auto md:inline-flex md:place-self-auto md:px-6 md:py-4">
          <div
            id={`champion-tags-${champion.id}`}
            className="flex items-end space-x-2 print:space-x-0 2xs:-space-x-2 md:items-start"
          >
            {champion.tags.map((tag, index) => (
              <button
                key={tag}
                id={`${champion.id}-tag-${tag}`}
                className={`${tagClasses(tag)} ${`z-${
                  10 - index * 10
                }`} group relative flex flex-col items-center rounded-full p-1 ring-2 ring-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:ring-gray-800 dark:focus:ring-indigo-500`}
              >
                <div className="absolute -top-10 hidden whitespace-nowrap rounded bg-white/60 px-4 py-2 text-xs font-medium text-black shadow-xl backdrop-blur-lg group-hover:block group-focus:block dark:bg-black/60 dark:text-white dark:shadow-gray-700/30 print:hidden print:group-hover:hidden print:group-focus:hidden">
                  <div className="flex flex-col items-center space-y-1">
                    <p id={`${champion.id}-tag-${Tag[tag]}`}>{Tag[tag]}</p>
                  </div>
                </div>
                <ClassIcon className="h-6 w-6 lg:h-8 lg:w-8" tag={tag} />
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-4 hidden h-full items-end md:inline-flex md:items-center md:px-6 md:py-4">
          <div className="flex rounded-md">
            <span
              id={`champion-level-${champion.id}`}
              title="Mastery level"
              className={`${masteryClasses(
                mastery.championLevel
              )} inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-2.5 text-sm dark:border-gray-600 lg:px-3 lg:text-base`}
            >
              {mastery.championLevel}
            </span>
            <span
              id={`champion-points-${champion.id}`}
              title="Mastery points"
              className="inline-flex items-center rounded-r-md border border-gray-300 px-2.5 text-sm text-gray-900 dark:border-gray-600 dark:text-gray-100 lg:px-3 lg:text-base"
            >
              {mastery.championPoints.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="col-span-1 col-start-6 row-start-2 flex h-full translate-y-3 items-center justify-self-end 2xs:translate-y-0 2xs:items-end md:col-span-2 md:col-start-auto md:row-start-auto md:inline-flex md:items-center md:self-auto md:justify-self-auto md:px-6 md:py-4">
          <div
            id={`champion-chest-${champion.id}`}
            title={`Chest ${mastery.chestGranted ? 'obtained' : 'available'}`}
            className={`${
              mastery.chestGranted
                ? 'text-amber-500 dark:text-amber-300'
                : 'text-gray-200 dark:text-gray-700'
            }`}
          >
            <ChestIcon className="h-6 w-6 lg:h-8 lg:w-8" />
          </div>
        </div>

        <div className="col-span-full col-start-1 row-start-3 flex h-full items-end self-end 2xs:col-span-5 2xs:row-start-2 md:col-span-4 md:col-start-auto md:row-start-auto md:inline-flex md:items-center md:self-auto md:px-6 md:py-4">
          <button className="group relative flex flex-col items-start focus:outline-none">
            <span
              id={`m-champion-lastplayed-${champion.id}`}
              className="block text-left text-sm text-gray-600 underline decoration-gray-400 decoration-dotted underline-offset-2 group-focus:decoration-indigo-500 group-focus:decoration-solid group-focus:decoration-2 dark:text-gray-300 print:no-underline md:hidden"
            >
              {`Last played ${formatDistanceToNow(lastPlayed)} ago`}
            </span>
            <span
              id={`champion-lastplayed-${champion.id}`}
              className="hidden text-left text-sm text-gray-600 underline decoration-gray-400 decoration-dotted underline-offset-2 group-focus:decoration-indigo-500 group-focus:decoration-solid group-focus:decoration-2 dark:text-gray-300 print:no-underline md:block lg:text-base"
            >
              {`${formatDistanceToNow(lastPlayed)} ago`}
            </span>
            <div
              id={`champion-lastplayed-tooltip-${champion.id}`}
              className="absolute -top-16 z-10 hidden whitespace-nowrap rounded bg-white/60 px-4 py-2 text-xs font-medium text-black shadow-xl backdrop-blur-lg group-hover:block group-focus:block dark:bg-black/60 dark:text-white dark:shadow-gray-700/30 print:hidden print:group-hover:hidden print:group-focus:hidden md:-translate-x-8"
            >
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
