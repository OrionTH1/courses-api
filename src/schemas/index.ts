import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().nullable(),
});

export const orderByCourseSchema = z.enum(["title"]);
