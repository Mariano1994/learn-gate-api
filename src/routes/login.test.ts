import {test, expect} from 'vitest'
import request from 'supertest'
import { server } from '../app.ts'
import { makeUser } from '../tests/factories/make-user.ts'



test('It should be able to create a course', async ()=> {
await server.ready()

const {user, passwordBeforeHas} = await makeUser()

  const response = await request(server.server)
  .post('/sessions')
  .set('Content-Type', 'application/json')
  .send({
    email: user.email,
    password: passwordBeforeHas
  })


  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    message: 'ok'
  })
})