import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getAllCourses } from "../../services/courses";

import { z } from "zod";
import { courseDTO, orderByCourseSchema, returnCourseDTO } from "../../schemas";

export const getAllCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/",
    {
      schema: {
        summary: "Get all courses",
        description: "Retrieve a comprehensive list of all available courses.",
        querystring: z.object({
          search: z.string().optional(),
          orderBy: orderByCourseSchema.default("title"),
          page: z.coerce.number().optional().default(1),
        }),
        response: {
          200: z
            .object({
              courses: z.array(returnCourseDTO),
              total: z.number(),
            })
            .describe("Response payload containing a list of courses."),
        },
        tags: ["Courses"],
      },
    },
    async (request, reply) => {
      const { search, orderBy, page } = request.query;
      const result = await getAllCourses(orderBy, page, search);

      return reply.send({ courses: result.course, total: result.total });
    },
  );
};
