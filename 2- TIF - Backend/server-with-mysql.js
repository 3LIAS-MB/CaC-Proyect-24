import { createApp } from './app.js'
import { GameModel } from './models/mysql/games-models.js'

createApp({ gameModel: GameModel })
