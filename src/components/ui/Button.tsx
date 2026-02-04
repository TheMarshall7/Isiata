import Link from 'next/link'
import { ButtonProps } from '@/types'
import { cn } from '@/lib/utils'

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  onClick,
  href,
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-full active:scale-[0.98]'

  const variants = {
    primary: 'bg-white text-black hover:bg-zinc-200 hover:shadow-lg hover:shadow-white/5',
    secondary: 'bg-zinc-900 border border-white/10 text-white hover:bg-zinc-800',
    ghost: 'text-white hover:text-zinc-300',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
