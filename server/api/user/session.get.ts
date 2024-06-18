import { H3Event } from "h3";
import jwt from "jsonwebtoken";
import { SECRET } from "./login.post";
import { log2backend } from "~/server/utils/log";

// this endpoint didn't work
// todo: fix header and cookie

const ensureAuth = async (event: H3Event) => {
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

export default eventHandler(async (event) => {
  const user = await ensureAuth(event);
  return user;
});
