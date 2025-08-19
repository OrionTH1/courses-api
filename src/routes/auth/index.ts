import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { loginRoute } from "./login";

export const authRoute: FastifyPluginAsync = async (server, opts) => {
  server.register(loginRoute);
};
