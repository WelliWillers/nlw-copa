import { FastifyInstance } from "fastify"
import ShortUniqueId from "short-unique-id"
import { z } from "zod"
import { prisma } from "../lib/prisma"

export async function poolRoutes(fastify: FastifyInstance){
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
}