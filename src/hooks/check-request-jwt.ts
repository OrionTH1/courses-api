import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../@types/fastify";

export const checkRequestJwt = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const token = request.headers.authorization;

  if (!token) {
    return reply.status(401).send();
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET env is required");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    request.user = payload;
  } catch (error) {
    return reply.status(401).send();
  }
};
