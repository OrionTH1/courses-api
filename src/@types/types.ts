import z from "zod";
import { courseDTO, orderByCourseSchema } from "../schemas";
import { users } from "../database/schema";

export type CourseSchemaType = z.Infer<typeof courseDTO>;
export type OrderByCourseSchemaType = z.Infer<typeof orderByCourseSchema>;

export type Role = typeof users.$inferSelect.role;
