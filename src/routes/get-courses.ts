import type {FastifyPluginAsyncZod} from 'fastify-type-provider-zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'
import z from 'zod'
import { ilike } from 'drizzle-orm'

export const getCoursesRoute : FastifyPluginAsyncZod = async (server) => {
server.get('/courses', {
  schema: {
     tags: ['courses'],
    summary: 'This route get all the courses from the database',
    description: 'This route is used to get all course on database, it returns all the course as an array(list) of courses',
    querystring: z.object({
    search: z.string().optional(),
    }),
    response: {
      200: z.object({
        courses:  z.array(z.object({
        id: z.uuid(),
        title: z.string()
      }))
      })
    }
  }
}, async (request, replay)=> {

  const {search} = request.query
const result  = await db.select({
  id: courses.id,
  title: courses.title  
}).from(courses).where(
  search ? ilike(courses.title, `%${search}%`) : undefined
)




  return replay.send({courses: result})
})
}