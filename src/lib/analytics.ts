declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}

// Analytics event helpers
export const analytics = {
  viewItem: (itemId: string, itemName: string, category: string, status: string) => {
    trackEvent('view_item', {
      item_id: itemId,
      item_name: itemName,
      category,
      status,
    })
  },

  playTrack: (trackId: string, releaseId: string, releaseName: string) => {
    trackEvent('play_track', {
      track_id: trackId,
      release_id: releaseId,
      release_name: releaseName,
    })
  },

  watchVideo: (videoId: string, itemId: string, itemName: string) => {
    trackEvent('watch_video', {
      video_id: videoId,
      item_id: itemId,
      item_name: itemName,
    })
  },

  joinList: (source: string, preferences?: Record<string, boolean>) => {
    trackEvent('join_list', {
      source,
      preferences,
    })
  },

  requestAccess: (accessType: string) => {
    trackEvent('request_access', {
      access_type: accessType,
    })
  },

  purchaseClick: (itemId: string, itemName: string, price: string, category: string) => {
    trackEvent('purchase_click', {
      item_id: itemId,
      item_name: itemName,
      price,
      category,
    })
  },

  categoryFilter: (category: string, filterType: string, filterValue: string) => {
    trackEvent('category_filter', {
      category,
      filter_type: filterType,
      filter_value: filterValue,
    })
  },

  contactSubmit: (subject?: string) => {
    trackEvent('contact_submit', {
      subject,
    })
  },
}
