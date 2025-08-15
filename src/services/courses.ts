import { resourceUsage } from "process";
import { db } from "../database/client";
import { courses } from "../database/schema";
import { asc, eq, ilike } from "drizzle-orm";
import z from "zod";
import { CourseSchemaType, OrderByCourseSchemaType } from "../types/types";

export const getAllCourses = async (
  orderBy: OrderByCourseSchemaType,
  page: number,
  search?: string,
) => {
  const limit = 20;

  const result = await db
    .select()
    .from(courses)
    .where(search ? ilike(courses.title, `%${search}%`) : undefined)
    .orderBy(asc(courses[orderBy]))
    .limit(limit)
    .offset((page - 1) * limit);

  return result;
};

export const getCourseById = async (id: string) => {
  const courseFound = await db.select().from(courses).where(eq(courses.id, id));
  if (courseFound.length < 1) {
    return undefined;
  }

  return courseFound[0];
};

export const createCourse = async ({
  title,
  description,
}: CourseSchemaType) => {
  const courseToCreate = { title, description };

  const result = await db.insert(courses).values(courseToCreate).returning();

  return result[0];
};

export const updateCourse = async (
  courseId: string,
  data: CourseSchemaType,
) => {
  const result = await db
    .update(courses)
    .set(data)
    .where(eq(courses.id, courseId))
    .returning();

  if (result.length === 0) {
    return undefined;
  }

  return result[0];
};
