import z from 'zod'

const gamesSchema = z.object({
  title: z.string({
    required_error: 'Game title is required.',
    invalid_type_error: 'Game title must be a string'
  }),
  description: z.string().max(1000),
  category_id: z.number().int().max(10),
  liked: z.number().int().positive(),
  download: z.number().int().positive(),
  price: z.number().default(10),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  })
  // categories: z.array(
  //   z.enum(['PlayStation', 'Xbox Cards', 'Fortnite Pavos'], {
  //     required_error: 'Game category is required.',
  //     invalid_type_error: 'Categories must be an array of enum values'
  //   })
  // )
})

export function validateGame (input) {
  return gamesSchema.safeParse(input)
}

export function validatePartialGame (input) {
  return gamesSchema.partial().safeParse(input)
}
