import { it, expect, describe, beforeEach } from "vitest";
import request from "supertest";
import { server as fastify } from "../../app";
import { faker } from "@faker-js/faker";
import { makeAuthenticatedUser } from "../../tests/factories/make-user";

const courseMock = {
  title: faker.lorem.words(4),
  description: "This is a new course description.",
};

describe("Create Course", () => {
  beforeEach(async () => {
    await fastify.ready();
  });

  it("should create a course", async () => {
    const { token } = await makeAuthenticatedUser("manager");

    const response = await request(fastify.server)
      .post("/courses")
      .set("Content-Type", "application/json")
      .set("Authorization", token)
      .send(courseMock);

    expect(response.status).toEqual(201);
    expect(response.body).toEqual({
      course: {
        id: expect.any(String),
        title: courseMock.title,
        description: courseMock.description,
      },
    });
  });

  it("should return 401 when is not authenticated", async () => {
    const response = await request(fastify.server)
      .post("/courses")
      .set("Content-Type", "application/json")
      .send(courseMock);

    expect(response.status).toEqual(401);
  });
});
