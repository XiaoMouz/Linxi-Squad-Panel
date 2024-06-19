import { ensureAuth } from "~/server/utils/secret";
// this endpoint didn't work
// todo: fix header and cookie

export default eventHandler(async (event) => {
  const user = await ensureAuth(event);
  return user;
});
