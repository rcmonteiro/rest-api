# Simple Node.js REST API

Montando uma API simples em Node.js, utilizando:

- Fastify, como micro-framework para facilitar a criação das rotas
- SQLite como banco, pois é só uma API educativa, e o banco seria o de menos neste caso
- Knex, como query-builder, assim podemos trocar de banco depois se assim a gente desejar, e deixar todo o trabalho do modelo de dados organizado em migrations
- Zod para validação das rotas

# Documentação da API

## Requisitos Funcionais

- [x] O usuário deve poder criar uma nova transação
- [x] O usuário deve poder obter um resumo da sua conta
- [x] O usuário deve poder listar todas as transações que já ocorreram
- [x] O usuário deve poder visualizar uma transação única

## Regras de Negócio

- [x] A transação pode ser do tipo débito (subtraindo do valor total) ou crédito (somando ao valor total)
- [x] Deve ser possível identificar o usuário entre as requisições (nesta versão de API não teremos uma camada de autenticação)
- [x] O usuário só pode visualizar transações que ele tenha criado

## Requisitos não funcionais

-