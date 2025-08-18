import { it, expect } from "vitest";
import request from "supertest";
import { server as fastify } from "../../app";
import { faker } from "@faker-js/faker";
import { makeCourse } from "../../tests/factories/make-courses";

it("should get a course by id", async () => {
  await fastify.ready();

  const course = await makeCourse();

  const response = await request(fastify.server).get(`/courses/${course.id}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    courses: {
      id: expect.any(String),
      title: course.title,
      description: course.description,
    },
  });
});

it("should return 404 when course does not exist", async () => {
  await fastify.ready();

  const response = await request(fastify.server).get(
    "/courses/7061f7e9-fc66-4809-bbc3-73d73ad976dc",
  );

  expect(response.status).toEqual(404);
});
