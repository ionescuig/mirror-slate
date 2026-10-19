import assert from 'node:assert/strict'
import test from 'node:test'
import { chooseList, mapTaskRows } from '../shared/utils/tasks.ts'

test('an empty task payload has no rows', () => {
  assert.deepEqual(mapTaskRows({ items: [] }), { open: [], done: [] })
  assert.deepEqual(mapTaskRows({}), { open: [], done: [] })
})

test('a completed task sits in the done list', () => {
  const rows = mapTaskRows({
    items: [
      { id: 'open-1', title: 'Buy milk', status: 'needsAction', due: '2026-10-18T00:00:00.000Z' },
      { id: 'done-1', title: 'Done', status: 'completed' },
    ],
  })
  assert.deepEqual(rows.open, [{ id: 'open-1', title: 'Buy milk', due: '18 Oct' }])
  assert.deepEqual(rows.done, [{ id: 'done-1', title: 'Done', due: null }])
})

test('the list control selects another list', () => {
  const lists = [
    { id: 'home', title: 'Home' },
    { id: 'shop', title: 'Shop' },
  ]
  assert.equal(chooseList(lists, 'shop').id, 'shop')
  assert.equal(chooseList(lists, 'missing').id, 'home')
  assert.equal(chooseList([], 'shop'), null)
})
