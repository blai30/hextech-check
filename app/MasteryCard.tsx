import Image from 'next/image'
import { ChampionDto, ChampionMasteryDto } from '@/models/riotapi'

export default function MasteryCard({
  champion,
  mastery,
}: {
  champion: ChampionDto
  mastery: ChampionMasteryDto
}) {
  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`

  return (
    <div className="h-80 w-56 rounded-xl border border-green-400">
      <div className="flex h-full items-center">
        <Image
          src={'https://i.imgur.com/QDx3laE.png'}
          alt={`Champion ${champion.name} loading screen image`}
          width={300}
          height={512}
          className=""
        />
      </div>
    </div>
  )
}
