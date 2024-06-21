import { ensureAuth } from "~/server/utils/secret";

export default eventHandler(async (event) => {
  const user = await ensureAuth(event);
  return user;
});
