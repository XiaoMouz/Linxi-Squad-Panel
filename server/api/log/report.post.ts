import z from "zod";
import mongoose from "mongoose";
import useLog from "~/server/utils/log";
export default defineEventHandler(async (event) => {
  const body = z
    .object({
      location: z.string(),
      message: z.string(),
      type: z.string(),
      stack: z.any(),
    })
    .safeParse(await readBody(event));

  if (!body.success) {
    console.log(body.error);
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
    });
  }
  const { message, type, stack } = body.data;
  useLog().log("report from client:" + message, type, stack);
  await mongoose.connection.db.collection("logs").insertOne({
    from: "client",
    location,
    message,
    type,
    stack: JSON.stringify(stack),
    createdAt: new Date(),
  });

  return { message: "log created" };
});
