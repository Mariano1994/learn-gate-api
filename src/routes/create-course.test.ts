import {test, expect} from 'vitest'
import request from 'supertest'
import { server } from '../app.ts'


test('It should be able to create a course', async ()=> {
await server.ready()
  const response = await request(server.server)
  .post('/courses')
  .set('Content-Type', 'application/json')
  .send({
    title: 'DAS Course',
    description: 'This the ultimate aws course, that will take you from zero to hero'
  })

  console.log(response.body)
})