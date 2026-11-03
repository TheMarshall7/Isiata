/** Unlisted base path. Change here and rename src/app/fne-preview to move it. */
export const EXPERIENCE_BASE = '/fne-preview'

export const EXPERIENCE_API = '/api/fne'

export const exp = (path = '') => `${EXPERIENCE_BASE}${path}`
