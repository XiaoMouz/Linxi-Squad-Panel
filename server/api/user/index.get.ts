import prisma from "~/server/db/prisma";
import { ensureAuth } from "~/server/utils/secret";

export default eventHandler(async (event) => {
  let user = JSON.parse(JSON.stringify(await ensureAuth(event)));

  if (user.role === null || user.role === undefined) {
    return user;
  }
  // user.role is a array, from roles collection find eq user.role's item
  const role = await prisma.roles.findMany({
    where: {
      id: {
        in: user.role,
      },
    },
  });
  user.role = role;
  return user;
});
