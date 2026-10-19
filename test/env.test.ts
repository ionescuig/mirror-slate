import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { configFromEnv, parseEnv } from '../shared/utils/env.ts'

test('the env example names a town and hides secrets', () => {
  const text = readFileSync(new URL('../.env.example', import.meta.url), 'utf8')
  assert.match(text, /^MIRROR_PLACE=Town, UK$/m)
  assert.equal(text.includes('client_secret'), false)
  assert.equal(text.includes('refresh_token'), false)
})

test('process env overrides the file place', () => {
  const config = configFromEnv(parseEnv('MIRROR_PLACE=Other, UK\n'), { MIRROR_PLACE: 'Town, UK' })
  assert.equal(config.place, 'Town, UK')
  assert.equal(config.clientFile, 'secrets/client.json')
  assert.equal(config.host, '0.0.0.0')
})

test('the env example listens on the LAN', () => {
  const text = readFileSync(new URL('../.env.example', import.meta.url), 'utf8')
  assert.match(text, /^HOST=0\.0\.0\.0$/m)
})
