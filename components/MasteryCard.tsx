'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChampionDto, ChampionMasteryDto, Tag } from '@/models/riotapi'
import { ChestIcon, ClassIcon } from '@/components/common'
import { formatDate, formatRelativeDate } from '@/lib/formatDate'
import { Switch } from '@headlessui/react'

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
  [5]: 'text-rose-300',
  [6]: 'text-fuchsia-300',
  [7]: 'text-emerald-300',
})[masteryLevel] ?? 'text-gray-300'

export default function MasteryCard({
  champion,
  mastery,
  version,
}: {
  champion: ChampionDto
  mastery: ChampionMasteryDto
  version: string
}) {
  const [flipped, setFlipped] = useState(false)
  const iconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.id}.png`
  const imageUrl =
    champion.id === 'Fiddlesticks'
      ? 'https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/FiddleSticks_0.jpg'
      : `https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${champion.id}_0.jpg`
  const lastPlayed = new Date(mastery.lastPlayTime)

  return (
    <li
      className="relative aspect-[3/2] rounded-xl sm:aspect-[3/4]"
      style={{
        perspective: '1000px',
      }}
    >
      {/* Flip switch */}
      {/* <Switch
        className="group absolute flex h-full w-full cursor-default items-center justify-center outline-none"
        checked={flipped}
        onChange={setFlipped}
      >
        <div className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full opacity-0 transition-opacity duration-200 ease-in-out hover:opacity-100 group-focus-visible:opacity-100 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-sky-400">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-12 w-12 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </div>
      </Switch> */}

      {/* Card container */}
      {/* <div
        className="relative h-full w-full transform-gpu transition-transform duration-200 ease-in-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'unset',
        }}
      > */}
      {/* Front side */}
      <div
        className="relative flex h-full w-full flex-col justify-end overflow-hidden rounded-xl shadow-lg"
        style={{
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
        }}
      >
        <Image
          src={imageUrl}
          alt={`Champion ${champion.name} loading screen image`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
        <div
          className={[
            'absolute inset-0 -z-10 m-2 rounded-xl border',
            mastery.chestGranted
              ? 'border-yellow-400/60'
              : 'border-gray-400/40',
          ].join(' ')}
        />

        <div className="flex flex-col gap-2 px-6 py-5">
          <div className="flex gap-3">
            {champion.tags.map((tag) => (
              <button
                key={tag}
                id={`${champion.id}-tag-${tag}`}
                className={[
                  'group relative flex flex-col items-center justify-center rounded-full',
                  tagClasses[tag],
                ].join(' ')}
              >
                <div className="absolute -top-12 left-0 hidden whitespace-nowrap rounded px-4 py-2 font-body text-base font-medium text-white shadow-xl backdrop-blur-lg backdrop-brightness-50 group-hover:block group-focus:block print:hidden print:group-hover:hidden print:group-focus:hidden">
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
          <p className="text-left text-2xl font-thin text-white subpixel-antialiased 2xs:text-4xl xs:text-3xl sm:text-2xl md:text-2xl">
            {champion.name}
          </p>
          <div
            className={[
              'flex items-center justify-between gap-2',
            ].join(' ')}
          >
            <div className="flex items-center gap-1">
              <span
                id={`champion-level-${champion.id}`}
                title="Mastery level"
                className={[
                  masteryClasses(mastery.championLevel),
                  'text-lg font-normal transition w-4 text-left',
                ].join(' ')}
              >
                {mastery.championLevel}
              </span>
              <span className="text-lg font-thin text-white transition w-2.5 text-left">|</span>
              <span
                id={`champion-points-${champion.id}`}
                title="Mastery points"
                className="bg-gradient-to-b from-yellow-100 via-yellow-100 to-yellow-200 bg-clip-text text-lg text-transparent transition text-left"
              >
                {mastery.championPoints.toLocaleString()}
              </span>
            </div>
            {/* <div
              id={`champion-chest-${champion.id}`}
              title={`Chest ${mastery.chestGranted ? 'obtained' : 'available'}`}
              className={[
                mastery.chestGranted
                  ? 'text-yellow-300 dark:text-yellow-400'
                  : 'text-white dark:text-gray-400',
              ].join(' ')}
            >
              <ChestIcon className="h-6 w-6" />
            </div> */}
          </div>
        </div>
      </div>

      {/* Back side */}
      {/* <div
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
            <div className="flex flex-col gap-2 p-4">
              <div className="flex flex-row items-center justify-between gap-4">
                <Image
                  src={iconUrl}
                  alt={`Champion ${champion.name} loading screen image`}
                  width={40}
                  height={40}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    objectFit: 'cover',
                  }}
                  className="rounded-full bg-clip-padding"
                />
                <ChestIcon
                  className={[
                    'h-8 w-8',
                    mastery.chestGranted ? 'text-yellow-400' : 'text-gray-700',
                  ].join(' ')}
                />
              </div>
              <p className="bg-gradient-to-b from-gray-300 via-gray-200 to-gray-100 bg-clip-text font-display text-xl font-extrabold uppercase text-transparent">
                {champion.name}
              </p>
              <ul className="flex flex-row items-center gap-1">
                {champion.tags.map((tag) => (
                  <li
                    key={tag}
                    id={`${champion.id}-tag-${tag}`}
                    className={[
                      'flex w-1/2 flex-row items-center gap-1 rounded-full px-1.5 py-0.5',
                      tagClasses[tag],
                    ].join(' ')}
                  >
                    <ClassIcon className="h-4 w-4" tag={tag} />
                    <p className="font-body text-xs font-bold uppercase">
                      {Tag[tag]}
                    </p>
                  </li>
                ))}
              </ul>
              <p>{mastery.championLevel}</p>
              <p>{mastery.championPoints.toLocaleString()}</p>
              <p>
                {mastery.chestGranted ? 'Chest obtained' : 'Chest available'}
              </p>
              <p>{'Last played ' + formatRelativeDate(lastPlayed)}</p>
            </div>
          </div>
        </div> */}
      {/* </div> */}
    </li>
  )
}
