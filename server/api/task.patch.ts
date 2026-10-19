import { writeTask } from '../utils/session'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const list = typeof body?.list === 'string' ? body.list : ''
  const id = typeof body?.id === 'string' ? body.id : ''
  const done = body?.done === true
  setHeader(event, 'cache-control', 'no-store')
  const ok = await writeTask(list, id, done)
  if (!ok) {
    setResponseStatus(event, 400)
    return { ok: false }
  }
  return { ok: true }
})
