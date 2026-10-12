import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const root = fileURLToPath(new URL('../', import.meta.url))
const source = path.join(root, 'src/final-labs-ui')
const labs = path.join(root, 'public/final-sims')
const css = await fs.readFile(path.join(source, 'lab.css'), 'utf8')
const art = await fs.readFile(path.join(source, 'scenes/art.js'), 'utf8')
const licence = await fs.readFile(path.join(root, 'node_modules/motion/LICENSE.md'), 'utf8')
const result = await build({
  configFile: false,
  publicDir: false,
  logLevel: 'warn',
  build: {
    write: false,
    minify: true,
    lib: { entry: path.join(source, 'lab.js'), formats: ['iife'], name: 'FinalLabsUI' },
  },
})
const output = Array.isArray(result) ? result[0].output : result.output
const js = output.find((item) => item.type === 'chunk').code
for (const file of (await fs.readdir(labs)).filter((name) => /^\d\d-.*\.html$/.test(name))) {
  const filename = path.join(labs, file)
  const sceneFile = path.join(source, 'scenes', file.replace('.html', '.js'))
  const scene = await fs.readFile(sceneFile, 'utf8')
  const sceneScript = `<script data-final-labs-scene>(() => {\n${art}\n${scene}\n})();</script>\n`
  let html = await fs.readFile(filename, 'utf8')
  html = html.replace(/\n<!-- FINAL LABS UI START -->[\s\S]*?<!-- FINAL LABS UI END -->\n/g, '\n')
  html = html.replace('</head>', `<!-- FINAL LABS UI START -->\n<style id="final-labs-ui">\n${css}</style>\n<!-- FINAL LABS UI END -->\n</head>`)
  html = html.replace('</body>', `<!-- FINAL LABS UI START -->\n${sceneScript}<!-- Motion licence\n${licence.replace(/--/g, '—')}\n-->\n<script data-final-labs-ui>${js.replace(/<\/script/gi, '<\\/script')}</script>\n<!-- FINAL LABS UI END -->\n</body>`)
  await fs.writeFile(filename, html)
  console.log(`Updated ${file}`)
}
