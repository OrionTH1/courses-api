import { it, expect } from "vitest";
import request from "supertest";
import { server as fastify } from "../../app";
import { faker } from "@faker-js/faker";
import { makeCourse } from "../../tests/factories/make-courses";

it("should get courses", async () => {
  await fastify.ready();

  await makeCourse();

  const response = await request(fastify.server).get("/courses");

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    courses: expect.arrayContaining([
      {
        id: expect.any(String),
        title: expect.any(String),
        description: expect.any(String),
        enrollments: expect.any(Number),
      },
    ]),
    total: expect.toSatisfy((total) => total > 0),
  });
  expect(response.body.total).toBeGreaterThan(0);
  expect(response.body.courses.length).toBeGreaterThan(0);
});
