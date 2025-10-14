import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from "./schema";

export const db = drizzle(process.env.DATABASE_URL || "", {
  schema,
  logger: process.env.NODE_ENV === "development",
  casing: "snake_case",
});
