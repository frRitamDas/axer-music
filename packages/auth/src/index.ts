import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";

import { db } from "@infinitunes/db";
import * as schema from "@infinitunes/db/schema/auth";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema: schema }),
  trustedOrigins: [process.env.CORS_ORIGIN || "", "infinitunes://", "exp://"],
  emailAndPassword: { enabled: true },
  plugins: [reactStartCookies(), expo()],
});
