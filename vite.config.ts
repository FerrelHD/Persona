import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

function copyFolderRecursive(src: string, dest: string, excludes: string[] = []) {
  if (!fs.existsSync(src)) return
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    if (excludes.includes(entry.name)) continue

    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    try {
      const stat = fs.statSync(srcPath)
      if (stat.isDirectory()) {
        copyFolderRecursive(srcPath, destPath, excludes)
      } else if (stat.isFile()) {
        fs.copyFileSync(srcPath, destPath)
      }
    } catch {
      // Ignore broken symlinks/junctions
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

      const excludes = [
        'Persona 3 Reload-20260922T211042Z-1-001',
        'Persona 5 Royal-20260922T205144Z-1-001',
      ]

      console.log('\n[Vercel/Production Sync] Copying assets/ to dist/assets/...')
      copyFolderRecursive(assetsDir, distAssetsDir, excludes)
      console.log('[Vercel/Production Sync] Done copying assets!\n')
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
})
