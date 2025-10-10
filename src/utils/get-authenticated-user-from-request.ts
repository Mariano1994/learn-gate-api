import fastify from "fastify";

export function getAuthenticatedUserFromRequest(request: fastify.FastifyRequest) {
  const user = request.user

  if(!user) {
    throw new Error('Ivalid authentication')
  }

  return user
}