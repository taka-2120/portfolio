import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { z } from 'zod'
import { listBlogSlugs, readBlogPost, writeBlogPost } from './vault.js'
import type { Request, Response } from 'express'

function makeServer() {
  const server = new McpServer({ name: 'obsidian-mcp', version: '1.0.0' })

  server.tool('list_blog_posts', 'List all blog post slugs in the vault', async () => {
    const slugs = listBlogSlugs()
    return {
      content: [{ type: 'text' as const, text: slugs.length > 0 ? slugs.join('\n') : '(no posts yet)' }],
    }
  })

  server.tool(
    'read_blog_post',
    'Read a blog post file from the vault',
    { slug: z.string(), lang: z.enum(['en', 'ja']) },
    async ({ slug, lang }) => {
      try {
        return { content: [{ type: 'text' as const, text: readBlogPost(slug, lang) }] }
      } catch {
        return {
          content: [{ type: 'text' as const, text: `Not found: blog/${slug}/${lang}.md` }],
          isError: true,
        }
      }
    }
  )

  server.tool(
    'write_blog_post',
    'Write a blog post file to the vault (directories created automatically)',
    {
      slug: z.string().regex(/^[a-z0-9-]+$/, 'slug must be lowercase kebab-case'),
      lang: z.enum(['en', 'ja']),
      content: z.string().min(1),
    },
    async ({ slug, lang, content }) => {
      writeBlogPost(slug, lang, content)
      return { content: [{ type: 'text' as const, text: `Written: blog/${slug}/${lang}.md` }] }
    }
  )

  return server
}

export function mcpHandler() {
  return async (req: Request, res: Response) => {
    const server = makeServer()
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined })
    res.on('close', () => transport.close())
    await server.connect(transport)
    await transport.handleRequest(req, res, req.body)
  }
}
