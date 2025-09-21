import fastify from "fastify"
import { db } from "./src/database/client.ts"
import { courses } from "./src/database/schema.ts"
import {serializerCompiler, validatorCompiler, type ZodTypeProvider, jsonSchemaTransform} from 'fastify-type-provider-zod'
import {eq} from 'drizzle-orm'
import {z} from 'zod'
import {fastifySwagger} from '@fastify/swagger'
import {fastifySwaggerUi} from '@fastify/swagger-ui'


const server = fastify().withTypeProvider<ZodTypeProvider>()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Learn-gate-api',
      version: "1.0.0"

    }
  },
  transform: jsonSchemaTransform
})

server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
})

 // Get all courses route
server.get('/courses', async (request, replay)=> {
const result  = await db.select({
  id: courses.id,
  title: courses.title  
}).from(courses)
  return {courses: result}
})


// Get an individual course, according to course id
server.get('/courses/:id',{schema: {
  params: z.object({
    id: z.uuid()
  })
}}, async (request, replay) => {


const {id} = request.params

const course = await db.select().from(courses).where(eq(courses.id, id))
if(course.length > 0) {
  return {course: course[0]}
}

return replay.status(404).send('Course not found')
})


// Create a new courser
server.post('/courses', {
  schema: {
    body: z.object({
      title: z.string().min(5, 'Title needs to have at least 5 caracters'),
      description: z.string().optional()
    })
  }
}, async (request, reply)=> {


  const courseTitle = request.body.title


 

  const result = await db.insert(courses).values({
    title: request.body.title,
    description: request.body.description
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

