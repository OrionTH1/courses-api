import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createCourse } from "../../services/courses";
import { z } from "zod";
import { courseSchema } from "../../schemas";

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/",
    {
      schema: {
        tags: ["Courses"],
        summary: "Create a new course",
        description: "Create a new course with the given title and description",
        body: courseSchema,
        response: {
          201: z
            .object({
              course: z.object({
                id: z.uuid(),
                ...courseSchema.shape,
              }),
            })
            .describe("Course created successfully"),
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
