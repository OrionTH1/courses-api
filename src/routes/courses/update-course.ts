import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getCourseById, updateCourse } from "../../services/courses";
import { z } from "zod";
import { courseDTO } from "../../schemas";
import { checkRequestJwt } from "../../hooks/check-request-jwt";
import { checkUserRole } from "../../hooks/check-user-role";

export const updateCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.put(
    "/:id",
    {
      schema: {
        preHandler: [checkRequestJwt, checkUserRole],
        summary: "Update an existing course",
        description:
          "Updates the title and/or description of a course identified by its ID. Returns the updated course details.",
        tags: ["Courses"],
        params: z.object({
          id: z.uuid(),
        }),
        body: courseDTO,
        response: {
          200: z
            .object({
              course: z.object({
                id: z.uuid(),
                ...courseDTO.shape,
              }),
            })
            .describe("Course successfully updated."),
          404: z.object({}).describe("Course not found."),
          401: z.object({}).describe("Unauthorized"),
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
