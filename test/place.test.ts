import assert from 'node:assert/strict'
import test from 'node:test'
import { clearWeatherCache, loadWeather } from '../shared/utils/forecast.ts'
import { geocodeUrl, pickPlace } from '../shared/utils/place.ts'

test('a UK town asks Open-Meteo for Britain', () => {
  const url = geocodeUrl('Town, UK')
  assert.equal(url.searchParams.get('name'), 'Town')
  assert.equal(url.searchParams.get('countryCode'), 'GB')
})

test('a UK town ignores a US match', () => {
  const place = pickPlace(
    {
      results: [
        { name: 'Town', country_code: 'US', latitude: 42, longitude: -71, timezone: 'America/New_York' },
        { name: 'Town', country_code: 'GB', latitude: 51.5, longitude: -0.1, timezone: 'Europe/London' },
      ],
    },
    'Town, UK',
  )
  assert.equal(place.latitude, 51.5)
  assert.equal(place.timezone, 'Europe/London')
})

test('weather stays for 15 minutes and then loads again', async () => {
  clearWeatherCache()
  let forecastCalls = 0
  const fetchImpl = async (url) => {
    const href = String(url)
    if (href.includes('geocoding')) {
      return {
        ok: true,
        json: async () => ({
          results: [{ name: 'Town', country_code: 'GB', latitude: 51.5, longitude: -0.1, timezone: 'Europe/London' }],
        }),
      }
    }
    forecastCalls += 1
    return {
      ok: true,
      json: async () => ({
        daily: {
          time: ['2026-10-17', '2026-10-18', '2026-10-19', '2026-10-20', '2026-10-21', '2026-10-22'],
          temperature_2m_max: [15 + forecastCalls, 16, 14, 13, 12, 11],
          weather_code: [0, 3, 61, 45, 71, 95],
        },
      }),
    }
  }
  const first = await loadWeather('Town, UK', fetchImpl, 0)
  const held = await loadWeather('Town, UK', fetchImpl, 15 * 60 * 1000 - 1)
  const next = await loadWeather('Town, UK', fetchImpl, 15 * 60 * 1000)
  assert.equal(first.today.high, held.today.high)
  assert.notEqual(next.today.high, first.today.high)
  assert.equal(forecastCalls, 2)
})

test('a failed weather lookup invents no number', async () => {
  clearWeatherCache()
  const weather = await loadWeather('Town, UK', async () => ({ ok: false, json: async () => ({}) }))
  assert.deepEqual(weather, { status: 'failed' })
  assert.equal(JSON.stringify(weather).match(/\d/), null)
})
