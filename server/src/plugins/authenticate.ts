import { FastifyRequest } from "fastify";

export async function authenticaded(request: FastifyRequest) {
    await request.jwtVerify() 
} 