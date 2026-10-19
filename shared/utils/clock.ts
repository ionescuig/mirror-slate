export function formatClock(date, timeZone) {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }
  if (timeZone) options.timeZone = timeZone
  return new Intl.DateTimeFormat('en-GB', options).format(date)
}

export function formatDate(date, timeZone) {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }
  if (timeZone) options.timeZone = timeZone
  return new Intl.DateTimeFormat('en-GB', options).format(date)
}
