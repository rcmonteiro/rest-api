import fastify from 'fastify'
import { db } from './database'
import { env } from './env'

const app = fastify()

app.get('/', async () => {
  const transactions = await db('transactions')
    .where('amount', 1000)
    .select('id')
  return transactions
})

app.listen({ port: env.PORT }).then(() => {
  console.log(`[${env.NODE_ENV}] Server running on port ${env.PORT}`)
})
