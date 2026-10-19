import { beginOAuth, oauthStartResponse } from '../utils/session'

export default defineEventHandler((event) => {
  const result = oauthStartResponse(beginOAuth())
  setHeader(event, 'cache-control', 'no-store')
  if (result.location) return sendRedirect(event, result.location, result.status)
  setResponseStatus(event, result.status)
  return result.body
})
