//Rita82@yahoo.com
import type {FastifyPluginAsyncZod} from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../database/client.ts'
import { courses, users } from '../database/schema.ts'
import { eq } from 'drizzle-orm'
import { verify } from 'argon2'

export const loginRoute: FastifyPluginAsyncZod = async(server) => {
  server.post('/sessions', {
  schema: {
    tags: ['auth'],
    summary: 'Route to login the user',
    description: 'This route is to login the user',
    body: z.object({
      email: z.email(),
      password: z.string()
    }),
    // response: {
    //   201: z.object({ courseId: z.uuid()}).describe('Course created sucessfuly')
    // }
  }
}, async (request, reply)=> {

  const {email, password} = request.body



  const result = await db.select()
  .from(users)
  .where(eq(users.email, email))


  if(result.length === 0) {
    return reply.status(400).send({message: 'Credencias invalidas'})
  }

const user = result[0]
const doesPasswordMacth = await verify(user.password, password)

if(!doesPasswordMacth) {
   return reply.status(400).send({message: "Credencias invalidas"})
}

  return reply.status(200).send({message: 'ok' })
})
}