import { Dispatch, SetStateAction } from 'react'

export type LandingProp = {
  setIsDark: Dispatch<SetStateAction<boolean>>
  isDark: boolean
}
