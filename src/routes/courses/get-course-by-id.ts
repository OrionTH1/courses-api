import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getCourseById } from "../../services/courses";
import { z } from "zod";
import { courseDTO } from "../../schemas";

export const getCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/:id",
    {
      schema: {
        tags: ["Courses"],
        summary: "Get a course by ID",
        params: z.object({
          id: z.uuid(),
        }),
        response: {
          200: z
            .object({
              courses: z.object({
                id: z.uuid(),
                ...courseDTO.shape,
              }),
            })
            .describe("Course details"),
          404: z
            .object({
              message: z.string(),
            })
            .describe("Course not found"),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const courses = await getCourseById(id);

      if (!courses)
        return reply.status(404).send({ message: "Course not found" });

      return { courses };
    },
  );
};
