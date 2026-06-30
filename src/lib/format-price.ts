export type ParsedPrice = {
  prefix: string
  whole: string
  cents: string | null
  suffix: string
}

/**
 * Parse a price string like "$49.97", "$2,500", or "$497/month".
 * Cents are returned only when non-zero (e.g. 97 from .97).
 */
export function parsePriceString(value: string): ParsedPrice {
  const trimmed = value.trim()
  const suffixMatch = trimmed.match(/(\/.*)$/)
  const suffix = suffixMatch?.[1] ?? ''
  const core = suffix ? trimmed.slice(0, -suffix.length) : trimmed

  const prefixMatch = core.match(/^([^\d]*)/)
  const prefix = prefixMatch?.[1] ?? '$'

  const numericPart = core.slice(prefix.length).replace(/,/g, '')
  const [wholePart, fracPart] = numericPart.split('.')

  const whole = wholePart || '0'
  const cents =
    fracPart != null && fracPart.length > 0 && parseInt(fracPart, 10) !== 0
      ? fracPart.padEnd(2, '0').slice(0, 2)
      : null

  return { prefix, whole, cents, suffix }
}

/** Format amount like "49.97" into parts for superscript display. */
export function parsePriceAmount(amount: string): ParsedPrice {
  const num = parseFloat(amount)
  if (Number.isNaN(num)) {
    return parsePriceString(amount)
  }
  const [whole, frac = ''] = amount.split('.')
  const cents =
    frac && parseInt(frac, 10) !== 0 ? frac.padEnd(2, '0').slice(0, 2) : null
  return { prefix: '$', whole, cents, suffix: '' }
}

export function formatWholeWithCommas(whole: string): string {
  const digits = whole.replace(/\D/g, '')
  if (!digits) return whole
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
