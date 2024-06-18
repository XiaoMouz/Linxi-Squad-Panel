import { z } from "zod";
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
  
  
});
