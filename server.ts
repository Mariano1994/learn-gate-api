import fastify from "fastify"
import crypto from 'node:crypto'


const server = fastify()


const courses = [
  {id: crypto.randomUUID(), title: 'React Js'},
  {id: crypto.randomUUID(), title: 'React Native'},
  {id: crypto.randomUUID(), title: 'Node Js'},
]

server.get('/courses', ()=> {
  return {courses}
})

server.post('/courses', (request, reply)=> {

  type Body = {
    title: string
  }

  const courseId = crypto.randomUUID();
  const body = request.body as Body
  const courseTitle = body.title
  courses.push({id: courseId, title: courseTitle})

  if(!courseTitle) {
    return reply.status(400).send('Titilo obrigatorio')
  }

  return reply.status(201).send({courseId})
})

server.get('/courses/:id', (request, replay) => {

type Parms = {
  id: string
}
const {id} = request.params as Parms

const course = courses.find(course => course.id === id)

if(course) {
  return {course}
}

return replay.status(404).send('Course not found')
})

server.delete('/courses/:id', (request, replay) => {
  type Params = {
    id: string
  }

  const {id} = request.params as Params
  
  const filteredCourses = courses.filter(course => course.id !== id)

  if(filteredCourses) {
    return {filteredCourses}
  }

  return replay.status(404).send('Couser not found')

})




server.listen({port: 3333}).then(() => {
  console.log('Server is runnimg ')
})

