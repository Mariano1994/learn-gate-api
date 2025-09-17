const fastify = require('fastify')
const crypto = require('crypto')
const server = fastify()


const courses = [
  {id: crypto.randomUUID(), title: 'React Js'},
  {id: crypto.randomUUID(), title: 'React Native'},
  {id: crypto.randomUUID(), title: 'Node Js'},
]

server.get('/courses', ()=> {
  return courses
})

server.post('/courses', (request, reply)=> {
  courses.push({id: crypto.randomUUID(), title: 'Devops'})

  return reply.code('201').send('ok')
})

server.listen({port: 3333}).then(() => {
  console.log('Server is runnimg ')
})