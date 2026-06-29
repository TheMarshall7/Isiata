'use client'

import { Children, cloneElement, isValidElement, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type StaggerProps = {
  children: React.ReactNode
  className?: string
}

export function Stagger({ children, className }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={cn('reveal-stagger', isVisible && 'is-visible', className)}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child
        return cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, {
          style: { ...(child.props.style ?? {}), ['--i' as string]: index },
        })
      })}
    </div>
  )
}
