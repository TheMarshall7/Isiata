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
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-full font-medium uppercase tracking-[0.24em] transition-all duration-300 active:scale-[0.98]'

  const variants = {
    primary:
      'min-h-12 border border-[#d8aa67]/75 bg-black/20 px-7 text-[11px] text-[#f0dfc8] backdrop-blur-sm hover:border-[#f0c681] hover:bg-[#b7792a]/10 hover:shadow-[0_0_28px_rgba(211,157,83,0.18)]',
    secondary:
      'min-h-12 border border-[#d8aa67]/40 bg-transparent px-7 text-[11px] text-[#d5c8b8] hover:border-[#d8aa67]/75 hover:bg-[#b7792a]/10 hover:text-[#ece3d7]',
    ghost: 'text-[#d5c8b8] hover:text-[#ece3d7]',
  }

  const sizes = {
    sm: 'min-h-10 px-5 text-[10px]',
    md: '',
    lg: 'min-h-14 px-8 text-xs',
  }

  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    disabled && 'cursor-not-allowed opacity-50',
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
