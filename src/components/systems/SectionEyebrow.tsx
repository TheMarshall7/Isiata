type SectionEyebrowProps = {
  number: string
  label: string
  accentText?: string
  className?: string
}

export function SectionEyebrow({ number, label, accentText = 'text-zinc-500', className = '' }: SectionEyebrowProps) {
  return (
    <div className={`flex items-center gap-3 mb-4 ${className}`}>
      <span className={`text-xs font-oswald font-semibold tracking-widest ${accentText}`}>{number}</span>
      <span className={`h-px w-8 bg-current opacity-30 ${accentText}`} aria-hidden />
      <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{label}</span>
    </div>
  )
}
