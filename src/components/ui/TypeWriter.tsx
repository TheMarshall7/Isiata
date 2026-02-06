'use client'

import { useState, useEffect, useRef } from 'react'

interface TypeWriterProps {
  text: string
  className?: string
  speed?: number
  delay?: number
  cursor?: boolean
  onComplete?: () => void
}

export function TypeWriter({
  text,
  className = '',
  speed = 80,
  delay = 300,
  cursor = true,
  onComplete,
}: TypeWriterProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Use Intersection Observer to start typing when element is visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    // Initial delay before starting
    const startTimeout = setTimeout(() => {
      let currentIndex = 0

      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typeInterval)
          setIsComplete(true)
          onComplete?.()
        }
      }, speed)

      return () => clearInterval(typeInterval)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [hasStarted, text, speed, delay, onComplete])

  return (
    <span ref={elementRef} className={className}>
      {displayedText}
      {cursor && !isComplete && (
        <span className="inline-block w-[3px] h-[0.9em] bg-white ml-1 animate-pulse" />
      )}
      {/* Invisible text for layout stability */}
      <span className="invisible absolute">{text}</span>
    </span>
  )
}
