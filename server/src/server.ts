import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'

const prisma = new PrismaClient({
    log: ['query'],
})

async function bootstrap() {
    const fastify = Fastify({
        logger: true
    })

    await fastify.register(cors, {
        origin: true
    })

    fastify.get('/pools/count', () => {
        const count = prisma.pool.count()
        
        return count
    })

    fastify.post('/pools', async (request, reply) => {
        const createPollBody = z.object({
            title: z.string()
        })
        
        try {
            const { title } = createPollBody.parse(request.body)

            const generateCode = new ShortUniqueId({length: 6})
            const code = String(generateCode()).toUpperCase()

            await prisma.pool.create({
                data: {
                    title,
                    code
                }
            })
        
            return reply.status(201).send({code})
        } catch(err) {
            console.error(err)
            return reply.status(400).send({message: 'Erro de validação dos dados.'})
        }
    })
    

    fastify.get('/users/count', () => {
        const count = prisma.user.count()
        
        return count
    })
    

    fastify.get('/guesses/count', () => {
        const count = prisma.guess.count()
        
        return count
    })

    

    await fastify.listen({port: 3333})
} 

bootstrap()