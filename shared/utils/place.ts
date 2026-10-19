export function geocodeUrl(place) {
  const url = new URL('https://geocoding-api.open-meteo.com/v1/search')
  const wantsGb = wantsUnitedKingdom(place)
  const name = place.replace(/,?\s*(uk|u\.k\.|united kingdom|gb)\b/gi, '').trim() || place
  url.searchParams.set('name', name)
  url.searchParams.set('count', '10')
  url.searchParams.set('language', 'en')
  url.searchParams.set('format', 'json')
  if (wantsGb) url.searchParams.set('countryCode', 'GB')
  return url
}

export function pickPlace(payload, query) {
  const results = Array.isArray(payload?.results) ? payload.results : []
  const chosen = wantsUnitedKingdom(query)
    ? results.find((item) => item.country_code === 'GB')
    : results[0]
  if (!chosen || typeof chosen.latitude !== 'number' || typeof chosen.longitude !== 'number') return null
  return {
    latitude: chosen.latitude,
    longitude: chosen.longitude,
    timezone: typeof chosen.timezone === 'string' ? chosen.timezone : 'UTC',
  }
}

export function forecastUrl(coords) {
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.searchParams.set('latitude', String(coords.latitude))
  url.searchParams.set('longitude', String(coords.longitude))
  url.searchParams.set('daily', 'weather_code,temperature_2m_max,apparent_temperature_max')
  url.searchParams.set('timezone', coords.timezone || 'UTC')
  url.searchParams.set('forecast_days', '7')
  return url
}

function wantsUnitedKingdom(place) {
  return /\b(uk|u\.k\.|gb|united kingdom)\b/i.test(place)
}
