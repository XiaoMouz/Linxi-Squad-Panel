import { z } from "zod";
import { create } from "~/server/model/user";

export default defineEventHandler(async (event) => {
  // https://nuxt.com/docs/api/configuration-nuxt-config#runtimeconfig
  const body = z
    .object({
      email: z.string().email().optional(),
      password: z.string(),
      username: z.string().min(2, { message: "用户名至少2个字符" }),
      token: z.string(),
      picture: z.string().optional(),
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
      const res = await create(
        body.data.email,
        hashed,
        body.data.username,
        new Date(),
        new Date(),
        body.data.picture
      );
    } catch (error) {
      log2backend(
        event.path,
        "maybe user or email already registered.",
        "error",
        error
      );
      throw createError({
        statusMessage: "user or email already registered.",
        statusCode: 409,
      });
    }
  }
  log2backend(event.path, `user [${body.data.username}] created`, "info");
  setResponseStatus(event, 201);
  return { message: "user created" };
});
