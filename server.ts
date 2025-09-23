import fastify from "fastify"
import {serializerCompiler, validatorCompiler, type ZodTypeProvider, jsonSchemaTransform} from 'fastify-type-provider-zod'
import {fastifySwagger} from '@fastify/swagger'
import { getCoursesRoute } from "./src/routes/get-courses.ts"
import { getCourseByIdRoute } from "./src/routes/get-course-by-id.ts"
import { createCourseRoute } from "./src/routes/create-course.ts"

import scalaAPIRefence from '@scalar/fastify-api-reference'


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

server.register(scalaAPIRefence, {
  routePrefix: '/docs',
  configuration: {
    theme: 'kepler'
  }
})


// Create a new courser
server.register(createCourseRoute)
 // Get all courses route
server.register(getCoursesRoute)
// Get an individual course, according to course id
server.register(getCourseByIdRoute)




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
  console.log('Server is running')
})

