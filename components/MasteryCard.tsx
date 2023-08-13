'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChampionDto, ChampionMasteryDto, Tag } from '@/models/riotapi'
import { ChestIcon, ClassIcon } from '@/components/common'
import { formatDate, formatRelativeDate } from '@/lib/formatDate'
import { Switch } from '@headlessui/react'
import {
  motion,
  useAnimate,
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
  const [scope, animate] = useAnimate()
  const [flipped, setFlipped] = useState(false)
  const iconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.id}.png`
  const imageUrl =
    champion.id === 'Fiddlesticks'
      ? 'https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/FiddleSticks_0.jpg'
      : `https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${champion.id}_0.jpg`
  const lastPlayed = new Date(mastery.lastPlayTime)

  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 0
  )
  const mouseY = useMotionValue(
    typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  )

  const dampen = 40
  const rotateX = useTransform<number, number>(mouseY, (newMouseY) => {
    if (!cardRef.current) return 0
    const rect = cardRef.current.getBoundingClientRect()
    const newRotateX = newMouseY - rect.top - rect.height / 2
    return -newRotateX / dampen
  })
  const rotateY = useTransform(mouseX, (newMouseX) => {
    if (!cardRef.current) return 0
    const rect = cardRef.current.getBoundingClientRect()
    const newRotateY = newMouseX - rect.left - rect.width / 2
    return newRotateY / dampen
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // animate mouse x and y
      animate(mouseX, e.clientX);
      animate(mouseY, e.clientY);
    };
    if (typeof window === 'undefined') return;
    // recalculate grid on resize
    window.addEventListener('mousemove', handleMouseMove);
    // cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [animate, mouseX, mouseY]);

  const CardBackground = (
    <>
      <div
        className="absolute h-full w-full overflow-hidden rounded-xl shadow-lg"
        style={{ transform: 'translateZ(-20px)' }}
      >
        <Image
          src={imageUrl}
          alt={`Champion ${champion.name} loading screen image`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      </div>
      <div
        className={[
          'absolute inset-0 -z-10 m-2 rounded-xl border',
          mastery.chestGranted ? 'border-yellow-400/60' : 'border-gray-400/40',
        ].join(' ')}
        style={{ transform: 'translateZ(0px)' }}
      />
    </>
  )

  return (
    <div
      id={`card-container-${champion.id}`}
      className="relative"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative aspect-[3/2] rounded-xl sm:aspect-[3/4]"
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
