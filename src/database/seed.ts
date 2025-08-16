import { title } from "process";
import { db } from "./client";
import { courses, enrollments, users } from "./schema";
import { fakerPT_BR } from "@faker-js/faker";

async function seed() {
  const coursesInserted = await seedCourses();
  const usersInserted = await seedUsers();

  const enrollmentsToInsert = usersInserted.map((user) => ({
    courseId:
      coursesInserted[Math.floor(Math.random() * usersInserted.length)].id,
    userId: user.id,
  }));

  await db.insert(enrollments).values(enrollmentsToInsert);
}

async function seedCourses() {
  const coursesToInsert = Array.from({ length: 20 }, () => ({
    title: fakerPT_BR.lorem.words(3),
    description: fakerPT_BR.lorem.paragraph(),
  }));

  return await db.insert(courses).values(coursesToInsert).returning();
}

async function seedUsers() {
  const usersToInsert = Array.from({ length: 10 }, () => ({
    name: fakerPT_BR.person.fullName(),
    email: fakerPT_BR.internet.email(),
  }));

  return await db.insert(users).values(usersToInsert).returning();
}

seed();
