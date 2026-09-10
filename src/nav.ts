import { LuImages, LuInfo, LuMapPin, LuNavigation } from 'react-icons/lu'
import type { IconType } from 'react-icons'

export interface NavItem {
  label: string
  href: string
  icon: IconType
}

export const navItems: NavItem[] = [
  { label: 'Places', href: '/places', icon: LuNavigation },
  { label: 'Gallery', href: '/gallery', icon: LuImages },
  { label: 'Maps', href: '/maps', icon: LuMapPin },
  { label: 'About', href: '/about', icon: LuInfo },
]
