import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { getAllCoursesRoute } from "./get-courses";
import { getCourseByIdRoute } from "./get-course-by-id";
import { createCourseRoute } from "./create-course";
import { updateCourseRoute } from "./update-course";

export const coursesRoute: FastifyPluginAsync = async (server, opts) => {
  server.register(getAllCoursesRoute);
  server.register(getCourseByIdRoute);
  server.register(createCourseRoute);
  server.register(updateCourseRoute);
};
