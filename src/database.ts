import { knex } from 'knex'

export const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './tmp/app.db',
  },
})
