import z from "zod";
import jwt from "jsonwebtoken";
import { findByUsername, updateUser } from "~/server/model/user";
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

  const res = await findByUsername(username);

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
    _id: res.id,
    username: res.username,
    picture: res.picture,
    email: res.email,
  };

  const accessToken = jwt.sign({ ...user }, SECRET, {
    expiresIn,
  });
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
  updateUser(res.id);

  //set header authorization
  setHeader(event, "authorization", `Bearer ${accessToken}`);

  return {
    token: accessToken,
    expiresIn,
    user,
  };
});
