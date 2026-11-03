/**
 * Server-only puzzle answers. Imported by API routes only. Never import from a
 * client component, or the answers ship to the browser.
 */

export type Answer = string | number[] | string[]

const ANSWERS: Record<number, (a: unknown) => boolean> = {
  1: (a) => sameSet(a, [2, 9, 14]),
  2: (a) => norm(a) === 'B',
  3: (a) => sameSeq(a, [2, 0, 3, 1, 2]),
  4: (a) => norm(a) === 'OPEN',
  5: (a) => norm(a) === 'CIRCLE',
  6: (a) => norm(a) === 'SEE',
  7: (a) => sameSeq(a, ['WHAT', 'YOU', 'REFUSE', 'TO', 'FEEL', 'STILL']),
  8: (a) => norm(a) === 'YOU',
}

const DEEPER: Record<number, string[]> = {
  1: ['13', 'THIRTEEN'],
  2: ['MIRROR', 'AMIRROR'],
  3: ['DIAMOND'],
  4: ['SEEK'],
  5: ['CROSS'],
  6: ['STAND'],
  7: ['24', 'TWENTYFOUR'],
  8: ['NOEVIL', 'EVILNO'],
}

function normAlnum(a: unknown): string {
  return typeof a === 'string' ? a.trim().toUpperCase().replace(/[^A-Z0-9]/g, '') : ''
}

export function checkDeeper(chapter: number, answer: unknown): boolean {
  return (DEEPER[chapter] ?? []).includes(normAlnum(answer))
}

function norm(a: unknown): string {
  return typeof a === 'string' ? a.trim().toUpperCase().replace(/[^A-Z]/g, '') : ''
}

function sameSet(a: unknown, expect: number[]): boolean {
  if (!Array.isArray(a) || a.length !== expect.length) return false
  const got = [...a].map(Number).sort((x, y) => x - y)
  return got.every((v, i) => v === expect[i])
}

function sameSeq(a: unknown, expect: (number | string)[]): boolean {
  if (!Array.isArray(a) || a.length !== expect.length) return false
  return a.every((v, i) =>
    typeof expect[i] === 'number' ? Number(v) === expect[i] : String(v).toUpperCase() === expect[i]
  )
}

export function checkAnswer(chapter: number, answer: unknown): boolean {
  const check = ANSWERS[chapter]
  return check ? check(answer) : false
}
