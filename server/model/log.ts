import prisma from "../db/prisma";

export async function createLog(
  from: string,
  location: string,
  message: string,
  type: string,
  stack: any,
  createdAt: Date
) {
  let log = await prisma.logs.create({
    data: {
      from,
      location,
      message,
      type,
      stack: JSON.stringify(stack),
      createdAt,
    },
  });
  return log;
}
