import z from "zod";

export default defineEventHandler((event) => {
  const body = z
    .object({
      email: z.string().email(),
      password: z.string(),
    })
    .safeParse(readBody(event));

  if (!body.success) {
    setResponseStatus(event, 400);
    throw createError({
      statusCode: 400,
      statusMessage: body.error.message,
    });
  }
  
});
