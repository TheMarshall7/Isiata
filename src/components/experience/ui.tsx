import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('font-spaced text-[11px] uppercase tracking-[0.32em] text-[#d8aa67]/80', className)}>
      {children}
    </p>
  )
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm tracking-[0.08em] transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8aa67]'
const variants = {
  primary: 'bg-[#ece3d7] text-[#020202] hover:bg-white hover:shadow-[0_0_32px_rgba(216,170,103,0.35)]',
  ghost: 'border border-[#d8aa67]/40 text-[#ece3d7] hover:border-[#d8aa67] hover:bg-[#d8aa67]/10',
}

export function Btn({
  variant = 'primary',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants }) {
  return <button {...props} className={cn(base, variants[variant], className)} />
}

export function BtnLink({
  variant = 'primary',
  className,
  href,
  children,
}: {
  variant?: keyof typeof variants
  className?: string
  href: string
  children: React.ReactNode
}) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  )
}

export function Panel({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('rounded-2xl border border-[#d8aa67]/20 bg-[#0A0A0A]/80 backdrop-blur-sm', className)}>
      {children}
    </div>
  )
}

/** Shown on every page while the campaign is unreleased. */
export function PreviewBadge() {
  return (
    <span className="rounded-full border border-[#D9772B]/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F0A35E]">
      Unreleased preview
    </span>
  )
}
