import { detectedSteamCMD } from "~/server/utils/file";

export default eventHandler(async (event) => {
  const user = await ensureAuth(event);
  let steamcmd = await detectedSteamCMD();

  if (!steamcmd) {
    return { data: steamcmd };
  }

  return { data: steamcmd };
});
