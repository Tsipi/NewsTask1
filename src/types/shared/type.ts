import { ButtonType } from './enum'

export interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  type?: ButtonType
  text: string
  isLoading?: boolean
  width?: number
  color?: string
  icon?: React.ElementType
  disabled?: boolean
}

export interface LoadingProps {
  size?: number
  color?: string
  text?: string
}

export interface ScreenSize {
  width: number | undefined
}

export interface CustomRoute {
  name: string | undefined
  path?: string
  action?: () => void
}
