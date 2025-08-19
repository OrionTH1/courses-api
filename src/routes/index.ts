import { FastifyPluginAsync } from "fastify";
import { coursesRoute } from "./courses/";
import { authRoute } from "./auth";
import { userRoute } from "./user";

export const routes: FastifyPluginAsync = async (server, opts) => {
  server.register(coursesRoute, { prefix: "/courses" });
  server.register(authRoute, { prefix: "/auth" });
  server.register(userRoute, { prefix: "/user" });
};
