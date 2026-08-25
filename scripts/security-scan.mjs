import { readdir, readFile, stat } from 'node:fs/promises'
import { extname, join } from 'node:path'

const root = process.argv[2]
if (!root) throw new Error('Usage: node scripts/security-scan.mjs <directory>')

const textExtensions = new Set(['.html', '.js', '.css', '.json', '.svg', '.txt', '.xml'])
const forbiddenPatterns = [
  { label: 'local user path', pattern: /\/Users\//i },
  { label: 'Hermes private directory', pattern: /\.hermes/i },
  { label: 'API key identifier', pattern: /API_KEY/i },
  { label: 'Hermes environment identifier', pattern: /HERMES_[A-Z0-9_]+/i },
  { label: 'bearer credential', pattern: /Bearer\s+[A-Za-z0-9._-]+/i },
  { label: 'insecure numeric service URL', pattern: /http:\/\/(?:\d{1,3}\.){3}\d{1,3}/i },
]

async function walk(directory) {
  const files = []
  for (const entry of await readdir(directory)) {
    const path = join(directory, entry)
    if ((await stat(path)).isDirectory()) files.push(...await walk(path))
    else if (textExtensions.has(extname(entry))) files.push(path)
  }
  return files
}

const findings = []
for (const file of await walk(root)) {
  const content = await readFile(file, 'utf8')
  for (const rule of forbiddenPatterns) {
    if (rule.pattern.test(content)) findings.push(`${file}: ${rule.label}`)
  }
}

if (findings.length > 0) {
  console.error(`Security scan failed:\n${findings.join('\n')}`)
  process.exit(1)
}

console.log(`Security scan passed: ${root}`)
