import { H3Event } from "h3";
import { log2backend } from "~/server/utils/log";

export default eventHandler(async (event: H3Event) => {
  // get username from cookie
  const username = getCookie(event, "username");

  log2backend(event.path, `user ${username} logged out`);
  deleteCookie(event, "auth.token");
  return { status: "OK" };
});
