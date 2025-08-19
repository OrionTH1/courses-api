import { fakerPT_BR } from "@faker-js/faker";
import { db } from "../../database/client";
import { users } from "../../database/schema";
import { hash } from "argon2";
import { createToken } from "../../services/auth";
import { Role } from "../../@types/types";

export async function makeUser(role?: Role) {
  const passwordBeforeHash = fakerPT_BR.internet.password();
  const result = await db
    .insert(users)
    .values({
      name: fakerPT_BR.person.fullName(),
      email: fakerPT_BR.internet.email(),
      password: await hash(passwordBeforeHash),
      role: role || undefined,
    })
    .returning();

  return { user: result[0], passwordBeforeHash };
}

export async function makeAuthenticatedUser(role: Role) {
  const { user } = await makeUser(role);

  const token = createToken(user);

  return { user, token };
}
