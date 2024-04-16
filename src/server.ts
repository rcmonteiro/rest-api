import fastifyCookie from '@fastify/cookie'
import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = fastify()

app.register(fastifyCookie)
app.register(transactionsRoutes, { prefix: 'transactions' })

app.listen({ port: env.PORT }).then(() => {
  console.log(`[${env.NODE_ENV}] Server running on port ${env.PORT}`)
})
