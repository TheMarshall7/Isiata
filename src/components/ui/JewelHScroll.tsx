'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const HIDE_DELAY_MS = 1800
const TRACK_HEIGHT = 14
const MIN_THUMB = 84

type JewelHScrollProps = {
  children: ReactNode
  className?: string
}

/**
 * Horizontal overflow with a gold jewel thumb (pointed left/right tips).
 * Native scrollbar thumbs ignore clip-path, so this draws a real element.
 */
export function JewelHScroll({ children, className }: JewelHScrollProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)
  const draggingRef = useRef(false)
  const [visible, setVisible] = useState(false)
  const [metrics, setMetrics] = useState({ left: 0, width: 0, needed: false })

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    let hideTimeout: ReturnType<typeof setTimeout> | null = null
    let scrollEndTimeout: ReturnType<typeof setTimeout> | null = null
    let frame = 0

    const show = () => setVisible(true)

    const scheduleHide = () => {
      if (hideTimeout) clearTimeout(hideTimeout)
      hideTimeout = setTimeout(() => {
        if (!isScrollingRef.current && !draggingRef.current) {
          setVisible(false)
        }
        hideTimeout = null
      }, HIDE_DELAY_MS)
    }

    const updateMetrics = () => {
      frame = 0
      const viewW = scroller.clientWidth
      const scrollW = scroller.scrollWidth
      const maxScroll = scrollW - viewW
      const needed = maxScroll > 2
      if (!needed) {
        setMetrics({ left: 0, width: 0, needed: false })
        return
      }

      const ratio = viewW / scrollW
      const width = Math.max(MIN_THUMB, Math.round(viewW * ratio))
      const maxLeft = viewW - width
      const progress = scroller.scrollLeft / maxScroll
      const left = Math.round(maxLeft * Math.min(1, Math.max(0, progress)))
      setMetrics({ left, width, needed: true })
    }

    const onScroll = () => {
      isScrollingRef.current = true
      show()
      if (!frame) frame = window.requestAnimationFrame(updateMetrics)

      if (scrollEndTimeout) clearTimeout(scrollEndTimeout)
      scrollEndTimeout = setTimeout(() => {
        isScrollingRef.current = false
        scheduleHide()
        scrollEndTimeout = null
      }, 150)
    }

    const onResize = () => {
      if (!frame) frame = window.requestAnimationFrame(updateMetrics)
    }

    updateMetrics()
    scroller.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null
    observer?.observe(scroller)

    return () => {
      scroller.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      observer?.disconnect()
      if (hideTimeout) clearTimeout(hideTimeout)
      if (scrollEndTimeout) clearTimeout(scrollEndTimeout)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const thumb = thumbRef.current
    const scroller = scrollerRef.current
    if (!thumb || !scroller || !metrics.needed) return

    let startX = 0
    let startScroll = 0

    const onPointerDown = (e: PointerEvent) => {
      draggingRef.current = true
      setVisible(true)
      startX = e.clientX
      startScroll = scroller.scrollLeft
      thumb.setPointerCapture(e.pointerId)
      e.preventDefault()
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return
      const viewW = scroller.clientWidth
      const scrollW = scroller.scrollWidth
      const maxScroll = scrollW - viewW
      if (maxScroll <= 0) return
      const width = Math.max(MIN_THUMB, Math.round(viewW * (viewW / scrollW)))
      const maxLeft = viewW - width
      if (maxLeft <= 0) return
      const delta = e.clientX - startX
      const next = startScroll + (delta / maxLeft) * maxScroll
      scroller.scrollLeft = Math.min(maxScroll, Math.max(0, next))
    }

    const onPointerUp = () => {
      draggingRef.current = false
      setTimeout(() => setVisible(false), HIDE_DELAY_MS)
    }

    thumb.addEventListener('pointerdown', onPointerDown)
    thumb.addEventListener('pointermove', onPointerMove)
    thumb.addEventListener('pointerup', onPointerUp)
    thumb.addEventListener('pointercancel', onPointerUp)

    return () => {
      thumb.removeEventListener('pointerdown', onPointerDown)
      thumb.removeEventListener('pointermove', onPointerMove)
      thumb.removeEventListener('pointerup', onPointerUp)
      thumb.removeEventListener('pointercancel', onPointerUp)
    }
  }, [metrics.needed])

  return (
    <div className="relative">
      <div ref={scrollerRef} className={cn('jewel-h-scroll', className)}>
        {children}
      </div>
      {metrics.needed ? (
        <div
          aria-hidden
          className={cn(
            'pointer-events-none relative z-[1] mt-2 transition-opacity duration-300',
            visible ? 'opacity-100' : 'opacity-40'
          )}
          style={{ height: TRACK_HEIGHT }}
        >
          <div
            ref={thumbRef}
            className={cn(
              'jewel-scroll-thumb-x pointer-events-auto absolute top-1/2 h-[7px] -translate-y-1/2 cursor-pointer',
              'bg-[rgba(216,170,103,0.48)] transition-[background-color,box-shadow] duration-200',
              'hover:bg-[rgba(216,170,103,0.72)] hover:shadow-[0_0_12px_rgba(216,170,103,0.28)]'
            )}
            style={{ left: metrics.left, width: metrics.width }}
          />
        </div>
      ) : null}
    </div>
  )
}
