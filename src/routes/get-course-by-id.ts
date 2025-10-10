import type {FastifyPluginAsyncZod} from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'
import { eq } from 'drizzle-orm'
import { checkRequestJWT } from './hooks/check-request-jwt.ts'

export const getCourseByIdRoute: FastifyPluginAsyncZod = async(server) => {
  server.get('/courses/:id',{
    preHandler:[
      checkRequestJWT
    ],
    schema: {
    tags: ['courses'],
    summary: 'This route get a course by id from the database',
    description: 'This route is used to get an individual course on database, it receive an id and returns a course with the id especified',
  params: z.object({
    id: z.uuid()
  }),
  response: {
    200: z.object({
      course: z.object({
        id: z.uuid(),
        title: z.string(),
        description: z.string().nullable()
      })
    }),

    404: z.string()
  }

}}, async (request, replay) => {


const {id} = request.params

const course = await db.select().from(courses).where(eq(courses.id, id))
if(course.length > 0) {
  return {course: course[0]}
}

return replay.status(404).send('Course not found')
})

}