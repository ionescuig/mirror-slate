import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { configFromEnv, parseEnv } from '../../shared/utils/env.ts'
import { loadWeather } from '../../shared/utils/forecast.ts'
import { authUrl, exchangeCode, fetchGoogle, mergeToken, readClient, refreshAccessToken, setTaskStatus, tokenExpired } from '../../shared/utils/google.ts'
import { stripSecrets } from '../../shared/utils/render.ts'
import { buildState } from '../../shared/utils/state.ts'

const states = new Set()

function repoRoot() {
  return process.cwd()
}

export function loadConfig() {
  const envPath = path.join(repoRoot(), '.env')
  const fileValues = fs.existsSync(envPath) ? parseEnv(fs.readFileSync(envPath, 'utf8')) : {}
  return configFromEnv(fileValues, process.env)
}

function insideRoot(root, file) {
  const rootPath = path.resolve(root)
  const full = path.resolve(rootPath, file)
  if (full !== rootPath && !full.startsWith(rootPath + path.sep)) return null
  return full
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return null
  }
}

function paths() {
  const config = loadConfig()
  const root = repoRoot()
  return {
    config,
    clientPath: insideRoot(root, config.clientFile),
    tokenPath: insideRoot(root, config.tokenFile),
    redirectUri: `http://127.0.0.1:${config.port}/oauth/callback`,
  }
}

function loadClient() {
  const { clientPath } = paths()
  if (!clientPath) return null
  return readClient(readJson(clientPath))
}

async function currentAccessToken() {
  const { tokenPath } = paths()
  if (!tokenPath) return null
  const saved = readJson(tokenPath)
  if (!saved?.access_token) return null
  if (!tokenExpired(saved)) return saved.access_token
  const client = loadClient()
  if (!client || !saved.refresh_token) return null
  const next = await refreshAccessToken({
    refreshToken: saved.refresh_token,
    client,
    fetchImpl: fetch,
  })
  const token = mergeToken(saved, next)
  if (!token?.access_token) return null
  fs.writeFileSync(tokenPath, JSON.stringify(token), { mode: 0o600 })
  return token.access_token
}

export async function loadGlass(listId) {
  const { config } = paths()
  const weather = await loadWeather(config.place, fetch)
  const accessToken = await currentAccessToken()
  const google = accessToken
    ? await fetchGoogle(accessToken, fetch, listId)
    : { lists: [], tasks: [], done: [], events: [] }
  return stripSecrets(buildState(listId, { ...google, weather }))
}

export async function writeTask(listId, taskId, done) {
  const accessToken = await currentAccessToken()
  if (!accessToken) return false
  return setTaskStatus({ accessToken, listId, taskId, done, fetchImpl: fetch })
}

export function beginOAuth() {
  const client = loadClient()
  if (!client) return null
  const state = crypto.randomBytes(16).toString('hex')
  states.add(state)
  const { redirectUri } = paths()
  return authUrl({ clientId: client.clientId, redirectUri, state })
}

export async function finishOAuth(params) {
  const state = params.get('state')
  const code = params.get('code')
  if (!state || !states.has(state) || !code) return false
  states.delete(state)
  const client = loadClient()
  const { tokenPath, redirectUri } = paths()
  if (!client || !tokenPath) return false
  const next = await exchangeCode({ code, client, redirectUri, fetchImpl: fetch })
  const token = mergeToken(readJson(tokenPath), next)
  if (!token?.refresh_token) return false
  fs.mkdirSync(path.dirname(tokenPath), { recursive: true })
  fs.writeFileSync(tokenPath, JSON.stringify(token), { mode: 0o600 })
  return true
}

export function oauthStartResponse(location) {
  if (!location) {
    return { status: 200, body: 'Save the Google client file to secrets/client.json\n' }
  }
  return { status: 302, location }
}

export async function oauthCallbackResponse(params, complete) {
  const ok = complete ? await complete(params) : false
  if (!ok) return { status: 400, body: 'Google did not grant access.\n' }
  return { status: 302, location: '/' }
}
