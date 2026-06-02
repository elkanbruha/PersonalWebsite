import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// Serve static HTML pages from public/<slug>/index.html at /<slug> and /<slug>/
// before Vite's SPA fallback kicks in.
function staticSubpages() {
  return {
    name: 'static-subpages',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || req.method !== 'GET') return next()
        const url = req.url.split('?')[0]
        // Skip the root and any path with a file extension.
        if (url === '/' || /\.[^/]+$/.test(url)) return next()
        const slug = url.replace(/^\/+|\/+$/g, '')
        if (!slug) return next()
        const file = path.join(server.config.publicDir, slug, 'index.html')
        if (!fs.existsSync(file)) return next()
        res.setHeader('Content-Type', 'text/html')
        res.end(fs.readFileSync(file))
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), staticSubpages()],
})
