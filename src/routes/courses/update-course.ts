import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getCourseById, updateCourse } from "../../services/courses";
import { z } from "zod";
import { courseSchema } from "../../schemas";

export const updateCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.put(
    "/:id",
    {
      schema: {
        summary: "Update an existing course",
        description:
          "Updates the title and/or description of a course identified by its ID. Returns the updated course details.",
        tags: ["Courses"],
        params: z.object({
          id: z.uuid(),
        }),
        body: courseSchema,
        response: {
          200: z
            .object({
              course: z.object({
                id: z.uuid(),
                ...courseSchema.shape,
              }),
            })
            .describe("Course successfully updated."),
          404: z.object({}).describe("Course not found."),
          400: z.object({}).describe("Bad input."),
        },
      },
    },
    async (request, reply) => {
      const { id: courseId } = request.params;
      const { title, description } = request.body;

      const courseDataToUpdate = { title, description };

      const courseEdited = await updateCourse(courseId, courseDataToUpdate);

      if (!courseEdited) {
        reply.status(404).send();
        return;
      }

      reply.status(200).send({ course: courseEdited });
    },
  );
};
