'use client'

import { useEffect, useRef } from 'react'

const HIDE_DELAY_MS = 1800
const HOVER_ZONE_PX = 32

export function ScrollbarVisibility() {
  const isScrollingRef = useRef(false)

  useEffect(() => {
    const html = document.documentElement
    let hideTimeout: ReturnType<typeof setTimeout> | null = null
    let scrollEndTimeout: ReturnType<typeof setTimeout> | null = null

    const show = () => {
      html.classList.add('scrollbar-visible')
    }

    const scheduleHide = () => {
      if (hideTimeout) clearTimeout(hideTimeout)
      hideTimeout = setTimeout(() => {
        if (!isScrollingRef.current) {
          html.classList.remove('scrollbar-visible')
        }
        hideTimeout = null
      }, HIDE_DELAY_MS)
    }

    const onScroll = () => {
      isScrollingRef.current = true
      show()

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

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
      if (hideTimeout) clearTimeout(hideTimeout)
      if (scrollEndTimeout) clearTimeout(scrollEndTimeout)
    }
  }, [])

  return null
}
