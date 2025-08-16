import z from "zod";
import { courseDTO, orderByCourseSchema } from "../schemas";

export type CourseSchemaType = z.Infer<typeof courseDTO>;
export type OrderByCourseSchemaType = z.Infer<typeof orderByCourseSchema>;
