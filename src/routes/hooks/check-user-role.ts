import  fastify from 'fastify'
import { getAuthenticatedUserFromRequest } from '../../utils/get-authenticated-user-from-request.ts'

type Role = 'student' | 'manager' 

export  function checkUserRole(role: Role) {
  return async function (request: fastify.FastifyRequest ) {
  const user = getAuthenticatedUserFromRequest(request)
  if(user.role !== role) {
    throw new Error('Not authourazed')
  }

}
} 