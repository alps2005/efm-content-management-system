export function decodeJwtPayload(token) {
  const payload = token.split(".")[1]
  if (!payload) return null

  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/")
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=")

  try {
    return JSON.parse(atob(padded))
  } catch {
    return null
  }
}
