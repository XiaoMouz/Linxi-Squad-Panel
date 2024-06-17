import z from "zod";
import { createLog } from "~/server/model/log";

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
  const { message, type, stack, location } = body.data;
  useLog().log("report from client:" + message, type, stack);
  createLog("client", location, message, type, stack, new Date());

  return { message: "log created" };
});
