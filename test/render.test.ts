import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { stripSecrets } from '../shared/utils/render.ts'

const secretState = {
  token: 'super-secret-token',
  secret: 'super-secret-client',
  lists: [],
  selectedListId: null,
  tasks: [],
  events: [],
  weather: { status: 'no-place' },
}

test('the glass payload has no token and no secret', () => {
  assert.equal(JSON.stringify(stripSecrets(secretState)).includes('super-secret'), false)
})

test('the glass uses Nuxt UI and the quiet lines', () => {
  const files = [
    'app/pages/index.vue',
    'app/components/GlassTasks.vue',
    'app/components/GlassCalendar.vue',
    'app/components/GlassWeather.vue',
    'app/components/GlassFullscreen.vue',
    'app/components/GlassEmpty.vue',
    'app/components/GlassRegion.vue',
    'app/composables/useFullscreen.ts',
  ]
  const source = files.map((file) => readFileSync(file, 'utf8')).join('\n')
  assert.match(source, /<USelect/)
  assert.match(source, /<UButton/)
  assert.match(source, /<UEmpty/)
  assert.match(source, /<UIcon/)
  assert.equal(source.includes('<USeparator'), false)
  assert.match(readFileSync('app/components/GlassCalendar.vue', 'utf8'), /\{\{ row\.day \}\}/)
  assert.equal(readFileSync('app/components/GlassCalendar.vue', 'utf8').includes('group.items.length'), false)
  assert.match(source, /i-lucide-square/)
  assert.match(source, /i-lucide-calendar/)
  assert.match(source, /No place set\./)
  assert.match(source, /Weather unavailable\./)
  assert.match(source, /No lists\./)
  assert.match(source, /Nothing due\./)
  assert.match(source, /Nothing scheduled\./)
  assert.match(source, /title="Tasks"/)
  assert.match(source, /title="Calendar"/)
  assert.match(source, /Full screen/)
  const chrome = readFileSync('app/components/GlassFullscreen.vue', 'utf8')
  assert.match(chrome, /i-lucide-maximize/)
  assert.match(chrome, /i-lucide-minimize/)
  assert.equal(chrome.includes('{{ label }}'), false)
  assert.match(chrome, /i-lucide-refresh-cw/)
  assert.match(chrome, /aria-label="Refresh"/)
  assert.match(readFileSync('app/pages/index.vue', 'utf8'), /:refresh="refresh"/)
  assert.match(readFileSync('app/composables/useGlass.ts', 'utf8'), /return \{[^}]*refresh/)
  assert.match(readFileSync('app/composables/useGlass.ts', 'utf8'), /5 \* 60 \* 1000/)
  const glassSource = readFileSync('app/composables/useGlass.ts', 'utf8')
  assert.equal(glassSource.includes('moveTask'), false)
  assert.match(glassSource, /await \$fetch\('\/api\/task'[\s\S]*await refresh\(\)/)
  assert.equal(source.includes('v-html'), false)
  assert.equal(source.includes('glass.js'), false)
  assert.equal(source.includes('glass.css'), false)
})
