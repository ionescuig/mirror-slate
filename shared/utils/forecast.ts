import { forecastUrl, geocodeUrl, pickPlace } from './place.ts'
import { mapWeather } from './weather.ts'

const CACHE_MS = 15 * 60 * 1000
let cache = null

export function clearWeatherCache() {
  cache = null
}

export async function loadWeather(place, fetchImpl, now = Date.now()) {
  if (!place) return { status: 'no-place' }
  if (cache && cache.place === place && now - cache.at < CACHE_MS) return cache.weather
  try {
    const geoResponse = await fetchImpl(geocodeUrl(place))
    if (!geoResponse.ok) return { status: 'failed' }
    const coords = pickPlace(await geoResponse.json(), place)
    if (!coords) return { status: 'failed' }
    const forecastResponse = await fetchImpl(forecastUrl(coords))
    if (!forecastResponse.ok) return { status: 'failed' }
    const weather = mapWeather(await forecastResponse.json())
    if (weather.status !== 'ok') return { status: 'failed' }
    weather.place = place
    cache = { place, at: now, weather }
    return weather
  } catch {
    return { status: 'failed' }
  }
}
