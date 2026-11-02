/** Cloudflare Worker that issues signed Tsukuyomi licences. Set TSUKUYOMI_LICENSE_API_BASE to override. */
export const TSUKUYOMI_LICENSE_API_BASE =
  process.env.TSUKUYOMI_LICENSE_API_BASE?.trim() || 'https://isiata-license.brianmarshallca.workers.dev'

export const TSUKUYOMI_SERIAL_PATTERN = /^TSU-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/

/** Matches the installation ID the plugin shows in the Activate panel. */
export const TSUKUYOMI_INSTALLATION_ID_PATTERN = /^[A-Za-z0-9_-]{16,80}$/
