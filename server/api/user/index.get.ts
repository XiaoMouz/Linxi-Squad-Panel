import { H3Event } from "h3";
import jwt from "jsonwebtoken";
import { SECRET } from "./login.post";

const TOKEN_TYPE = "Bearer";

const extractToken = (authHeaderValue: string) => {
  const [, token] = authHeaderValue.split(`${TOKEN_TYPE} `);
  return token;
};

const ensureAuth = async (event: H3Event) => {
  //get cookie from header
  const authCookieValue = await getCookie(event, "auth.token");

  if (typeof authCookieValue === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage: "Need auth.token cookie to access this endpoint",
    });
  }
  const extractedToken = authCookieValue;

  try {
    const user = jwt.verify(extractedToken, SECRET);
    return user;
  } catch (error) {
    log2backend(
      event.path,
      "Login failed. Here's the raw error:",
      "error",
      error
    );
    throw createError({
      statusCode: 403,
      statusMessage: "You must be logged in to use this endpoint",
    });
  }
};

export default eventHandler(async (event) => {
  const user = await ensureAuth(event);

  return { user };
});
