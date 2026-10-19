const WINDOW_MS = 7 * 24 * 60 * 60 * 1000
const MAX_ROWS = 12

export function mapEventRows(payload, now = new Date(), timeZone = 'UTC') {
  const items = Array.isArray(payload?.items) ? payload.items : []
  const startMs = startOfDay(now, timeZone)
  const endMs = startMs + WINDOW_MS
  const rows = []
  for (const item of items) {
    if (item.status === 'cancelled') continue
    if (typeof item.summary !== 'string' || item.summary.length === 0) continue
    const when = eventStart(item)
    if (!when) continue
    if (when.ms < startMs || when.ms >= endMs) continue
    rows.push({
      title: item.summary,
      time: when.label,
      day: when.day,
      clock: when.clock,
      detail: eventDetail(item),
      ms: when.ms,
    })
  }
  rows.sort((a, b) => a.ms - b.ms)
  return rows.slice(0, MAX_ROWS).map(({ title, time, day, clock, detail }) => ({ title, time, day, clock, detail }))
}

export function groupEvents(rows) {
  if (!Array.isArray(rows)) return []
  const groups = []
  for (const row of rows) {
    if (!row || typeof row.day !== 'string') continue
    const last = groups[groups.length - 1]
    if (last && last.day === row.day) last.items.push(row)
    else groups.push({ day: row.day, items: [row] })
  }
  return groups
}

function eventDetail(item) {
  const where = oneLine(plainText(item.location))
  if (where) return where
  const note = plainText(item.description)
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.length > 0 && !isBoilerplate(line))
  return note ? oneLine(note) : null
}

function oneLine(value) {
  const line = value.replace(/\s+/g, ' ').trim()
  if (!line) return null
  return line.length > 80 ? `${line.slice(0, 79).trimEnd()}…` : line
}

function isBoilerplate(line) {
  return /^(powered by|need to make changes|please share anything|event name|location:|cancel\b|reschedule\b)/i.test(line)
}

function plainText(value) {
  if (typeof value !== 'string') return ''
  return value
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/[ \t]+\n/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, 280)
}

function eventStart(item) {
  if (typeof item.start?.dateTime === 'string') {
    const ms = Date.parse(item.start.dateTime)
    const match = item.start.dateTime.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/)
    if (Number.isNaN(ms) || !match) return null
    const day = formatDay(match[1])
    return { ms, day, clock: match[2], label: `${day} ${match[2]}` }
  }
  if (typeof item.start?.date === 'string') {
    const ms = Date.parse(`${item.start.date}T00:00:00Z`)
    if (Number.isNaN(ms)) return null
    const day = formatDay(item.start.date)
    return { ms, day, clock: null, label: day }
  }
  return null
}

function formatDay(isoDate) {
  const date = new Date(`${isoDate}T12:00:00Z`)
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(date)
}

function startOfDay(now, timeZone) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  const year = parts.find((part) => part.type === 'year').value
  const month = parts.find((part) => part.type === 'month').value
  const day = parts.find((part) => part.type === 'day').value
  return Date.parse(`${year}-${month}-${day}T00:00:00Z`)
}
