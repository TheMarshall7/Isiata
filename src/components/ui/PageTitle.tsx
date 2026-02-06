'use client'

import { TypeWriter } from './TypeWriter'

interface PageTitleProps {
  text: string
  className?: string
  speed?: number
}

export function PageTitle({ text, className = '', speed = 100 }: PageTitleProps) {
  return (
    <h1 className={className}>
      <TypeWriter text={text} speed={speed} />
    </h1>
  )
}
