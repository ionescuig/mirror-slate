import { readFileSync, readdirSync, statSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { stripTypeScriptTypes } from 'node:module'
import path from 'node:path'

const roots = ['shared', 'server', 'app', 'test', 'scripts']

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (name.endsWith('.js') || name.endsWith('.ts')) out.push(full)
  }
  return out
}

function check(file) {
  if (!file.endsWith('.ts')) {
    return spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' }).status
  }
  const source = stripTypeScriptTypes(readFileSync(file, 'utf8'))
  return spawnSync(process.execPath, ['--check', '--input-type=module', '-'], {
    input: source,
    stdio: ['pipe', 'inherit', 'inherit'],
  }).status
}

const files = [...roots.flatMap((root) => walk(root)), 'nuxt.config.ts']
let failed = 0
for (const file of files) {
  if (check(file) !== 0) failed += 1
}
process.exit(failed === 0 ? 0 : 1)
