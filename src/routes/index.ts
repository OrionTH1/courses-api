import { FastifyPluginAsync } from "fastify";
import { coursesRoute } from "./courses/";

export const routes: FastifyPluginAsync = async (server, opts) => {
  server.register(coursesRoute, { prefix: "/courses" });
};
