import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

function copyFolderRecursive(src: string, dest: string) {
  if (!fs.existsSync(src)) return
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    try {
      const stat = fs.statSync(srcPath)
      if (stat.isDirectory()) {
        copyFolderRecursive(srcPath, destPath)
      } else if (stat.isFile()) {
        fs.copyFileSync(srcPath, destPath)
      }
    } catch {
      // Ignore
    }
  }
}

function assetsSyncPlugin() {
  return {
    name: 'assets-sync-plugin',
    closeBundle() {
      const rootDir = process.cwd()
      const assetsDir = path.resolve(rootDir, 'assets')
      const distAssetsDir = path.resolve(rootDir, 'dist', 'assets')

      if (!fs.existsSync(distAssetsDir)) {
        fs.mkdirSync(distAssetsDir, { recursive: true })
      }

      console.log('\n[Vercel/Production Sync] Copying production assets to dist/assets/...')

      // 1. Copy top-level asset files (images, avatars, screenshots)
      if (fs.existsSync(assetsDir)) {
        const topEntries = fs.readdirSync(assetsDir, { withFileTypes: true })
        for (const entry of topEntries) {
          if (entry.isFile()) {
            fs.copyFileSync(path.join(assetsDir, entry.name), path.join(distAssetsDir, entry.name))
          }
        }
      }

      // 2. Copy p5r_renders
      const rendersSrc = path.join(assetsDir, 'p5r_renders')
      const rendersDest = path.join(distAssetsDir, 'p5r_renders')
      if (fs.existsSync(rendersSrc)) {
        copyFolderRecursive(rendersSrc, rendersDest)
      }

      // 3. Copy compressed videos
      const videosSrc = path.join(assetsDir, 'videos')
      const videosDest = path.join(distAssetsDir, 'videos')
      if (fs.existsSync(videosSrc)) {
        copyFolderRecursive(videosSrc, videosDest)
      }

      console.log('[Vercel/Production Sync] Done! Lightweight production bundle created.\n')
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), assetsSyncPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
})
