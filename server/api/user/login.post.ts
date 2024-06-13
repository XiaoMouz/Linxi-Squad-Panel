import z from "zod";
import sign from "jsonwebtoken";
import mongoose from "mongoose";
import { compare } from "~/server/utils/secret";

const refreshTokens: Record<number, Record<string, any>> = {};
export const SECRET = useRuntimeConfig().secret;

export default defineEventHandler(async (event) => {
  const body = z
    .object({
      username: z.string().min(2, {
        message: "用户名至少2个字符",
      }),
      password: z.string().min(6, {
        message: "密码至少6个字符",
      }),
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
    .findOne({ username })
    .then((res) => {
      console.log(res);
      return res;
    });

  if (!res) {
    throw createError({
      statusCode: 401,
      statusMessage: "Password or username incorrect",
    });
  }
  const matches = compare(password, res.password);
  if (!matches) {
    throw createError({
      statusCode: 401,
      statusMessage: "Password or username incorrect",
    });
  }
  const expiresIn = 15;
  const refreshToken =
    Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1;
  const user = {
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
  refreshTokens[refreshToken] = {
    accessToken,
    user,
  };
  return {
    token: {
      accessToken,
      refreshToken,
    },
  };
});
