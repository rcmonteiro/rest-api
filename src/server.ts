import fastify from 'fastify'
import { db } from './database'

const app = fastify()

app.get('/', async () => {
  const tables = await db('sqlite_schema').select('*')
  return tables
})

app.listen({ port: 3333 }).then(() => {
  console.log('Server running on port 3333')
})
