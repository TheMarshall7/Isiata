'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const HIDE_DELAY_MS = 1800
const HOVER_ZONE_PX = 40
const TRACK_WIDTH = 14
const MIN_THUMB = 48

/**
 * Custom gold jewel scrollbar. Native scrollbar thumbs ignore clip-path in
 * Chromium, so the pointed tips have to be drawn as a real element.
 */
export function ScrollbarVisibility() {
  const isScrollingRef = useRef(false)
  const draggingRef = useRef(false)
  const thumbRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [metrics, setMetrics] = useState({ top: 0, height: 0, needed: false })

  useEffect(() => {
    const html = document.documentElement
    html.classList.add('jewel-scrollbar')

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
      const scrollTop = window.scrollY
      const viewH = window.innerHeight
      const docH = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      )
      const needed = docH > viewH + 2
      if (!needed) {
        setMetrics({ top: 0, height: 0, needed: false })
        return
      }

      const trackH = viewH
      const ratio = viewH / docH
      const height = Math.max(MIN_THUMB, Math.round(trackH * ratio))
      const maxTop = trackH - height
      const progress = scrollTop / (docH - viewH)
      const top = Math.round(maxTop * Math.min(1, Math.max(0, progress)))
      setMetrics({ top, height, needed: true })
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

    const onMouseMove = (e: MouseEvent) => {
      if (e.clientX >= window.innerWidth - HOVER_ZONE_PX) {
        show()
        scheduleHide()
      }
    }

    const onResize = () => {
      if (!frame) frame = window.requestAnimationFrame(updateMetrics)
    }

    updateMetrics()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      html.classList.remove('jewel-scrollbar')
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (hideTimeout) clearTimeout(hideTimeout)
      if (scrollEndTimeout) clearTimeout(scrollEndTimeout)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const thumb = thumbRef.current
    if (!thumb) return

    let startY = 0
    let startScroll = 0

    const onPointerDown = (e: PointerEvent) => {
      draggingRef.current = true
      setVisible(true)
      startY = e.clientY
      startScroll = window.scrollY
      thumb.setPointerCapture(e.pointerId)
      e.preventDefault()
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return
      const viewH = window.innerHeight
      const docH = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      )
      const maxScroll = docH - viewH
      if (maxScroll <= 0) return
      const trackH = viewH
      const height = Math.max(MIN_THUMB, Math.round(trackH * (viewH / docH)))
      const maxTop = trackH - height
      const delta = e.clientY - startY
      const next = startScroll + (delta / maxTop) * maxScroll
      window.scrollTo(0, Math.min(maxScroll, Math.max(0, next)))
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

  if (!metrics.needed) return null

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none fixed inset-y-0 right-0 z-[60] transition-opacity duration-300',
        visible ? 'opacity-100' : 'opacity-0'
      )}
      style={{ width: TRACK_WIDTH }}
    >
      <div
        ref={thumbRef}
        className={cn(
          'jewel-scroll-thumb pointer-events-auto absolute left-1/2 w-[7px] -translate-x-1/2 cursor-pointer',
          'bg-[rgba(216,170,103,0.48)] transition-[background-color,box-shadow] duration-200',
          'hover:bg-[rgba(216,170,103,0.72)] hover:shadow-[0_0_12px_rgba(216,170,103,0.28)]'
        )}
        style={{ top: metrics.top, height: metrics.height }}
      />
    </div>
  )
}
