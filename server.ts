import fastify from "fastify"
import { db } from "./src/database/client.ts"
import { courses } from "./src/database/schema.ts"
import {eq} from 'drizzle-orm'


const server = fastify()


 // Get all courses route
server.get('/courses', async (request, replay)=> {
const result  = await db.select({
  id: courses.id,
  title: courses.title  
}).from(courses)
  return {courses: result}
})

// Get an individual course, according to course id
server.get('/courses/:id', async (request, replay) => {

type Parms = {
  id: string
}
const {id} = request.params as Parms

const course = await db.select().from(courses).where(eq(courses.id, id))
if(course.length > 0) {
  return {course: course[0]}
}

return replay.status(404).send('Course not found')
})



// Create a new courser
server.post('/courses', async (request, reply)=> {
  type Body = {
    title: string,
    description?: string
  }

  const body = request.body as Body
  const courseTitle = body.title


  if(!courseTitle) {
    return reply.status(400).send('Titilo obrigatorio')
  }

  const result = await db.insert(courses).values({
    title: body.title,
    description: body.description
  }).returning()

  return reply.status(201).send({courseId: result[0].id })
})



// server.delete('/courses/:id', (request, replay) => {
//   type Params = {
//     id: string
//   }

//   const {id} = request.params as Params
  
//   const filteredCourses = courses.filter(course => course.id !== id)

//   if(filteredCourses) {
//     return {filteredCourses}
//   }

//   return replay.status(404).send('Couser not found')

// })




server.listen({port: 3333}).then(() => {
  console.log('Server is runnimg ')
})

