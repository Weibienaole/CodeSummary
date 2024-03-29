import { InlineConfig, build as viteBuild } from 'vite'
import { RollupOutput } from 'rollup'
import { pathToFileURL } from 'url'
import * as path from 'path'
import fs from 'fs-extra'

import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constants'
import { SiteConfig } from 'shared/types'
import { createVitePlugins } from './vitePlugins'

const dynamicImport = new Function('m', 'return import(m)')

export async function build(root = process.cwd(), config: SiteConfig) {
  // 分别打包client和server代码
  console.log(root, 'rootroot', CLIENT_ENTRY_PATH, 'CLIENT_ENTRY_PATH')

  const [clientBoundle] = await boundle(root, config)

  // 引入SSR模块
  root = path.resolve(root)
  const serverEnterPath = path.join(root, '.temp', 'ssr-entry.js')
  // 服务端渲染，产出
  const { render } = await import(pathToFileURL(serverEnterPath).toString())
  await renderPage(render, root, clientBoundle)
}

export async function boundle(root: string, config: SiteConfig) {
  try {
    const resolveViteBuildConfig = async (
      isServe: boolean
    ): Promise<InlineConfig> => {
      return {
        mode: 'production',
        root,
        plugins: await createVitePlugins(config),
        ssr: {
          noExternal: ['react-router-dom']
        },
        build: {
          minify: false,
          // assetsDir: '',
          ssr: isServe,
          outDir: isServe ? path.join(root, '.temp') : path.join(root, 'build'),
          rollupOptions: {
            input: isServe ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
            output:
              // isServe
              //   ? {
              //       format: 'cjs',
              //       entryFileNames: '[name].js'
              //     }
              //   : {
              //       format: 'esm',
              //       entryFileNames: '[name].js'
              //     }
              {
                format: isServe ? 'cjs' : 'esm'
              }
          }
        }
      }
    }

    console.log('Building client + server bundles...')
    const [clientBoundle, serverBoundle] = await Promise.all([
      viteBuild(await resolveViteBuildConfig(false)),
      viteBuild(await resolveViteBuildConfig(true))
    ])

    return [clientBoundle, serverBoundle] as [RollupOutput, RollupOutput]
  } catch (e) {
    console.log('err', e)
  }
}

async function renderPage(
  render: () => string,
  root: string,
  boundle: RollupOutput
) {
  const clientChunk = boundle.output.find(
    (chunk) => chunk.isEntry && chunk.type === 'chunk'
  )
  // console.log('renderPage', clientChunk)
  const { default: ora } = await dynamicImport('ora')
  const spinner = ora()
  spinner.start('Rendering page in server side...')
  const appHtml = render()
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>title</title>
    <meta name="description" content="xxx">
  </head>
  <body>
    <div id="root">${appHtml}</div>
    </body>
    <script type="module" src="/${clientChunk?.fileName}"></script>
    </html>
    `.trim()

  await fs.ensureDir(path.join(root, 'build'))
  await fs.writeFile(path.join(root, 'build', 'index.html'), html)
  await fs.remove(path.join(root, '.temp'))
  spinner.stop()
}
