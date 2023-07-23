import Image from 'next/image'
import { ChampionDto, ChampionMasteryDto, Tag } from '@/models/riotapi'
import { ChestIcon, ClassIcon } from '@/components/common'

// prettier-ignore
const tagClasses: Readonly<Record<Tag, string>> = {
  [Tag.Fighter]: 'text-amber-400 bg-gradient-to-br from-gray-900 to-amber-900',
  [Tag.Tank]: 'text-indigo-400 bg-gradient-to-br from-gray-900 to-indigo-900',
  [Tag.Mage]: 'text-sky-400 bg-gradient-to-br from-gray-900 to-sky-900',
  [Tag.Assassin]: 'text-red-400 bg-gradient-to-br from-gray-900 to-red-900',
  [Tag.Support]: 'text-teal-400 bg-gradient-to-br from-gray-900 to-teal-900',
  [Tag.Marksman]: 'text-green-400 bg-gradient-to-br from-gray-900 to-green-900',
}

// prettier-ignore
const masteryClasses = (masteryLevel: number) => ({
  [5]: 'text-red-100 from-red-900',
  [6]: 'text-fuchsia-100 from-fuchsia-900',
  [7]: 'text-green-100 from-green-900',
})[masteryLevel] ?? 'text-gray-100 from-gray-900'

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
    <div
      className={[
        'overflow-hidden rounded-xl shadow-lg ring-4 ring-inset',
        mastery.chestGranted ? 'ring-yellow-500' : 'ring-gray-900',
      ].join(' ')}
    >
      {/* <div className="relative h-80 w-56"> */}
      <div className="relative aspect-[3/4]">
        <Image
          src={imageUrl}
          alt={`Champion ${champion.name} loading screen image`}
          fill
          style={{
            objectFit: 'cover',
          }}
          className="-z-10 rounded-lg"
        />
        <div className="flex h-full w-full flex-col justify-between">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row gap-2 pl-2">
              {champion.tags.map((tag) => (
                <button
                  key={tag}
                  id={`${champion.id}-tag-${tag}`}
                  className={[
                    'group relative flex flex-col items-center justify-center rounded-b-full bg-gray-800 p-2',
                    tagClasses[tag],
                  ].join(' ')}
                >
                  <div className="absolute -bottom-12 hidden whitespace-nowrap rounded px-4 py-2 text-xs font-medium text-white shadow-xl backdrop-blur-lg backdrop-brightness-50 group-hover:block group-focus:block print:hidden print:group-hover:hidden print:group-focus:hidden">
                    <div className="flex flex-col items-center gap-y-1">
                      <p id={`${champion.id}-tag-${Tag[tag]}-tooltip`}>{Tag[tag]}</p>
                    </div>
                  </div>
                  <ClassIcon className="h-6 w-6" tag={tag} />
                </button>
              ))}
            </div>
            <div
              id={`champion-chest-${champion.id}`}
              title={`Chest ${mastery.chestGranted ? 'obtained' : 'available'}`}
              className={[
                'rounded-bl-xl p-2',
                mastery.chestGranted
                  ? 'bg-yellow-500 text-yellow-900'
                  : 'bg-gray-900 text-gray-400',
              ].join(' ')}
            >
              <ChestIcon className="h-6 w-6" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="-translate-x-1 translate-y-3.5 rounded-xl text-left font-display text-5xl font-extrabold uppercase italic tracking-wide text-gray-300/50 subpixel-antialiased mix-blend-hard-light 2xs:text-4xl xs:text-5xl sm:text-4xl md:text-5xl">
              {champion.name}
            </p>
            <div
              className={[
                'flex flex-row items-center justify-between bg-gradient-to-r via-transparent to-black px-1.5 pb-2 pt-1 rounded-b-lg mb-1 mx-1',
                masteryClasses(mastery.championLevel),
              ].join(' ')}
            >
              <span
                id={`champion-level-${champion.id}`}
                title="Mastery level"
                className={[
                  masteryClasses(mastery.championLevel),
                  'flex h-8 w-8 items-center justify-center rounded-full font-display text-2xl font-extrabold uppercase italic transition',
                ].join(' ')}
              >
                {mastery.championLevel}
              </span>
              <span
                id={`champion-points-${champion.id}`}
                title="Mastery points"
                className="flex items-center justify-center bg-gradient-to-r from-yellow-100 via-red-100 to-pink-100 bg-clip-text px-2.5 font-display text-2xl font-bold uppercase italic text-transparent transition"
              >
                {mastery.championPoints.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
