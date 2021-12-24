/* eslint-disable @next/next/no-img-element */
import { Tag } from '@/models'

const icons: Readonly<Record<Tag, JSX.Element>> = {
  [Tag.Fighter]: (
    <img src={`${process.env.NEXT_PUBLIC_PATH_PREFIX}img/Fighter_icon.webp`} alt="Fighter icon" className="h-8 w-8" />
  ),
  [Tag.Tank]: (
    <img src={`${process.env.NEXT_PUBLIC_PATH_PREFIX}img/Tank_icon.webp`} alt="Tank icon" className="h-8 w-8" />
  ),
  [Tag.Mage]: (
    <img src={`${process.env.NEXT_PUBLIC_PATH_PREFIX}img/Mage_icon.webp`} alt="Mage icon" className="h-8 w-8" />
  ),
  [Tag.Assassin]: (
    <img src={`${process.env.NEXT_PUBLIC_PATH_PREFIX}img/Slayer_icon.webp`} alt="Assassin icon" className="h-8 w-8" />
  ),
  [Tag.Support]: (
    <img src={`${process.env.NEXT_PUBLIC_PATH_PREFIX}img/Controller_icon.webp`} alt="Support icon" className="h-8 w-8" />
  ),
  [Tag.Marksman]: (
    <img src={`${process.env.NEXT_PUBLIC_PATH_PREFIX}img/Marksman_icon.webp`} alt="Marksman icon" className="h-8 w-8" />
  ),
}

const ClassIcon = ({ tag }: { tag: Tag }) => {
  return icons[tag]
}

export default ClassIcon
