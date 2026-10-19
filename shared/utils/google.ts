import { mapEventRows } from './calendar.ts'
import { chooseList, mapLists, mapTaskRows } from './tasks.ts'

export const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/tasks',
].join(' ')

export function readClient(parsed) {
  const block = parsed?.web ?? parsed?.installed ?? null
  if (!block || typeof block.client_id !== 'string' || typeof block.client_secret !== 'string') return null
  return { clientId: block.client_id, clientSecret: block.client_secret }
}

export function authUrl({ clientId, redirectUri, state }) {
  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  url.searchParams.set('client_id', clientId)
  url.searchParams.set('redirect_uri', redirectUri)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('scope', GOOGLE_SCOPES)
  url.searchParams.set('access_type', 'offline')
  url.searchParams.set('prompt', 'consent')
  url.searchParams.set('state', state)
  return url.toString()
}

export function mergeToken(previous, next, now = Date.now()) {
  if (!next || typeof next.access_token !== 'string') return null
  const expiresIn = Number(next.expires_in)
  const lifetime = Number.isFinite(expiresIn) ? expiresIn : 3600
  return {
    access_token: next.access_token,
    refresh_token: next.refresh_token || previous?.refresh_token || '',
    expiry: new Date(now + lifetime * 1000).toISOString(),
  }
}

export function tokenExpired(token, now = Date.now()) {
  const at = Date.parse(token?.expiry ?? '')
  if (!Number.isFinite(at)) return true
  return at - now < 60_000
}

export async function refreshAccessToken({ refreshToken, client, fetchImpl }) {
  const body = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: client.clientId,
    client_secret: client.clientSecret,
    grant_type: 'refresh_token',
  })
  const response = await fetchImpl('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!response.ok) return null
  const json = await response.json()
  if (typeof json.access_token !== 'string') return null
  return json
}

const TASK_ID = /^[A-Za-z0-9_-]{1,128}$/

export async function setTaskStatus({ accessToken, listId, taskId, done, fetchImpl }) {
  if (!TASK_ID.test(listId) || !TASK_ID.test(taskId)) return false
  const url = `https://tasks.googleapis.com/tasks/v1/lists/${encodeURIComponent(listId)}/tasks/${encodeURIComponent(taskId)}`
  const response = await fetchImpl(url, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ id: taskId, status: done ? 'completed' : 'needsAction' }),
  })
  return response.ok === true
}

export async function exchangeCode({ code, client, redirectUri, fetchImpl }) {
  const body = new URLSearchParams({
    code,
    client_id: client.clientId,
    client_secret: client.clientSecret,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  })
  const response = await fetchImpl('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!response.ok) return null
  const json = await response.json()
  if (typeof json.access_token !== 'string') return null
  return json
}

export async function fetchGoogle(accessToken, fetchImpl, selectedId, now = new Date()) {
  const headers = { authorization: `Bearer ${accessToken}` }
  const tasks = await loadTaskLists(fetchImpl, headers, selectedId)
  const events = await loadEvents(fetchImpl, headers, now)
  return { ...tasks, events }
}

async function loadTaskLists(fetchImpl, headers, selectedId) {
  const empty = { lists: [], tasks: [], done: [] }
  try {
    const listsResponse = await fetchImpl('https://tasks.googleapis.com/tasks/v1/users/@me/lists', { headers })
    if (!listsResponse.ok) return empty
    const lists = mapLists(await listsResponse.json())
    const selected = chooseList(lists, selectedId)
    if (!selected) return { lists, tasks: [], done: [] }
    const taskUrl = `https://tasks.googleapis.com/tasks/v1/lists/${encodeURIComponent(selected.id)}/tasks?showCompleted=true&showHidden=true&maxResults=100`
    const taskResponse = await fetchImpl(taskUrl, { headers })
    if (!taskResponse.ok) return { lists, tasks: [], done: [] }
    const mapped = mapTaskRows(await taskResponse.json())
    return { lists, tasks: mapped.open, done: mapped.done }
  } catch {
    return empty
  }
}

async function loadEvents(fetchImpl, headers, now) {
  try {
    const cal = new URL('https://www.googleapis.com/calendar/v3/calendars/primary/events')
    cal.searchParams.set('singleEvents', 'true')
    cal.searchParams.set('orderBy', 'startTime')
    cal.searchParams.set('timeMin', now.toISOString())
    cal.searchParams.set('timeMax', new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString())
    cal.searchParams.set('maxResults', '20')
    const eventsResponse = await fetchImpl(cal, { headers })
    if (!eventsResponse.ok) return []
    return mapEventRows(await eventsResponse.json(), now)
  } catch {
    return []
  }
}
