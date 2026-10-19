import assert from 'node:assert/strict'
import test from 'node:test'
import { stripSecrets } from '../shared/utils/render.ts'

test('the host response has no token', () => {
  const body = stripSecrets({
    token: 'super-secret-token',
    secret: 'super-secret-client',
    lists: [],
    tasks: [],
    events: [],
    weather: { status: 'no-place' },
  })
  const json = JSON.stringify(body)
  assert.equal(json.includes('super-secret-token'), false)
  assert.equal(json.includes('super-secret-client'), false)
  assert.equal(body.weather.status, 'no-place')
})

test('the glass keeps the event day', () => {
  const body = stripSecrets({
    events: [{ title: 'Standup', time: 'Mon 19 Oct 13:00', day: 'Mon 19 Oct', clock: '13:00', detail: 'Bring notes' }],
    weather: { status: 'no-place' },
  })
  assert.deepEqual(body.events, [{ title: 'Standup', time: 'Mon 19 Oct 13:00', day: 'Mon 19 Oct', clock: '13:00', detail: 'Bring notes' }])
})
