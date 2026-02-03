export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
  disabled?: boolean
}

export type BadgeStatus = 'live' | 'upcoming' | 'archived' | 'sold-out'

export interface BadgeProps {
  status: BadgeStatus
  className?: string
}

export interface LinkProps {
  href: string
  children: React.ReactNode
  variant?: 'default' | 'nav' | 'inline'
  className?: string
}

export interface ContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'full' | '7xl' | '4xl' | '2xl'
  bordered?: boolean
}

export interface SectionProps {
  children: React.ReactNode
  className?: string
  reveal?: boolean
}
