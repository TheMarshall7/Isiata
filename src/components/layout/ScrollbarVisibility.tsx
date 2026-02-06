'use client'

import { useEffect } from 'react'

const HIDE_DELAY_MS = 1200
const HOVER_ZONE_PX = 28

export function ScrollbarVisibility() {
  useEffect(() => {
    const html = document.documentElement
    let hideTimeout: ReturnType<typeof setTimeout> | null = null

    const show = () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout)
        hideTimeout = null
      }
      html.classList.add('scrollbar-visible')
    }

    const scheduleHide = () => {
      if (hideTimeout) clearTimeout(hideTimeout)
      hideTimeout = setTimeout(() => {
        html.classList.remove('scrollbar-visible')
        hideTimeout = null
      }, HIDE_DELAY_MS)
    }

    const onScroll = () => {
      show()
      scheduleHide()
    }

    const onMouseMove = (e: MouseEvent) => {
      const nearRight = e.clientX >= window.innerWidth - HOVER_ZONE_PX
      if (nearRight) {
        show()
        scheduleHide()
      } else {
        scheduleHide()
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
      if (hideTimeout) clearTimeout(hideTimeout)
    }
  }, [])

  return null
}
