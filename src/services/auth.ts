import { eq } from "drizzle-orm";
import { db } from "../database/client";
import { users } from "../database/schema";
import { verify } from "argon2";
import jwt from "jsonwebtoken";

export const verifyCredentials = async (email: string, password: string) => {
  const result = await db.select().from(users).where(eq(users.email, email));

  if (!result.length) {
    return undefined;
  }

  const user = result[0];

  const doesPasswordMatch = await verify(user.password, password);

  if (!doesPasswordMatch) {
    return undefined;
  }

  return user;
};

export const createToken = (user: typeof users.$inferSelect) => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET env is required");

  const token = jwt.sign(
    { sub: user.id, role: user.role },
    process.env.JWT_SECRET,
  );

  return token;
};
