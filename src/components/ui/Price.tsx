import { formatWholeWithCommas, parsePriceAmount, parsePriceString } from '@/lib/format-price'

type PriceProps = {
  /** Raw display string e.g. "$49.97" or "$2,500" */
  value?: string
  /** Decimal amount for integrations e.g. "49.97" */
  amount?: string
  className?: string
  superscriptClassName?: string
  strikethrough?: boolean
}

export function Price({
  value,
  amount,
  className = '',
  superscriptClassName = 'text-[0.58em] font-semibold align-super -top-[0.35em] relative tabular-nums',
  strikethrough = false,
}: PriceProps) {
  const parsed = amount != null ? parsePriceAmount(amount) : parsePriceString(value ?? '')
  const wholeDisplay = formatWholeWithCommas(parsed.whole)

  return (
    <span className={`tabular-nums ${strikethrough ? 'line-through' : ''} ${className}`.trim()}>
      {parsed.prefix}
      {wholeDisplay}
      {parsed.cents != null ? (
        <sup className={superscriptClassName}>{parsed.cents}</sup>
      ) : null}
      {parsed.suffix}
    </span>
  )
}
