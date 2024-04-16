import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { db } from '../database'
import { validateSession } from '../middlewares/validate-session'

export const transactionsRoutes = async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    console.log(`[${request.method}] ${request.url}`)
  })

  app.post('/', async (request, reply) => {
    const createTransactionBody = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBody.parse(request.body)

    let sessionId = request.cookies.sessionId
    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    await db('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })
    reply.status(201).send()
  })

  app.get('/', { preHandler: [validateSession] }, async (request) => {
    const sessionId = request.cookies.sessionId

    const transactions = await db('transactions')
      .where('session_id', sessionId)
      .select()
    return { transactions }
  })

  app.get('/summary', { preHandler: [validateSession] }, async (request) => {
    const sessionId = request.cookies.sessionId

    const summary = await db('transactions')
      .where('session_id', sessionId)
      .sum('amount', { as: 'amount' })
      .first()
    return { summary }
  })

  app.get('/:id', { preHandler: [validateSession] }, async (request) => {
    const sessionId = request.cookies.sessionId
    const getTransactionParams = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionParams.parse(request.params)

    const transaction = await db('transactions')
      .where({ id, session_id: sessionId })
      .first()

    return { transaction }
  })
}
