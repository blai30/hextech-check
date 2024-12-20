'use client'

import { useState, useRef, useCallback } from 'react'
import { MasteryCard } from '@/components'

const ITEMS_PER_PAGE = 20

export default function InfiniteMasteryList({
  masteriesData,
  championsData,
  version,
}) {
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE)
  const observerRef = useRef(null)

  const lastElementRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect()

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && visibleItems < masteriesData.length) {
          setVisibleItems((prev) => prev + ITEMS_PER_PAGE)
        }
      })

      if (node) observerRef.current.observe(node)
    },
    [visibleItems, masteriesData.length]
  )

  return (
    <ul className="grid grid-cols-1 justify-between gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {masteriesData.slice(0, visibleItems).map((mastery, index) => (
        <li
          key={mastery.championId}
          ref={index === visibleItems - 1 ? lastElementRef : null}
          className="h-full w-full"
        >
          <MasteryCard
            champion={championsData[mastery.championId]}
            mastery={mastery}
            version={version}
          />
        </li>
      ))}
    </ul>
  )
}
