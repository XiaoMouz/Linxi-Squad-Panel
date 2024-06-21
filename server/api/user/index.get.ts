import prisma from "~/server/db/prisma";
import { ensureAuth } from "~/server/utils/secret";

export default eventHandler(async (event) => {
  let user = JSON.parse(JSON.stringify(await ensureAuth(event)));

  if (user.role === null) {
    return user;
  }
  // user.role is a array, from roles collection find all role
  await prisma.roles
    .findMany({
      where: {
        id: {
          in: user.role,
        },
      },
    })
    .then((roles) => {
      user.role = roles;
    });
  return { user };
});
