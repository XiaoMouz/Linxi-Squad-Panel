import z from "zod";
import sign from "jsonwebtoken";
import mongoose from "mongoose";
import { compare } from "~/server/utils/secret";
import useLog, { log2backend } from "~/server/utils/log";

//export const refreshTokens: Record<number, Record<string, any>> = {};
export const SECRET = useRuntimeConfig().secret;

export default defineEventHandler(async (event) => {
  const body = z
    .object({
      username: z.string(),
      password: z.string(),
    })
    .safeParse(await readBody(event));

  if (!body.success) {
    console.log(body.error);
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
    });
  }
  const { username, password } = body.data;

  const res = await mongoose.connection.db
    .collection("users")
    .findOne({ username });

  const ip = getRequestIP(event);
  if (!res) {
    log2backend(
      event.path,
      `${ip ? ip : getRequestHost(event)} try login with username [${username}] failed but it is not exist`
    );
    throw createError({
      statusCode: 401,
      statusMessage: "Password or username incorrect",
    });
  }
  const matches = compare(password, res.password);
  if (!matches) {
    log2backend(
      event.path,
      `${ip ? ip : getRequestHost(event)} try login with username [${username}] failed`
    );
    throw createError({
      statusCode: 401,
      statusMessage: "Password or username incorrect",
    });
  }
  log2backend(
    event.path,
    `${ip ? ip : getRequestHost(event)} login to username [${username}] `
  );
  const expiresIn = "7d";
  const refreshToken =
    Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1;
  const user = {
    _id: res._id,
    username: res.username,
    picture: res.picture,
    email: res.email,
  };

  const accessToken = sign.sign(
    { ...user, scope: ["global", "user"] },
    SECRET,
    {
      expiresIn,
    }
  );
  //set username to cookie
  setCookie(event, "username", username, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
  });
  // refreshTokens[refreshToken] = {
  //   accessToken,
  //   user,
  // };

  // update user last login
  await mongoose.connection.db.collection("users").updateOne(
    { username },
    {
      $set: {
        updatedAt: new Date(),
      },
    }
  );

  return {
    token: accessToken,
    expiresIn,
    user,
  };
});
