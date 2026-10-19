export function mapTaskRows(payload) {
  const items = Array.isArray(payload?.items) ? payload.items : []
  const open = []
  const done = []
  for (const item of items) {
    if (item.deleted) continue
    if (typeof item.id !== 'string' || item.id.length === 0) continue
    if (typeof item.title !== 'string' || item.title.length === 0) continue
    const row = { id: item.id, title: item.title, due: formatDue(item.due) }
    if (item.status === 'completed') done.push(row)
    else open.push(row)
  }
  return { open, done }
}

export function mapLists(payload) {
  const items = Array.isArray(payload?.items) ? payload.items : []
  return items
    .filter((item) => typeof item.id === 'string' && typeof item.title === 'string')
    .map((item) => ({ id: item.id, title: item.title }))
}

export function chooseList(lists, selectedId) {
  if (!Array.isArray(lists) || lists.length === 0) return null
  return lists.find((list) => list.id === selectedId) ?? lists[0]
}

export function formatDue(due) {
  if (typeof due !== 'string') return null
  const date = new Date(due)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(date)
}
