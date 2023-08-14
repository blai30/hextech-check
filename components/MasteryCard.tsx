'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChampionDto, ChampionMasteryDto, Tag } from '@/models/riotapi'
import { ChestIcon, ClassIcon } from '@/components/common'
import { formatDate, formatRelativeDate } from '@/lib/formatDate'
import { Switch } from '@headlessui/react'

// prettier-ignore
const tagClasses: Readonly<Record<Tag, string>> = {
  [Tag.Fighter]: 'text-amber-300',
  [Tag.Tank]: 'text-indigo-300',
  [Tag.Mage]: 'text-sky-300',
  [Tag.Assassin]: 'text-red-300',
  [Tag.Support]: 'text-teal-300',
  [Tag.Marksman]: 'text-green-300',
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
  const cardRef = useRef<HTMLDivElement>(null)
  const [flipped, setFlipped] = useState(false)
  const [rotateX, setRotateX] = useState(30 * -0.20)
  const [rotateY, setRotateY] = useState(30 * -0.34)

  // Rotate card based on mouse position.
  const handlePointerMove = (event: React.PointerEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = 30 * ((event.clientY - rect.top - rect.height / 2) / rect.height)
    const y = 30 * ((event.clientX - rect.left - rect.width / 2) / rect.width)
    // Clamp rotation to prevent cards from flipping/spinning.
    setRotateX(Math.max(-15, Math.min(x, 15)))
    setRotateY(Math.max(-15, Math.min(y, 15)))
  }

  let mouseLeaveDelay: NodeJS.Timeout
  // Cancel resetting card rotation on mouse enter.
  const handlePointerEnter = () => {
    clearTimeout(mouseLeaveDelay)
  }

  // Reset card rotation after 1 second of mouse inactivity.
  const handlePointerLeave = () => {
    mouseLeaveDelay = setTimeout(() => {
      setRotateX(30 * -0.20)
      setRotateY(30 * -0.34)
    }, 1000)
  }

  const iconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.id}.png`
  const imageUrl =
    champion.id === 'Fiddlesticks'
      ? 'https://ddragon.leagueoflegends.com/cdn/img/champion/centered/FiddleSticks_0.jpg'
      : `https://ddragon.leagueoflegends.com/cdn/img/champion/centered/${champion.id}_0.jpg`
  const lastPlayed = new Date(mastery.lastPlayTime)

  return (
    <li
      id={`card-container-${champion.id}`}
      className="group/card relative"
      style={{ perspective: '1000px' }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {/* Flip switch */}
      <Switch
        className="group/flip absolute flex h-full w-full cursor-default items-end justify-end outline-none"
        checked={flipped}
        onChange={setFlipped}
      >
        <div
          className="relative z-10 flex h-24 w-24 items-center justify-center gap-2 rounded-full opacity-0 transition-opacity duration-200 ease-in-out hover:opacity-100 group-focus-visible/flip:opacity-100 group-focus-visible/flip:outline group-focus-visible/flip:outline-2 group-focus-visible/flip:outline-offset-2 group-focus-visible/flip:outline-sky-400"
          style={{
            transform: `translateZ(20px)`,
          }}
        >
          <span className="text-lg font-light text-white">Flip</span>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </div>
      </Switch>

      {/* Card */}
      <div
        ref={cardRef}
        className="relative aspect-[3/2] transform-gpu rounded-xl transition-transform duration-1000 ease-in-out group-hover/card:duration-300 group-hover/card:ease-out sm:aspect-[3/4]"
        style={{
          transform: `rotateX(${rotateX * -1}deg) rotateY(${
            flipped ? 180 + rotateY : rotateY
          }deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front side background */}
        <div
          className="pointer-events-none absolute top-0 h-full w-full overflow-hidden rounded-xl shadow-xl"
          style={
            {
              // backfaceVisibility: 'hidden',
              // WebkitBackfaceVisibility: 'hidden',
            }
          }
        >
          <Image
            src={imageUrl}
            alt={`Champion ${champion.name} loading screen image`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="absolute inset-0 -z-10 transform-gpu object-cover transition-transform duration-1000 ease-in-out group-hover/card:duration-300 group-hover/card:ease-out"
            style={{
              transform: `translateX(${
                rotateY * 0.8 * (flipped ? 1 : -1)
              }px) translateY(${rotateX * 0.8 * -1}px)
              translateZ(${flipped ? 10 : -10}px)`,
              scale: 1.2,
            }}
          />
          <div className="absolute inset-0 -z-10 scale-110 bg-gradient-to-t from-gray-900 via-gray-900/40" />
        </div>
        <div
          className={[
            'pointer-events-none absolute inset-0 -z-10 m-4 rounded-xl border md:m-3',
            mastery.chestGranted
              ? 'border-yellow-300/80'
              : 'border-gray-300/40',
          ].join(' ')}
          style={{
            transform: `translateZ(10px)`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        />

        {/* Front side content */}
        <div
          className={[
            'pointer-events-auto absolute flex h-full w-full flex-col justify-end',
            flipped ? 'z-10' : 'z-0',
          ].join(' ')}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div className="flex flex-col gap-2 px-8 py-7 md:p-6">
            <div className="flex gap-2">
              {champion.tags.map((tag) => (
                <button
                  key={tag}
                  id={`${champion.id}-tag-${tag}`}
                  className={[
                    'group/tag relative flex h-8 w-8 cursor-default flex-col items-center justify-center rounded-full focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400',
                    tagClasses[tag],
                  ].join(' ')}
                >
                  <div className="absolute -top-14 left-0 hidden whitespace-nowrap rounded bg-gray-900 px-4 py-2 font-body text-base font-medium text-white shadow-xl group-hover/tag:block group-focus/tag:block print:hidden print:group-hover/tag:hidden print:group-focus/tag:hidden">
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
            <p className="text-left text-2xl font-extralight text-white subpixel-antialiased 2xs:text-3xl xs:text-3xl sm:text-2xl md:text-2xl">
              {champion.name}
            </p>
            <div
              className={['flex items-center justify-between gap-2'].join(' ')}
            >
              <div className="flex items-center gap-1">
                <span
                  id={`champion-level-${champion.id}`}
                  title="Mastery level"
                  className={[
                    masteryClasses(mastery.championLevel),
                    'w-4 text-left text-lg font-normal transition',
                  ].join(' ')}
                >
                  {mastery.championLevel}
                </span>
                <span className="w-2.5 text-left text-lg font-thin text-white transition">
                  |
                </span>
                <span
                  id={`champion-points-${champion.id}`}
                  title="Mastery points"
                  className="bg-gradient-to-b from-yellow-100 via-yellow-100 to-yellow-200 bg-clip-text text-left text-lg font-medium text-transparent transition"
                >
                  {mastery.championPoints.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Back side background */}
        <div
          className="pointer-events-none absolute h-full w-full overflow-hidden rounded-xl shadow-xl backdrop-blur-md backdrop-brightness-75"
          style={{
            transform: `rotateY(180deg)`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        />

        {/* Back side content */}
        <div
          className={[
            'pointer-events-auto flex flex-col justify-start gap-4 rounded-xl p-4',
            flipped ? 'z-0' : 'z-10',
          ].join(' ')}
          style={{
            transform: `translateZ(${flipped ? -10 : 10}px) rotateY(180deg)`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div className="flex items-start gap-6">
            <div className="h-12 w-12 overflow-hidden rounded-full">
              <Image
                src={iconUrl}
                alt={`Champion ${champion.name} icon`}
                width={64}
                height={64}
                className="scale-125"
              />
            </div>
            <div className="flex flex-col items-start justify-between">
              {champion.tags.map((tag) => (
                <div
                  key={tag}
                  id={`${champion.id}-tag-${tag}`}
                  className={[
                    'flex h-6 items-center gap-2 rounded-full',
                    tagClasses[tag],
                  ].join(' ')}
                >
                  <ClassIcon className="h-5 w-5" tag={tag} />
                  <p className="text-sm font-medium uppercase">{Tag[tag]}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-left text-2xl font-extralight text-white subpixel-antialiased 2xs:text-3xl xs:text-3xl sm:text-2xl md:text-2xl">
              {champion.name}
            </span>
            <span
              id={`champion-level-${champion.id}`}
              title="Mastery level"
              className={[
                masteryClasses(mastery.championLevel),
                'text-left text-lg transition',
              ].join(' ')}
            >
              <span className="font-bold">Level: </span>
              <span className="font-medium">{mastery.championLevel}</span>
            </span>
            <span
              id={`champion-points-${champion.id}`}
              title="Mastery points"
              className="bg-gradient-to-b from-yellow-100 via-yellow-100 to-yellow-200 bg-clip-text text-left text-lg text-transparent transition"
            >
              <span className="font-bold">Points: </span>
              <span className="font-medium">
                {mastery.championPoints.toLocaleString()}
              </span>
            </span>
            <span className="text-left text-lg font-light text-gray-300">
              Played {formatRelativeDate(lastPlayed)}
            </span>
            <div
              className={[
                'flex items-center gap-2 text-left text-lg font-light',
                mastery.chestGranted ? 'text-yellow-500' : 'text-amber-100',
              ].join(' ')}
            >
              <ChestIcon className="h-6 w-6" />
              <span className="text-left text-lg font-light">
                {mastery.chestGranted ? 'Claimed' : 'Available'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
