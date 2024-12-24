import { initTRPC } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import prisma from "../../prisma/db";
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<typeof createContextInner>().create();
// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
/* eslint-disable @typescript-eslint/no-unused-vars */
export async function createContextInner(_opts?: CreateNextContextOptions) {
  return {
    prisma,
  };
}
/* eslint-enable @typescript-eslint/no-unused-vars */
