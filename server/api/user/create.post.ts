import { z } from "zod";
import { create } from "~/server/model/user";

export default defineEventHandler(async (event) => {
  // https://nuxt.com/docs/api/configuration-nuxt-config#runtimeconfig
  const body = z
    .object({
      email: z.string().email().optional(),
      password: z.string(),
      username: z.string().min(2, { message: "用户名至少2个字符" }),
      role: z.string().optional(),
      token: z.string(),
    })
    .safeParse(await readBody(event));
  if (!body.success) {
    setResponseStatus(event, 400);
    throw createError({
      statusCode: 400,
      message: body.error.message,
    });
  }
  const pwd = useRuntimeConfig(event).password;
  if (body.data.token === pwd) {
    const hashed = hash(body.data.password);
    try {
      create(
        body.data.email,
        hashed,
        body.data.username,
        new Date(),
        new Date()
      );
    } catch (error) {
      console.log(error);
      throw createError({
        statusMessage: "user or email already registered.",
        statusCode: 409,
      });
    }
  }
  setResponseStatus(event, 201);
  return { message: "user created" };
});
