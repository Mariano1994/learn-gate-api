import type {FastifyPluginAsyncZod} from 'fastify-type-provider-zod'
import { db } from '../database/client.ts'
import { courses, enrollments } from '../database/schema.ts'
import z from 'zod'
import { ilike, asc, eq, count } from 'drizzle-orm'

export const getCoursesRoute : FastifyPluginAsyncZod = async (server) => {
server.get('/courses', {
  schema: {
     tags: ['courses'],
    summary: 'This route get all the courses from the database',
    description: 'This route is used to get all course on database, it returns all the course as an array(list) of courses',
    querystring: z.object({
        search: z.string().optional(),
        orderBy: z.enum(['id','title']).optional().default('id'),
        page: z.coerce.number().optional().default(1)
    }),
    response: {
      200: z.object({
        courses:  z.array(z.object({
        id: z.uuid(),
        title: z.string(),
        enrollments: z.number()
      })),
      total: z.number()
    })
  }
  }
}, async (request, replay)=> {

  const {search, orderBy, page} = request.query

  const [result, totalResult] = await Promise.all([
    db.select({
  id: courses.id,
  title: courses.title,  
  enrollments: count(enrollments.id)
}).from(courses)
.leftJoin(enrollments, eq(courses.id, enrollments.courseId))
.orderBy(orderBy === 'title' ? courses.title : courses.id)
.offset((page - 1) * 2)
.limit(10)
.groupBy(courses.id)
.where(
  search ? ilike(courses.title, `%${search}%`) : undefined
), 

db.select({ count: count() }).from(courses).where(search ? ilike(courses.title, `%${search}%`) : undefined)

  ])

  const total = totalResult[0]?.count || 0
  return replay.send({courses: result, total})
})
}