import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../@types/fastify";
import { getAuthenticatedUser } from "../utils/get-authenticated-user";

export const checkUserRole = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const user = getAuthenticatedUser(request);

  if (user.role !== "manager") {
    return reply.status(401).send();
  }
};
