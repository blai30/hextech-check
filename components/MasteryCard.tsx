import Image from 'next/image'
import { ChampionDto, ChampionMasteryDto, Tag } from '@/models/riotapi'
import { ChestIcon, ClassIcon } from '@/components/common'

// prettier-ignore
const tagClasses: Readonly<Record<Tag, string>> = {
  [Tag.Fighter]: 'text-amber-400',
  [Tag.Tank]: 'text-indigo-400',
  [Tag.Mage]: 'text-sky-400',
  [Tag.Assassin]: 'text-red-400',
  [Tag.Support]: 'text-teal-400',
  [Tag.Marksman]: 'text-green-400',
}

// prettier-ignore
const masteryClasses = (masteryLevel: number) => ({
  [5]: 'text-red-100 bg-red-900',
  [6]: 'text-fuchsia-100 bg-fuchsia-900',
  [7]: 'text-green-100 bg-green-900',
})[masteryLevel] ?? 'text-gray-100 bg-yellow-900'

export default function MasteryCard({
  champion,
  mastery,
}: {
  champion: ChampionDto
  mastery: ChampionMasteryDto
}) {
  const imageUrl =
    champion.id === 'Fiddlesticks'
      ? 'https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/FiddleSticks_0.jpg'
      : `https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${champion.id}_0.jpg`

  return (
    <div className="overflow-hidden rounded-xl shadow-lg">
      <div className="relative h-72 w-48">
        <Image
          src={imageUrl}
          alt={`Champion ${champion.name} loading screen image`}
          fill
          objectFit="cover"
          className="-z-10"
        />
        <div className="flex h-full w-full flex-col justify-between">
          <div className="flex flex-col p-2">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-2">
                {champion.tags.map((tag) => (
                  <button
                    key={tag}
                    id={`${champion.id}-tag-${tag}`}
                    className={`${tagClasses[tag]} group relative flex flex-col rounded-full bg-gray-900 p-2`}
                  >
                    <div className="absolute -bottom-12 hidden whitespace-nowrap rounded bg-black/80 px-4 py-2 text-xs font-medium text-white shadow-xl group-hover:block group-focus:block print:hidden print:group-hover:hidden print:group-focus:hidden">
                      <div className="flex flex-col items-center gap-y-1">
                        <p id={`${champion.id}-tag-${Tag[tag]}`}>{Tag[tag]}</p>
                      </div>
                    </div>
                    <ClassIcon className="h-6 w-6" tag={tag} />
                  </button>
                ))}
              </div>
              <div
                id={`champion-chest-${champion.id}`}
                title={`Chest ${
                  mastery.chestGranted ? 'obtained' : 'available'
                }`}
                className={`${
                  mastery.chestGranted
                    ? 'bg-amber-600 text-amber-100'
                    : 'bg-gray-900 text-gray-100'
                } rounded-full p-2`}
              >
                <ChestIcon className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-2">
            <div className="flex flex-row items-center rounded-md">
              <span
                id={`champion-level-${champion.id}`}
                title="Mastery level"
                className={[
                  masteryClasses(mastery.championLevel),
                  'items-center rounded-l-md px-2.5 text-sm transition lg:px-3 lg:text-base',
                ].join(' ')}
              >
                {mastery.championLevel}
              </span>
              <span
                id={`champion-points-${champion.id}`}
                title="Mastery points"
                className="items-center rounded-r-md px-2.5 text-sm transition bg-gray-900 text-gray-100 lg:px-3 lg:text-base"
              >
                {mastery.championPoints.toLocaleString()}
              </span>
            </div>
            <p className="rounded-xl p-2 text-xl font-medium tracking-wide text-white subpixel-antialiased backdrop-blur-md backdrop-brightness-50">
              {champion.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
