import { APP_BASE_HREF } from '@angular/common'
import { CommonEngine } from '@angular/ssr'
import express from 'express'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'
import bootstrap from './src/main.server'
import { MailController } from './server/controller/MailController'
import cors from 'cors'
import { AppDataSource } from './server/DataSource'
import { BlogController } from './server/controller/BlogController'

// The Express app is exported so that it can be used by serverless Functions.
export async function app(): Promise<express.Express> {
  const server = express()
  const serverDistFolder = dirname(fileURLToPath(import.meta.url))
  const browserDistFolder = resolve(serverDistFolder, '../browser')
  const indexHtml = join(serverDistFolder, 'index.server.html')

  const commonEngine = new CommonEngine()

  require('dotenv').config()

  server.set('view engine', 'html')
  server.set('views', browserDistFolder)
  server.use(cors())

  AppDataSource.initialize()
    .then(() => {
      console.log('Database connection established')
    })
    .catch(error => {
      console.error('Database connection failed', error)
    })

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
    }),
  )

  server.use(MailController)
  server.use(BlogController)

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then(html => res.send(html))
      .catch(err => next(err))
  })

  return server
}

async function run(): Promise<void> {
  const port = process.env['PORT'] || 4000

  // Start up the Node server
  const server = await app()
  server.listen(port, () => {
    console.log(
      `Node Express server ur om listening on http://localhost:${port}`,
    )
  })
}

run()
