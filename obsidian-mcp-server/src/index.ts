import 'dotenv/config'
import express from 'express'
import { requireAuth } from './auth.js'
import { mcpHandler } from './mcp-handler.js'
import { syncHandler } from './sync-handler.js'

const app = express()
app.use(express.json())
app.use(requireAuth)

app.all('/mcp', mcpHandler())
app.post('/sync', syncHandler)

const port = Number(process.env.PORT ?? 3001)
app.listen(port, () => {
  console.log(`obsidian-mcp-server listening on :${port}`)
})
