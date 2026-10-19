export function mapWeather(payload) {
  const daily = payload?.daily
  if (!daily) return { status: 'failed' }
  const dates = daily.time
  const highs = daily.temperature_2m_max
  const feels = daily.apparent_temperature_max
  const codes = daily.weather_code
  if (!Array.isArray(dates) || !Array.isArray(highs) || !Array.isArray(codes)) {
    return { status: 'failed' }
  }
  if (dates.length < 6 || highs.length < 6 || codes.length < 6) {
    return { status: 'failed' }
  }
  const days = []
  for (let index = 0; index < 6; index += 1) {
    const high = highs[index]
    const code = codes[index]
    if (typeof high !== 'number' || typeof code !== 'number') return { status: 'failed' }
    const day = {
      name: index === 0 ? 'Today' : weekday(dates[index]),
      mark: weatherMark(code),
      high: Math.round(high),
    }
    if (index === 0) day.feels = feelsLike(feels, index)
    days.push(day)
  }
  return { status: 'ok', today: days[0], days: days.slice(1) }
}

const weatherIcons = {
  Clear: 'i-lucide-sun',
  Fair: 'i-lucide-cloud-sun',
  Cloud: 'i-lucide-cloud',
  Fog: 'i-lucide-cloud-fog',
  Rain: 'i-lucide-cloud-rain',
  Snow: 'i-lucide-snowflake',
  Storm: 'i-lucide-cloud-lightning',
  Sky: 'i-lucide-cloud',
}

export function weatherIcon(mark) {
  return weatherIcons[mark] || 'i-lucide-cloud'
}

export function weatherMark(code) {
  if (code === 0) return 'Clear'
  if (code === 1 || code === 2) return 'Fair'
  if (code === 3) return 'Cloud'
  if (code === 45 || code === 48) return 'Fog'
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'Rain'
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'Snow'
  if (code >= 95 && code <= 99) return 'Storm'
  return 'Sky'
}

function feelsLike(values, index) {
  const value = Array.isArray(values) ? values[index] : null
  if (typeof value !== 'number' || Number.isNaN(value)) return null
  return Math.round(value)
}

function weekday(isoDate) {
  const date = new Date(`${isoDate}T12:00:00Z`)
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    timeZone: 'UTC',
  }).format(date)
}
