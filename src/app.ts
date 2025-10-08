import fastify from "fastify"
import {serializerCompiler, validatorCompiler, type ZodTypeProvider, jsonSchemaTransform} from 'fastify-type-provider-zod'
import {fastifySwagger} from '@fastify/swagger'
import { getCoursesRoute } from "./routes/get-courses.ts"
import { getCourseByIdRoute } from "./routes/get-course-by-id.ts"
import { createCourseRoute } from "./routes/create-course.ts"

import scalarAPIRefence from '@scalar/fastify-api-reference'
import { loginRoute } from "./routes/login.ts"


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

server.register(scalarAPIRefence, {
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
// Route to login the user
server.register(loginRoute)

export { server }