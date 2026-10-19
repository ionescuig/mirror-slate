import assert from 'node:assert/strict'
import test from 'node:test'
import { formatClock, formatDate } from '../shared/utils/clock.ts'

test('the clock has hours and minutes and no seconds', () => {
  const date = new Date('2026-10-17T09:05:42Z')
  assert.equal(formatClock(date, 'UTC'), '09:05')
  assert.equal(formatDate(date, 'UTC'), 'Saturday 17 October')
})