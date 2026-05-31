import fs from 'node:fs'
import path from 'node:path'

function vaultRoot(): string {
  const root = process.env.VAULT_ROOT
  if (!root) throw new Error('VAULT_ROOT not configured')
  return path.resolve(root)
}

function safePath(relPath: string): string {
  const root = vaultRoot()
  const resolved = path.resolve(root, relPath)
  if (!resolved.startsWith(root + path.sep) && resolved !== root) {
    throw new Error('Path traversal detected')
  }
  return resolved
}

export function listBlogSlugs(): string[] {
  const blogDir = safePath('blog')
  if (!fs.existsSync(blogDir)) return []
  return fs.readdirSync(blogDir).filter(entry =>
    fs.statSync(path.join(blogDir, entry)).isDirectory()
  )
}

export function readBlogPost(slug: string, lang: string): string {
  return fs.readFileSync(safePath(`blog/${slug}/${lang}.md`), 'utf-8')
}

export function writeBlogPost(slug: string, lang: string, content: string): void {
  const filePath = safePath(`blog/${slug}/${lang}.md`)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content, 'utf-8')
}
