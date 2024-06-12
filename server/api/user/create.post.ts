import { z } from "zod";
import mongoose from "mongoose";

export default defineEventHandler((event) => {
  // https://nuxt.com/docs/api/configuration-nuxt-config#runtimeconfig
  const body = z
    .object({
      email: z.string().email(),
      password: z.string(),
      token: z.string(),
    })
    .safeParse(readBody(event));
  if (!body.success) {
    setResponseStatus(event, 400);
    throw createError({
      statusCode: 400,
      statusMessage: body.error.message,
    });
  }
  const pwd = useRuntimeConfig(event).password;
  if (body.data.token === pwd) {

  }
  return "none";
});
