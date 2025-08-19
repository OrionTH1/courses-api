import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createCourse } from "../../services/courses";
import { z } from "zod";
import { courseDTO } from "../../schemas";
import { checkRequestJwt } from "../../hooks/check-request-jwt";
import { checkUserRole } from "../../hooks/check-user-role";

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/",
    {
      preHandler: [checkRequestJwt, checkUserRole],
      schema: {
        tags: ["Courses"],
        summary: "Create a new course",
        description: "Create a new course with the given title and description",
        body: courseDTO,
        response: {
          201: z
            .object({
              course: z.object({
                id: z.uuid(),
                ...courseDTO.shape,
              }),
            })
            .describe("Course created successfully"),
          401: z.object({}).describe("Unauthorized"),
        },
      },
    },
    async (request, reply) => {
      const { title, description } = request.body;

      const result = await createCourse({ title, description });
      return reply.status(201).send({ course: result });
    },
  );
};
