import { FastifyInstance } from "fastify"
import ShortUniqueId from "short-unique-id"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { authenticaded } from "../plugins/authenticate"

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

            try {
                await request.jwtVerify()

                await prisma.pool.create({
                    data: {
                        title,
                        code,
                        ownerId: request.user.sub,
                        participants: {
                            create: {
                                userId: request.user.sub
                            }
                        }
                    }
                })
            } catch {
                await prisma.pool.create({
                    data: {
                        title,
                        code
                    }
                })
            }

        
            return reply.status(201).send({code})
        } catch(err) {
            console.error(err)
            return reply.status(400).send({message: 'Erro de validação dos dados.'})
        }
    })

    fastify.post('/pools/join', {
        onRequest:  [authenticaded]
    }, async (req, res) => {
        const joinPoolBody = z.object({
            code: z.string()
        })

        const {code} = joinPoolBody.parse(req.body)

        const pool = await prisma.pool.findUnique({
            where: {
                code
            },
            include: {
                participants: {
                    where: {
                        userId: req.user.sub
                    }
                }
            }
        })

        if(!pool){
            return res.status(404).send({message: 'Pool not found'})
        }
        
        if(pool.participants.length > 0){
            return res.status(404).send({message: 'You already joined this pool'})
        }

        if(!pool.ownerId){
            await prisma.pool.update({
                where: {
                    id: pool.id
                },
                data: {
                    ownerId: req.user.sub
                }
            })
        }

        await prisma.participant.create({
            data: {
                poolId: pool.id,
                userId: req.user.sub
            }
        })

        return res.status(201).send()
    })

    fastify.get('/pools', {
        onRequest:  [authenticaded]
    }, async (req, res) => {
        

        const pools = await prisma.pool.findMany({
            where: {
                participants: {
                    some: {
                        userId: req.user.sub
                    }
                }
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                _count: {
                    select: {
                        participants: true
                    }
                },
                participants: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                avatarUrl: true
                            }
                        }
                    },
                    take: 4
                }
            }
        })

        return res.status(201).send(pools)
    })

    fastify.get('/pools/:id', {
        onRequest:  [authenticaded]
    }, async (req, res) => {
        const getPoolParams = z.object({
            id: z.string()
        })

        const { id } = getPoolParams.parse(req.params)
        
        const pool = await prisma.pool.findUnique({
            where: {
                id
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                _count: {
                    select: {
                        participants: true
                    }
                },
                participants: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                avatarUrl: true
                            }
                        }
                    },
                    take: 4
                }
            }
        })

        return res.status(201).send(pool)
    })
}