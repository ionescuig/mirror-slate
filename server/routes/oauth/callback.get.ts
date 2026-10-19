import { finishOAuth, oauthCallbackResponse } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const result = await oauthCallbackResponse(getRequestURL(event).searchParams, finishOAuth)
  setHeader(event, 'cache-control', 'no-store')
  if (result.location) return sendRedirect(event, result.location, result.status)
  setResponseStatus(event, result.status)
  return result.body
})