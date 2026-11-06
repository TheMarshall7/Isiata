/** Cloudflare Worker that issues signed Tsukuyomi licences. Set TSUKUYOMI_LICENSE_API_BASE to override. */
export const TSUKUYOMI_LICENSE_API_BASE =
  process.env.TSUKUYOMI_LICENSE_API_BASE?.trim() || 'https://isiata-license.brianmarshallca.workers.dev'

/** Serials are PPP-XXXX-XXXX-XXXX; the three letters name the product or bundle sold. */
export const TSUKUYOMI_SERIAL_PATTERN = /^[A-Z]{3}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/

/** Matches the installation ID the plugin shows in the Activate panel. */
export const TSUKUYOMI_INSTALLATION_ID_PATTERN = /^[A-Za-z0-9_-]{16,80}$/
