import assert from 'node:assert/strict'
import test from 'node:test'
import { mapWeather, weatherIcon } from '../shared/utils/weather.ts'

test('weather shows today and the next five days', () => {
  const mapped = mapWeather({
    daily: {
      time: ['2026-10-17', '2026-10-18', '2026-10-19', '2026-10-20', '2026-10-21', '2026-10-22'],
      temperature_2m_max: [15.2, 16.4, 14, 13.2, 12.6, 11.1],
      weather_code: [0, 3, 61, 45, 71, 95],
    },
  })
  assert.equal(mapped.status, 'ok')
  assert.deepEqual(mapped.today, { name: 'Today', mark: 'Clear', high: 15, feels: null })
  assert.equal(mapped.days.length, 5)
  assert.deepEqual(mapped.days.map((day) => day.mark), ['Cloud', 'Rain', 'Fog', 'Snow', 'Storm'])
})

test('today keeps a feels-like high', () => {
  const mapped = mapWeather({
    daily: {
      time: ['2026-10-17', '2026-10-18', '2026-10-19', '2026-10-20', '2026-10-21', '2026-10-22'],
      temperature_2m_max: [15.2, 16.4, 14, 13.2, 12.6, 11.1],
      apparent_temperature_max: [12.6, 14, 11, 10, 9, 8],
      weather_code: [0, 3, 61, 45, 71, 95],
    },
  })
  assert.equal(mapped.today.feels, 13)
  assert.equal(mapped.days[0].feels, undefined)
})

test('a weather mark keeps one monochrome icon', () => {
  assert.equal(weatherIcon('Clear'), 'i-lucide-sun')
  assert.equal(weatherIcon('Fair'), 'i-lucide-cloud-sun')
  assert.equal(weatherIcon('Cloud'), 'i-lucide-cloud')
  assert.equal(weatherIcon('Fog'), 'i-lucide-cloud-fog')
  assert.equal(weatherIcon('Rain'), 'i-lucide-cloud-rain')
  assert.equal(weatherIcon('Snow'), 'i-lucide-snowflake')
  assert.equal(weatherIcon('Storm'), 'i-lucide-cloud-lightning')
  assert.equal(weatherIcon('Sky'), 'i-lucide-cloud')
  assert.equal(weatherIcon('Other'), 'i-lucide-cloud')
})

test('a failed weather payload invents no number', () => {
  for (const payload of [null, {}, { daily: { time: ['2026-10-17'] } }]) {
    const mapped = mapWeather(payload)
    assert.deepEqual(mapped, { status: 'failed' })
    assert.equal(JSON.stringify(mapped).match(/\d/), null)
  }
})