import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export const userRoute: FastifyPluginAsync = async (server, opts) => {
  // server.register(getAllCoursesRoute);
};
