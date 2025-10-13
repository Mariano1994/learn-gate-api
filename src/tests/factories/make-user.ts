import { faker } from "@faker-js/faker";
import jwt from 'jsonwebtoken'
import { db } from "../../database/client.ts";
import {users } from "../../database/schema.ts";
import { hash } from "argon2";
import {randomUUID} from 'node:crypto'


type Role = 'manager' | 'student'

export async function makeUser(role? : Role ) {

  const passwordBeforeHas = randomUUID()

  const result = await db.insert(users).values({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: await hash(passwordBeforeHas),
    role,
    
  }).returning()

  return {
    user: result[0],
    passwordBeforeHas
  }
}


export async function makeAuthenticatedUser(role:Role) {

  const { user } = await makeUser(role)
  
  if(!process.env.JWT_SECRET) {
  throw new Error(' JWT_SECRET must be set')
}

const token = jwt.sign({
  sub: user.id, role: user.role
}, process.env.JWT_SECRET)

return {user, token}
}