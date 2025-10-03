import { db } from "./client.ts";
import { courses, enrollments, users } from "./schema.ts";
import {fakerPT_PT as faker } from "@faker-js/faker";

async function seed() {
  const usersInserted = await db.insert(users).values([
      {
        name:  faker.person.fullName(),
        email: faker.internet.email()
      },      
      {
        name:  faker.person.fullName(),
        email: faker.internet.email()
      },
      {
        name:  faker.person.fullName(),
        email: faker.internet.email()
      },
      {
        name:  faker.person.fullName(),
        email: faker.internet.email()
      },
      {
        name:  faker.person.fullName(),
        email: faker.internet.email()
      },
      {
        name:  faker.person.fullName(),
        email: faker.internet.email()
      },
      {
        name:  faker.person.fullName(),
        email: faker.internet.email()
      },
      {
        name:  faker.person.fullName(),
        email: faker.internet.email()
      },
      {
        name:  faker.person.fullName(),
        email: faker.internet.email()
      },
 
]).returning()

const coursesInserted = await db.insert(courses).values([
  {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph()
  },

  {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph()
  },
  {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph()
  },
  {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph()
  },
  {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph()
  },
  {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph()
  },

]).returning()

const enrollmentsInserted = await db.insert(enrollments).values([
  {
    userId: usersInserted[0].id,
    courseId: coursesInserted[0].id
  },
  {
    userId: usersInserted[1].id,
    courseId: coursesInserted[1].id
  },
  {
    userId: usersInserted[1].id,
    courseId: coursesInserted[0].id
  },
  {
    userId: usersInserted[2].id,
    courseId: coursesInserted[1].id
  },
  {
    userId: usersInserted[2].id,
    courseId: coursesInserted[0].id
  },
  {
    userId: usersInserted[3].id,
    courseId: coursesInserted[1].id
  },
  {
    userId: usersInserted[3].id,
    courseId: coursesInserted[0].id
  },
  {
    userId: usersInserted[4].id,
    courseId: coursesInserted[1].id
  },
  {
    userId: usersInserted[4].id,
    courseId: coursesInserted[0].id
  },
  {
    userId: usersInserted[5].id,
    courseId: coursesInserted[1].id
  },
  {
    userId: usersInserted[5].id,
    courseId: coursesInserted[0].id
  },

  
]).returning()
}

seed()