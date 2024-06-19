import { z } from "zod";
import { ensureAuth } from "~/server/utils/secret";

export default defineEventHandler(async (event) => {
  const body = await z
    .object({
      oldPassword: z.string().optional(),
      password: z.string().optional(),
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
  const user = await ensureAuth(event);
});
