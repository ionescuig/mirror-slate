import assert from 'node:assert/strict'
import test from 'node:test'
import { authUrl, fetchGoogle, mergeToken, readClient, refreshAccessToken, setTaskStatus, tokenExpired } from '../shared/utils/google.ts'
import { oauthCallbackResponse, oauthStartResponse } from '../server/utils/session.ts'

test('the auth URL can write a task and hides the client secret', () => {
  const url = authUrl({
    clientId: 'client-id',
    redirectUri: 'http://127.0.0.1:4173/oauth/callback',
    state: 'state-1',
  })
  const scope = new URL(url).searchParams.get('scope')
  assert.equal(scope.includes('https://www.googleapis.com/auth/calendar.readonly'), true)
  assert.equal(scope.includes('https://www.googleapis.com/auth/tasks'), true)
  assert.equal(scope.includes('tasks.readonly'), false)
  assert.equal(url.includes('client_secret'), false)
  assert.equal(url.includes('super-secret'), false)
})

test('a task click writes only the status', async () => {
  const calls = []
  const ok = await setTaskStatus({
    accessToken: 'super-secret-token',
    listId: 'list1',
    taskId: 'task1',
    done: true,
    fetchImpl: async (url, options) => {
      calls.push({ url, options })
      return { ok: true }
    },
  })
  assert.equal(ok, true)
  assert.equal(calls.length, 1)
  assert.match(calls[0].url, /lists\/list1\/tasks\/task1$/)
  assert.equal(calls[0].options.method, 'PATCH')
  assert.match(calls[0].options.body, /"status":"completed"/)
  assert.equal(JSON.stringify({ ok }).includes('super-secret-token'), false)
  const refused = await setTaskStatus({
    accessToken: 'token',
    listId: '../secret',
    taskId: 'task1',
    done: false,
    fetchImpl: async () => {
      throw new Error('fetch')
    },
  })
  assert.equal(refused, false)
})

test('a client file needs an id and a secret', () => {
  assert.equal(readClient({}), null)
  assert.deepEqual(readClient({ web: { client_id: 'id', client_secret: 'secret' } }), {
    clientId: 'id',
    clientSecret: 'secret',
  })
})

test('a later token keeps the refresh token', () => {
  const token = mergeToken(
    { refresh_token: 'refresh-1', access_token: 'old', expiry: '2000-01-01T00:00:00.000Z' },
    { access_token: 'new', expires_in: 3600 },
    Date.parse('2026-10-17T00:00:00Z'),
  )
  assert.equal(token.refresh_token, 'refresh-1')
  assert.equal(token.access_token, 'new')
  assert.equal(JSON.stringify(token).includes('client_secret'), false)
})

test('an expired token needs a refresh', () => {
  const now = Date.parse('2026-10-17T12:00:00Z')
  assert.equal(tokenExpired({ expiry: '2026-10-17T11:00:00.000Z' }, now), true)
  assert.equal(tokenExpired({ expiry: '2026-10-17T13:00:00.000Z' }, now), false)
  assert.equal(tokenExpired({}, now), true)
})

test('a refresh asks Google for a new access token', async () => {
  let sent = ''
  const next = await refreshAccessToken({
    refreshToken: 'refresh-1',
    client: { clientId: 'id', clientSecret: 'secret' },
    fetchImpl: async (_url, options) => {
      sent = String(options.body)
      return { ok: true, json: async () => ({ access_token: 'access-2', expires_in: 3600 }) }
    },
  })
  assert.match(sent, /grant_type=refresh_token/)
  assert.match(sent, /refresh_token=refresh-1/)
  assert.equal(next.access_token, 'access-2')
  assert.equal(JSON.stringify(next).includes('secret'), false)
})

test('a refused refresh returns nothing', async () => {
  const next = await refreshAccessToken({
    refreshToken: 'refresh-1',
    client: { clientId: 'id', clientSecret: 'secret' },
    fetchImpl: async () => ({ ok: false, json: async () => ({}) }),
  })
  assert.equal(next, null)
})

test('a tasks failure keeps the calendar', async () => {
  const glass = await fetchGoogle('token', async (url) => {
    const href = String(url)
    if (href.includes('tasks.googleapis.com')) throw new Error('timeout')
    return {
      ok: true,
      json: async () => ({
        items: [{ summary: 'Standup', status: 'confirmed', start: { dateTime: '2026-10-17T13:00:00Z' } }],
      }),
    }
  }, null, new Date('2026-10-17T12:00:00Z'))
  assert.deepEqual(glass.lists, [])
  assert.equal(glass.events[0].title, 'Standup')
})

test('a calendar failure keeps the tasks', async () => {
  const glass = await fetchGoogle('token', async (url) => {
    const href = String(url)
    if (href.includes('/users/@me/lists')) {
      return { ok: true, json: async () => ({ items: [{ id: 'list1', title: 'Home' }] }) }
    }
    if (href.includes('/lists/list1/tasks')) {
      return { ok: true, json: async () => ({ items: [{ id: 't1', title: 'Buy milk', status: 'needsAction' }] }) }
    }
    throw new Error('timeout')
  }, 'list1', new Date('2026-10-17T12:00:00Z'))
  assert.equal(glass.tasks[0].title, 'Buy milk')
  assert.deepEqual(glass.events, [])
})

test('the oauth redirect hides the client secret', async () => {
  const started = oauthStartResponse(
    authUrl({
      clientId: 'client-id',
      redirectUri: 'http://127.0.0.1:4173/oauth/callback',
      state: 'state-1',
    }),
  )
  assert.equal(started.status, 302)
  assert.equal(started.location.includes('client_secret'), false)
  assert.match(decodeURIComponent(started.location), /oauth\/callback/)
  const callback = await oauthCallbackResponse(new URLSearchParams('code=abc&state=state-1'), async () => true)
  assert.equal(callback.status, 302)
  assert.equal(callback.location, '/')
  assert.equal(JSON.stringify(callback).includes('abc'), false)
})
