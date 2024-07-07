import { Router } from 'express'
import { GamesController } from '../controllers/game-controllers.js'

export const createGameRouter = ({ gameModel }) => {
  const gamesRouter = Router()

  // Inyección de dependencias
  const gamesController = new GamesController({ gameModel })

  gamesRouter.get('/', gamesController.getAll)
  gamesRouter.post('/', gamesController.create)

  gamesRouter.get('/:id', gamesController.getById)
  gamesRouter.delete('/:id', gamesController.delete)
  gamesRouter.patch('/:id', gamesController.update)

  return gamesRouter
}
