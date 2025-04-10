import { ReactElement } from 'react'

export type NavType = {
  variant?: 'default' | 'primary' | 'secondary'
}

export type LinkType = {
  href: string
  children: ReactElement
  className?: string
  variant?: 'default' | 'primary' | 'secondary' | 'transparent'
}

export type ButtonType = {
  type: 'button' | 'submit'
  children: ReactElement
  onClick?: () => void
  className?: string
  variant?: 'default' | 'primary' | 'secondary'
}

export type IconButtonType = {
  type: 'button' | 'submit'
  children: ReactElement
  label: string
  onClick?: () => void
  className?: string
  variant?: 'default' | 'primary' | 'secondary' | 'transparent'
}
