import { it, expect, describe, beforeEach } from "vitest";
import request from "supertest";
import { server as fastify } from "../../app";
import { faker } from "@faker-js/faker";
import { makeCourse } from "../../tests/factories/make-courses";
import { makeAuthenticatedUser } from "../../tests/factories/make-user";

describe("Get Courses", () => {
  beforeEach(async () => {
    await fastify.ready();
  });

  it("should get courses", async () => {
    const { token } = await makeAuthenticatedUser("student");
    await makeCourse();

    const response = await request(fastify.server)
      .get("/courses")
      .set("Authorization", token);

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

  it("should return 401 when user is not authenticated", async () => {
    await makeCourse();

    const response = await request(fastify.server).get("/courses");

    expect(response.status).toEqual(401);
  });
});
