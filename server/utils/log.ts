import { createConsola } from "consola";
import mongoose from "mongoose";

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
  await mongoose.connection.db.collection("logs").insertOne({
    from: "server",
    location,
    message,
    type,
    stack: JSON.stringify(stack),
    createdAt: new Date(),
  });

  log.info("report from server:" + message, stack === "No Stack" ? "" : stack);
}
