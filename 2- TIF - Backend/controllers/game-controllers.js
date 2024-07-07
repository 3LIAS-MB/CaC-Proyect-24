import { validateGame, validatePartialGame } from '../Schemas/games-schemas.js'

export class GamesController {
  constructor ({ gameModel }) {
    this.gameModel = gameModel
  }

  getAll = async (req, res) => {
    // parametros de consulta
    const { categories } = req.query
    const games = await this.gameModel.getAll({ categories })
    res.json(games)
  }

  getById = async (req, res) => {
    // parametros de ruta
    const { id } = req.params
    const game = await this.gameModel.getById({ id })
    if (game) return res.json(game)
    res.status(404).json({ message: 'Game not found' })
  }

  create = async (req, res) => {
    const result = validateGame(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newGame = await this.gameModel.create({ input: result.data })

    res.status(201).json(newGame)
  }

  /**/

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.gameModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }

  update = async (req, res) => {
    const result = validatePartialGame(req.body)
    console.log('XDXDXDXDXD')
    console.log(result)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    console.log('ASDASDASDASDXDXDXDXD')
    console.log(id)
    const updatedGame = await this.movieModel.update({ id, input: result.data })

    return res.json(updatedGame)
  }
}
