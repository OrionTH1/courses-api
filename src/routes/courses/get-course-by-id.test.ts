import { it, expect, describe, beforeEach } from "vitest";
import request from "supertest";
import { server as fastify } from "../../app";
import { makeCourse } from "../../tests/factories/make-courses";
import { makeAuthenticatedUser } from "../../tests/factories/make-user";

describe("Get Course By Id", () => {
  beforeEach(async () => {
    await fastify.ready();
  });

  it("should get a course by id", async () => {
    const { token } = await makeAuthenticatedUser("student");
    const course = await makeCourse();

    const response = await request(fastify.server)
      .get(`/courses/${course.id}`)
      .set("Authorization", token);

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
    const { token } = await makeAuthenticatedUser("student");

    const response = await request(fastify.server)
      .get("/courses/7061f7e9-fc66-4809-bbc3-73d73ad976dc")
      .set("Authorization", token);

    expect(response.status).toEqual(404);
  });

  it("should return 401 when user is not authenticated", async () => {
    const response = await request(fastify.server).get(
      "/courses/7061f7e9-fc66-4809-bbc3-73d73ad976dc",
    );

    expect(response.status).toEqual(401);
  });
});
