import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { H3Event } from "h3";
import { SECRET } from "../api/user/login.post";

export const hash = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

export const compare = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

export const ensureAuth = async (event: H3Event) => {
  const authCookieValue = await getCookie(event, "auth.token");

  if (typeof authCookieValue === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage: "Need auth.token cookie to access this endpoint",
    });
  }
  const extractedToken = authCookieValue;

  try {
    return jwt.verify(extractedToken, SECRET);
  } catch (error) {
    log2backend(event.path, `ensureAuth error from ${getRequestHost(event)}`);
    throw createError({
      statusCode: 403,
      statusMessage: "You must be logged in to use this endpoint",
    });
  }
};
