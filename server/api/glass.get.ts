import { loadGlass } from '../utils/session'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const list = Array.isArray(query.list) ? query.list[0] : query.list
  setHeader(event, 'cache-control', 'no-store')
  return loadGlass(typeof list === 'string' ? list : null)
})
