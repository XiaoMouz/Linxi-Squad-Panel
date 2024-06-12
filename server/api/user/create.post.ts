import { z } from "zod";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  // https://nuxt.com/docs/api/configuration-nuxt-config#runtimeconfig
  const body = z
    .object({
      email: z.string().email(),
      password: z.string(),
      username: z.string().optional(),
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
      await mongoose.connection.db.collection("users").insertOne({
        email: body.data.email,
        password: hashed,
        username: body.data.username,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.log(error);
      throw createError({
        statusMessage: "user or email already registered.",
        statusCode: 409,
      });
    }
  }
  return { message: "user created" };
});
