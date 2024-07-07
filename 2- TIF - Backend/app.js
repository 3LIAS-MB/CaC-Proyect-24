import express, { json } from 'express'
import { createGameRouter } from './routes/games-routes.js'
import { corsMiddleware } from './middlewares/cors.js'

export const createApp = ({ gameModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use('/games', createGameRouter({ gameModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
