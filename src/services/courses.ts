import { and, asc, count, eq, ilike, SQL } from "drizzle-orm";
import { db } from "../database/client";
import { courses, enrollments } from "../database/schema";
import { CourseSchemaType, OrderByCourseSchemaType } from "../types/types";

export const getAllCourses = async (
  orderBy: OrderByCourseSchemaType,
  page: number,
  search?: string,
) => {
  const limit = 20;

  const conditions: SQL[] = [];

  if (search) {
    conditions.push(ilike(courses.title, `%${search}%`));
  }
  const [result, total] = await Promise.all([
    db
      .select({
        id: courses.id,
        title: courses.title,
        description: courses.title,
        enrollments: count(enrollments.id),
      })
      .from(courses)
      .leftJoin(enrollments, eq(enrollments.courseId, courses.id))
      .where(and(...conditions))
      .orderBy(asc(courses[orderBy]))
      .limit(limit)
      .offset((page - 1) * limit)
      .groupBy(courses.id),
    db.$count(courses, and(...conditions)),
  ]);

  return { course: result, total };
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
