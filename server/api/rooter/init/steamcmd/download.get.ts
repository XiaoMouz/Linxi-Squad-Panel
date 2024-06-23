import { detectedSteamCMD, download } from "~/server/utils/file";
import { Task, TaskStatus, TaskType } from "~/types/io/task";

let missionId: number = NaN;

export default eventHandler(async (event) => {
  const status = await detectedSteamCMD();
  if (status.exist) {
    return {
      exist: true,
      path: status.path,
      data: downloadMissions[missionId],
    };
  }
  if (!Number.isNaN(missionId)) {
    return { data: downloadMissions[missionId] };
  }
  const user = JSON.parse(JSON.stringify(await ensureAuth(event)));
  console.log(user);
  let task: Task = {
    filename: "steamcmd.zip",
    url: "https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip",
    status: TaskStatus.STARTING,
    type: TaskType.DOWNLOAD,
    creator: user.id,
    progress: 0,
    downloaded: 0,
    finish_at: "",
    created_at: new Date().toISOString(),
    error: 0,
    cancelCallback: () => {},
  };
  log2backend(
    event.path,
    `user ${user.username} [${user.id}] start download steamcmd`
  );
  missionId = await download(task);
  return { data: downloadMissions[missionId] };
});
