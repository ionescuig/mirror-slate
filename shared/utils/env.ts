export function parseEnv(text) {
  const values = {}
  for (const line of String(text).split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (key) values[key] = value
  }
  return values
}

export function configFromEnv(fileValues, processEnv = {}) {
  const pick = (key, fallback = '') => processEnv[key] ?? fileValues[key] ?? fallback
  return {
    place: pick('MIRROR_PLACE'),
    clientFile: pick('GOOGLE_CLIENT_FILE', 'secrets/client.json'),
    tokenFile: pick('GOOGLE_TOKEN_FILE', 'secrets/token.json'),
    host: pick('HOST', '0.0.0.0'),
    port: Number(pick('PORT', '4173')),
  }
}
