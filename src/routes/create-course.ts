import type {FastifyPluginAsyncZod} from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'
import { checkRequestJWT } from './hooks/check-request-jwt.ts'
import { checkUserRole } from './hooks/check-user-role.ts'

export const createCourseRoute: FastifyPluginAsyncZod = async(server) => {
  server.post('/courses', {
  preHandler: [
    checkRequestJWT,
    checkUserRole('manager'),
  ],
  schema: {
    tags: ['courses'],
    summary: 'This route creates a courses',
    description: 'This route is used to create a new course on database',
    body: z.object({
      title: z.string().min(5, 'Title needs to have at least 5 caracters'),
      description: z.string().optional()
    }),
    response: {
      201: z.object({ courseId: z.uuid()}).describe('Course created sucessfuly')
    }
  }
}, async (request, reply)=> {


  const courseTitle = request.body.title


  const result = await db.insert(courses).values({
    title: request.body.title,
    description: request.body.description
  }).returning()

  return reply.status(201).send({courseId: result[0].id })
})
}