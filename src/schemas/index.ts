import { z } from "zod";

export const courseDTO = z.object({
  title: z.string().min(2).max(100),
  description: z.string().nullable(),
});

export const returnCourseDTO = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  enrollments: z.number(),
});

export const orderByCourseSchema = z.enum(["title"]);
