import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'S436339133xd',
  database: 'shopgames'
}
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG
const connection = await mysql.createConnection(connectionString)

export class GameModel {
  static async getAll ({ category }) {
    const [games] = await connection.query(
      'SELECT BIN_TO_UUID(id) id , title, description, category_id, liked, download, price, poster FROM games;'
    )
    const [pavos] = await connection.query(
      'SELECT id, titulo, category_id, price FROM pavos;'
    )
    const [xbox] = await connection.query(
      'SELECT id, titulo, category_id, price FROM xbox'
    )
    const allProducts = [...games, ...pavos, ...xbox]

    return allProducts
  }

  static async getById ({ id }) {
    const [games] = await connection.query(
      'SELECT BIN_TO_UUID(id) id , title, description, liked, download, price, poster FROM games WHERE id = UUID_TO_BIN(?);',
      [id]
    )

    if (games.length === 0) return null

    return games[0]
  }

  static async create ({ input }) {
    console.log(input)
    const { title, description, category_id, liked, download, price, poster } =
      input

    // Generar un UUID para el nuevo juego
    const [uuidResult] = await connection.query('SELECT UUID() as uuid;')
    const [{ uuid }] = uuidResult

    try {
      // Insertar el nuevo juego en la tabla games
      await connection.query(
        'INSERT INTO games (id, title, description, category_id, liked, download, price, poster) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, ?);',
        [uuid, title, description, category_id, liked, download, price, poster]
      )

      // Recuperar el juego recién creado para devolverlo
      const [games] = await connection.query(
        'SELECT BIN_TO_UUID(id) as id, title, description, liked, download, price, poster FROM games WHERE id = UUID_TO_BIN(?);',
        [uuid]
      )

      if (games.length === 0) {
        throw new Error('Error retrieving the created game')
      }

      return games[0]
    } catch (e) {
      throw new Error()
    }
  }

  /**/

  static async delete ({ id }) {
    try {
      const [result] = await connection.query(
        'DELETE FROM games WHERE id = UUID_TO_BIN(?);',
        [id]
      )

      if (result.affectedRows === 0) {
        throw new Error('Game not found')
      }

      return { message: 'Game deleted successfully' }
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static async update ({ id, input }) {
    const { title, description, category_id, liked, download, price, poster } =
      input

    try {
      const [result] = await connection.query(
        `UPDATE games SET 
          title = ?,
          description = ?,
          category_id = ?,
          liked = ?,
          download = ?,
          price = ?,
          poster = ?
        WHERE id = UUID_TO_BIN(?);`,
        [title, description, category_id, liked, download, price, poster, id]
      )

      if (result.affectedRows === 0) {
        throw new Error('Game not found or no changes made')
      }

      // Recuperar el juego actualizado para devolverlo
      const [games] = await connection.query(
        'SELECT BIN_TO_UUID(id) as id, title, description, liked, download, price, poster FROM games WHERE id = UUID_TO_BIN(?);',
        [id]
      )

      console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
      console.log(games)

      if (games.length === 0) {
        throw new Error('Error retrieving the updated game')
      }

      return games[0]
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
