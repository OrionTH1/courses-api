import { fakerPT_BR } from "@faker-js/faker";
import { db } from "../../database/client";
import { courses } from "../../database/schema";

export async function makeCourse() {
  const result = await db
    .insert(courses)
    .values({
      title: fakerPT_BR.lorem.words(3),
      description: fakerPT_BR.lorem.paragraph(),
    })
    .returning();

  return result[0];
}
