import { ActiveScreen } from '@/components/MainMenu'

export interface P3RMenuItemConfig {
  id: ActiveScreen
  name: string
  rotation: number
  zIndex: number
  offsetX: number
  offsetY: number
  fontSize: string
  bannerScaleX: number
  bannerScaleY: number
  bannerOffsetX: number
  bannerOffsetY: number
  bannerRotation: number
  colorClass: string
}

export const DEFAULT_P3R_MENU_CONFIG: P3RMenuItemConfig[] = [
  {
    id: 'missions',
    name: 'MISSIONS',
    rotation: -20,
    zIndex: 1,
    offsetX: -40,
    offsetY: 25,
    fontSize: '5.15rem',
    bannerScaleX: 1,
    bannerScaleY: 2.65,
    bannerOffsetX: -42,
    bannerOffsetY: -136,
    bannerRotation: 3,
    colorClass: 'fill-button-1',
  },
  {
    id: 'hideout',
    name: 'HIDEOUT',
    rotation: -12,
    zIndex: 2,
    offsetX: -65,
    offsetY: 30,
    fontSize: '4.85rem',
    bannerScaleX: 1.02,
    bannerScaleY: 2.8,
    bannerOffsetX: -17,
    bannerOffsetY: -186,
    bannerRotation: 8,
    colorClass: 'fill-button-2',
  },
  {
    id: 'about',
    name: 'ABOUT',
    rotation: -4,
    zIndex: 3,
    offsetX: -80,
    offsetY: 35,
    fontSize: '4.85rem',
    bannerScaleX: 1.26,
    bannerScaleY: 2.6,
    bannerOffsetX: -71,
    bannerOffsetY: -144,
    bannerRotation: 5,
    colorClass: 'fill-button-3',
  },
  {
    id: 'callingCard',
    name: 'COMMS',
    rotation: 5,
    zIndex: 4,
    offsetX: -85,
    offsetY: 40,
    fontSize: '4.75rem',
    bannerScaleX: 1.24,
    bannerScaleY: 2.55,
    bannerOffsetX: -60,
    bannerOffsetY: -167,
    bannerRotation: 8,
    colorClass: 'fill-button-1',
  },
]

export const P3R_SELECTOR_PATH = 'M 24.853754, 93.31573 135.14625, 49.684266 114.14751, 97.331142 Z'
export const P3R_SELECTOR_BG_PATH = 'M 12.7428765,95.50088 144.25712,47.499123 116.75625,95.465764 Z'
