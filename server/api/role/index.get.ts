import prisma from "~/server/db/prisma";

export default eventHandler(async (event) => {
  let user = JSON.parse(JSON.stringify(await ensureAuth(event)));
  if (user.id === null) {
    return user;
  }
  //show all roles, hidden is false or null
  const roles = await prisma.roles.findMany({
    where: {
      creator: {
        equals: user.id,
      },
    },
  });
  return { roles };
});
