/**
 * Invite-code gate for the beta. Every chat turn spends AI Gateway and
 * Sandbox credits, so the app stays closed to anyone without a code.
 *
 * Codes come from ACCESS_CODES (comma-separated). The cookie holds a hash
 * of the code, so removing a code from the list signs out everyone who
 * used it. Without ACCESS_CODES the gate is open in development and fully
 * closed in production.
 */

export const ACCESS_COOKIE = 'access-token'

function configuredCodes(): string[] {
  return (process.env.ACCESS_CODES ?? '')
    .split(',')
    .map((code) => code.trim())
    .filter(Boolean)
}

export function hasConfiguredCodes(): boolean {
  return configuredCodes().length > 0
}

async function hashCode(code: string): Promise<string> {
  const data = new TextEncoder().encode(`mubassat-access:${code}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, '0')
  ).join('')
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }
  let diff = 0
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}

async function matchesConfiguredCode(token: string): Promise<boolean> {
  const hashes = await Promise.all(configuredCodes().map(hashCode))
  // Compare against every hash so timing doesn't reveal which code matched.
  return hashes.reduce((found, hash) => safeEqual(hash, token) || found, false)
}

/** Returns the cookie value to store when `code` is valid, otherwise null. */
export async function tokenForCode(code: string): Promise<string | null> {
  if (!code) {
    return null
  }
  const token = await hashCode(code)
  return (await matchesConfiguredCode(token)) ? token : null
}

export async function isAccessGranted(
  token: string | undefined
): Promise<boolean> {
  if (!hasConfiguredCodes()) {
    return process.env.NODE_ENV !== 'production'
  }
  return token ? matchesConfiguredCode(token) : false
}
