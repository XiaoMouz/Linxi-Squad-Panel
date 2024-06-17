import { createConsola } from "consola";
import { createLog } from "../model/log";

const log = createConsola({
  level: useRuntimeConfig().logLevel || 3,
});

export default function useLog() {
  return log;
}

export async function log2backend(
  location: string,
  message: string,
  type: string = "info",
  stack: any = "No Stack"
) {
  await createLog("server", location, message, type, stack, new Date());

  log.info("report from server:" + message, stack === "No Stack" ? "" : stack);
}
