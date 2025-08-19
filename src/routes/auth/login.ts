import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { verifyCredentials, createToken } from "../../services/auth";

export const loginRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/sessions",
    {
      schema: {
        tags: ["Auth"],
        summary: "",
        description: "",
        body: z.object({
          email: z.email(),
          password: z.string(),
        }),
        response: {
          200: z.object({ token: z.string() }),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;

      const user = await verifyCredentials(email, password);

      if (!user) {
        return reply
          .status(400)
          .send({ message: "Email or password is incorrect" });
      }

      const token = createToken(user);

      return reply.status(200).send({ token });
    },
  );
};
