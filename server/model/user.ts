import prisma from "../db/prisma";

export async function create(
  email: string | undefined = "",
  password: string,
  username: string,
  createdAt: Date,
  updatedAt: Date,
  picture: string = ""
) {
  let user = await prisma.users.create({
    data: {
      email,
      username,
      password,
      createdAt,
      updatedAt,
      picture,
    },
  });
  console.log(user);
  return user;
}

export async function findByUsername(username: string) {
  let user = await prisma.users.findFirst({
    where: {
      username,
    },
  });
  return user;
}

export async function updateUserTime(id: string) {
  let user = await prisma.users.update({
    where: { id },
    data: { updatedAt: new Date() },
  });
  return user;
}
