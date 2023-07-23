'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChampionDto, ChampionMasteryDto, Tag } from '@/models/riotapi'
import { ChestIcon, ClassIcon } from '@/components/common'
import { formatDate, formatRelativeDate } from '@/lib/formatDate'

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
  const [flipped, setFlipped] = useState(false)
  const imageUrl =
    champion.id === 'Fiddlesticks'
      ? 'https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/FiddleSticks_0.jpg'
      : `https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${champion.id}_0.jpg`
  const lastPlayed = new Date(mastery.lastPlayTime)

  return (
    <div
      className="relative aspect-[3/2] rounded-xl xs:aspect-[3/4]"
      style={{
        perspective: '1000px',
      }}
      onClick={() => setFlipped(!flipped)}
    >
      {/* Card container */}
      <div
        className="relative aspect-[3/2] h-full w-full transform-gpu transition-transform duration-200 ease-in-out xs:aspect-[3/4]"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'unset',
        }}
      >
        {/* Front side */}
        <div
          className={[
            'absolute h-full w-full overflow-hidden rounded-xl bg-transparent shadow-lg ring-4 ring-inset',
            mastery.chestGranted ? 'ring-yellow-500' : 'ring-gray-900',
          ].join(' ')}
          style={{
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
          }}
        >
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
                    <div className="absolute -bottom-12 left-0 hidden whitespace-nowrap rounded px-4 py-2 font-body text-base font-medium text-white shadow-xl backdrop-blur-lg backdrop-brightness-50 group-hover:block group-focus:block print:hidden print:group-hover:hidden print:group-focus:hidden">
                      <div className="flex flex-col items-center gap-y-1">
                        <p id={`${champion.id}-tag-${Tag[tag]}-tooltip`}>
                          {Tag[tag]}
                        </p>
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
              <p
                className={[
                  'translate-y-3.5 rounded-xl text-left font-display text-4xl font-extrabold uppercase italic tracking-wide subpixel-antialiased 2xs:text-5xl xs:text-4xl sm:text-3xl md:text-4xl',
                  mastery.chestGranted ? 'text-yellow-500' : 'text-gray-900',
                ].join(' ')}
              >
                {champion.name}
              </p>
              <div
                className={[
                  'mx-1 mb-1 flex flex-row items-center justify-between rounded-b-lg bg-gradient-to-r via-transparent to-gray-900 px-1.5 pb-2 pt-1 backdrop-blur-md backdrop-brightness-200',
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
                  className="flex items-center justify-center bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-600 bg-clip-text px-2.5 font-display text-2xl font-bold uppercase italic text-transparent transition"
                >
                  {mastery.championPoints.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Back side */}
        <div
          className={[
            'absolute h-full w-full overflow-hidden rounded-xl bg-transparent shadow-lg',
          ].join(' ')}
          style={{
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="h-full w-full bg-gray-900">
            <div className="flex flex-col p-4 gap-4">
              <p>{champion.name}</p>
              <p>{champion.tags.join(', ')}</p>
              <p>{mastery.championLevel}</p>
              <p>{mastery.championPoints.toLocaleString()}</p>
              <p>{mastery.chestGranted ? 'Chest obtained' : 'Chest available'}</p>
              <p>{'Last played ' + formatRelativeDate(lastPlayed)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
