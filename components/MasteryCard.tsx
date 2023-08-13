'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChampionDto, ChampionMasteryDto, Tag } from '@/models/riotapi'
import { ChestIcon, ClassIcon } from '@/components/common'
import { formatDate, formatRelativeDate } from '@/lib/formatDate'
import { Switch } from '@headlessui/react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from 'framer-motion'

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

  const cardRef = useRef<HTMLDivElement>(null)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [mousePX, setMousePX] = useState(0)
  const [mousePY, setMousePY] = useState(0)
  // const mouseX = useMotionValue(window ? window.innerWidth / 2 : 0)
  // const mouseY = useMotionValue(window ? window.innerHeight / 2 : 0)
  // const mousePX = useTransform(mouseX, (newMouseX) => {
  //   if (!cardRef.current) return 0
  //   const rect = cardRef.current.getBoundingClientRect()
  //   return newMouseX / rect.height
  // })
  // const mousePY = useTransform(mouseX, (newMouseX) => {
  //   if (!cardRef.current) return 0
  //   const rect = cardRef.current.getBoundingClientRect()
  //   return newMouseX / rect.height
  // })

  // const dampen = 10
  // const rotateX = useTransform<number, number>(mouseY, (newMouseY) => {
  //   if (!cardRef.current) return 0
  //   const rect = cardRef.current.getBoundingClientRect()
  //   const newRotateX = newMouseY - rect.top - rect.height / 2
  //   return -newRotateX / dampen
  // })
  // const rotateY = useTransform<number, number>(mouseX, (newMouseX) => {
  //   if (!cardRef.current) return 0
  //   const rect = cardRef.current.getBoundingClientRect()
  //   const newRotateY = newMouseX - rect.left - rect.width / 2
  //   return newRotateY / dampen
  // })

  // rotateX.set(0)
  // rotateY.set(0)

  // sheen
  // const diagonalMovement = useTransform<number, number>(
  //   [rotateX, rotateY],
  //   ([newRotateX, newRotateY]) => {
  //     const position: number = newRotateX + newRotateY
  //     return position
  //   }
  // )
  // const sheenPosition = useTransform(diagonalMovement, [-5, 5], [-100, 200])
  // const sheenOpacity = useTransform(
  //   sheenPosition,
  //   [-250, 50, 250],
  //   [0, 0.05, 0]
  // )
  // const sheenGradient = useMotionTemplate`linear-gradient(
  //   55deg,
  //   transparent,
  //   rgba(255 255 255 / ${sheenOpacity}) ${sheenPosition}%,
  //   transparent)`

  let mouseLeaveDelay: NodeJS.Timeout
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMouseX(event.clientX - rect.left - rect.width / 2)
    setMouseY(event.clientY - rect.top - rect.height / 2)
    setMousePX(mouseX / rect.width)
    setMousePY(mouseY / rect.height)
    // mouseX.set(event.pageX - cardRef.current.offsetLeft / 2)
    // mouseY.set(event.pageY - cardRef.current.offsetTop / 2)
  }
  const handleMouseEnter = () => {
    clearTimeout(mouseLeaveDelay)
  }
  const handleMouseLeave = () => {
    mouseLeaveDelay = setTimeout(() => {
      setMouseX(0)
      setMouseY(0)
      setMousePX(0)
      setMousePY(0)
      // rotateX.set(0)
      // rotateY.set(0)
    }, 1000)
  }

  const CardBackground = (
    <>
      <div
        className="pointer-events-none absolute h-full w-full overflow-hidden rounded-xl shadow-lg"
        style={{
          transform: `translateZ(-20px)`,
        }}
      >
        <Image
          src={imageUrl}
          alt={`Champion ${champion.name} loading screen image`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="group-hover/card:duration-50 absolute inset-0 -z-10 transform-gpu object-cover transition-transform duration-1000 ease-[cubic-bezier(0.445,0.05,0.55,0.95)] group-hover/card:ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{
            transform: `translateX(${mousePX * -20}px) translateY(${
              mousePY * -20
            }px)`,
            scale: 1.1,
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      </div>
      <div
        className={[
          'pointer-events-none absolute inset-0 -z-10 m-4 rounded-xl border',
          mastery.chestGranted ? 'border-yellow-400/60' : 'border-gray-400/40',
        ].join(' ')}
        style={{
          transform: `translateZ(40px)`,
        }}
      />
    </>
  )

  return (
    <div
      id={`card-container-${champion.id}`}
      className="group/card relative"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        style={{
          transform: `rotateX(${mousePY * -30}deg) rotateY(${mousePX * 30}deg)`,
          transformStyle: 'preserve-3d',
        }}
        className="group-hover/card:duration-50 relative aspect-[3/2] transform-gpu rounded-xl transition-transform duration-1000 ease-[cubic-bezier(0.445,0.05,0.55,0.95)] group-hover/card:ease-[cubic-bezier(0.23,1,0.32,1)] sm:aspect-[3/4]"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Front side */}
        {CardBackground}
        <motion.div
          ref={cardRef}
          className="flex h-full w-full flex-col justify-end"
        >
          <div className="flex flex-col gap-2 px-6 py-5">
            <div className="flex gap-3">
              {champion.tags.map((tag) => (
                <button
                  key={tag}
                  id={`${champion.id}-tag-${tag}`}
                  className={[
                    'group/tag relative flex flex-col items-center justify-center rounded-full',
                    tagClasses[tag],
                  ].join(' ')}
                >
                  <div className="absolute -top-12 left-0 hidden whitespace-nowrap rounded bg-gray-900 px-4 py-2 font-body text-base font-medium text-white shadow-xl group-hover/tag:block group-focus/tag:block print:hidden print:group-hover/tag:hidden print:group-focus/tag:hidden">
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
                  className="bg-gradient-to-b from-yellow-100 via-yellow-100 to-yellow-200 bg-clip-text text-left text-lg text-transparent transition"
                >
                  {mastery.championPoints.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
