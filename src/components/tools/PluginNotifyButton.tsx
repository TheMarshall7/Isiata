'use client'

import { useState } from 'react'
import { ReleaseNotifyModal } from '@/components/forms/ReleaseNotifyModal'

export function PluginNotifyButton({
  productName,
  source,
  label = 'Notify me on release',
}: {
  productName: string
  source: string
  label?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group cta-sheen inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-orange-100"
      >
        {label}
        <iconify-icon icon="solar:bell-linear" width="18" height="18" />
      </button>
      <ReleaseNotifyModal
        isOpen={open}
        onClose={() => setOpen(false)}
        source={source}
        description={`Leave your email and we will let you know the moment ${productName} ships.`}
      />
    </>
  )
}
