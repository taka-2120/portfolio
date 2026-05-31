import type { Request, Response } from 'express'
import { listBlogSlugs, readBlogPost } from './vault.js'
import { syncToPortfolio } from './github.js'

export async function syncHandler(req: Request, res: Response) {
  const slug = req.query.slug as string | undefined

  const slugs = slug ? [slug] : listBlogSlugs()
  if (slugs.length === 0) {
    res.json({ message: 'No blog posts found', synced: 0 })
    return
  }

  const files: { path: string; content: string }[] = []
  const skipped: string[] = []

  for (const s of slugs) {
    for (const lang of ['en', 'ja']) {
      try {
        const content = readBlogPost(s, lang)
        files.push({ path: `src/content/blog/${s}/${lang}.mdx`, content })
      } catch {
        skipped.push(`${s}/${lang}`)
      }
    }
  }

  if (files.length === 0) {
    res.json({ message: 'Nothing to sync', skipped })
    return
  }

  try {
    const { prUrl, synced } = await syncToPortfolio(files)
    if (synced === 0) {
      res.json({ message: 'Already up to date', synced: 0, skipped })
    } else {
      res.json({ message: 'Synced', synced, prUrl, skipped })
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    res.status(500).json({ error: message })
  }
}
