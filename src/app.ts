import fastify from "fastify";
import { routes } from "./routes";
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";
import { fastifySwagger } from "@fastify/swagger";
import scalarApiReference from "@scalar/fastify-api-reference";

const server = fastify({
  logger: process.env.NODE_ENV === "development",
}).withTypeProvider<ZodTypeProvider>();

// Configure Zod
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

// Configure Swagger
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Desafio NodeJS",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

server.register(scalarApiReference, {
  routePrefix: "/docs",
});

// Register Routes
server.register(routes);

export { server };
