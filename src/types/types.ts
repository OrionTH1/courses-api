import z from "zod";
import { courseSchema, orderByCourseSchema } from "../schemas";

export type CourseSchemaType = z.Infer<typeof courseSchema>;
export type OrderByCourseSchemaType = z.Infer<typeof orderByCourseSchema>;
