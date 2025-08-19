import { it, expect } from "vitest";
import request from "supertest";
import { server as fastify } from "../../app";
import { makeUser } from "../../tests/factories/make-user";

it("should create a session", async () => {
  await fastify.ready();

  const { user, passwordBeforeHash } = await makeUser();

  const response = await request(fastify.server)
    .post("/auth/sessions")
    .set("Content-Type", "application/json")
    .send({ email: user.email, password: passwordBeforeHash });

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    token: expect.any(String),
  });
});
