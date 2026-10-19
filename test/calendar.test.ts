import assert from 'node:assert/strict'
import test from 'node:test'
import { groupEvents, mapEventRows } from '../shared/utils/calendar.ts'

const now = new Date('2026-10-17T12:00:00Z')

test('no events produce no rows', () => {
  assert.deepEqual(mapEventRows({ items: [] }, now), [])
  assert.deepEqual(mapEventRows({}, now), [])
})

test('the calendar keeps upcoming events and drops the rest', () => {
  const rows = mapEventRows(
    {
      items: [
        { summary: 'Dentist', status: 'confirmed', start: { dateTime: '2026-10-17T09:30:00Z' } },
        { summary: 'Trip', status: 'confirmed', start: { date: '2026-10-18' } },
        { summary: 'Cancelled', status: 'cancelled', start: { dateTime: '2026-10-17T15:00:00Z' } },
        { summary: 'Old', status: 'confirmed', start: { date: '2026-10-10' } },
        { summary: 'Later', status: 'confirmed', start: { date: '2026-10-24' } },
      ],
    },
    now,
  )
  assert.deepEqual(rows, [
    { title: 'Dentist', time: 'Sat 17 Oct 09:30', day: 'Sat 17 Oct', clock: '09:30', detail: null },
    { title: 'Trip', time: 'Sun 18 Oct', day: 'Sun 18 Oct', clock: null, detail: null },
  ])
})

test('events on one day share that day', () => {
  const rows = mapEventRows(
    {
      items: [
        { summary: 'Standup', status: 'confirmed', start: { dateTime: '2026-10-19T13:00:00Z' } },
        { summary: 'Review', status: 'confirmed', start: { dateTime: '2026-10-19T15:00:00Z' } },
        { summary: 'Trip', status: 'confirmed', start: { date: '2026-10-20' } },
      ],
    },
    now,
  )
  assert.deepEqual(groupEvents(rows), [
    {
      day: 'Mon 19 Oct',
      items: [
        { title: 'Standup', time: 'Mon 19 Oct 13:00', day: 'Mon 19 Oct', clock: '13:00', detail: null },
        { title: 'Review', time: 'Mon 19 Oct 15:00', day: 'Mon 19 Oct', clock: '15:00', detail: null },
      ],
    },
    {
      day: 'Tue 20 Oct',
      items: [{ title: 'Trip', time: 'Tue 20 Oct', day: 'Tue 20 Oct', clock: null, detail: null }],
    },
  ])
})

test('an event keeps a plain detail and drops markup', () => {
  const rows = mapEventRows(
    {
      items: [{
        summary: 'Standup',
        status: 'confirmed',
        location: 'Lab',
        description: '<b>Bring notes</b><br>Room key',
        start: { dateTime: '2026-10-19T13:00:00Z' },
      }],
    },
    now,
  )
  assert.equal(rows[0].detail, 'Lab')
  assert.equal(rows[0].detail.includes('Bring notes'), false)
})

test('a note without a place keeps one line', () => {
  const rows = mapEventRows(
    {
      items: [{
        summary: 'Meet',
        status: 'confirmed',
        description: 'Bring the cable\nPowered by Calendly\nNeed to make changes to this event?',
        start: { dateTime: '2026-10-19T13:00:00Z' },
      }],
    },
    now,
  )
  assert.equal(rows[0].detail, 'Bring the cable')
})

test('a timed event shows the weekday and the date', () => {
  const rows = mapEventRows(
    {
      items: [{ summary: 'Standup', status: 'confirmed', start: { dateTime: '2026-10-19T13:00:00+01:00' } }],
    },
    now,
  )
  assert.deepEqual(rows, [{ title: 'Standup', time: 'Mon 19 Oct 13:00', day: 'Mon 19 Oct', clock: '13:00', detail: null }])
})