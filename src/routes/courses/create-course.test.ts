import { it, expect } from "vitest";
import request from "supertest";
import { server as fastify } from "../../app";
import { faker } from "@faker-js/faker";

it("should create a course", async () => {
  await fastify.ready();
  const course = {
    title: faker.lorem.words(4),
    description: "This is a new course description.",
  };

  const response = await request(fastify.server)
    .post("/courses")
    .set("Content-Type", "application/json")
    .send(course);

  expect(response.status).toEqual(201);
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: course.title,
      description: course.description,
    },
  });
});
