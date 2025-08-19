import fastify from "fastify";

export type JWTPayload = {
  sub: string;
  role: "student" | "manager";
};

declare module "fastify" {
  export interface FastifyRequest {
    user?: JWTPayload;
  }
}
