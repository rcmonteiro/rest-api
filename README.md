# Simple Node.js REST API

Montando uma API simples em Node.js, utilizando:

- Fastify, como micro-framework para facilitar a criação das rotas
- SQLite como banco, pois é só uma API educativa, e o banco seria o de menos neste caso
- Knex, como query-builder, assim podemos trocar de banco depois se assim a gente desejar, e deixar todo o trabalho do modelo de dados organizado em migrations
- Zod para validação das rotas