import { resolve } from "node:path";
import fs from "node:fs";
import axios from "axios";
import progress from "progress-stream";
import { Task, TaskError, TaskStatus, TaskType } from "~/types/io/task";
import AdmZip from "adm-zip";

export let downloadMissions: Task[] = [];

interface SteamCMDInfo {
  exist: boolean;
  path: string;
}

export async function detectedSteamCMD(): Promise<SteamCMDInfo> {
  const steamcmd = resolve(process.cwd(), "SteamCMD");

  const folderExist = await fs.promises
    .access(steamcmd, fs.promises.constants.F_OK)
    .then(() => true)
    .catch(() => false);

  if (!folderExist) {
    return {
      exist: false,
      path: "",
    };
  }

  const steamcmdExe = resolve(steamcmd, "steamcmd.exe");
  const fileExist = await fs.promises
    .access(steamcmdExe, fs.promises.constants.F_OK)
    .then(() => true)
    .catch(() => false);
  if (!fileExist) {
    return {
      exist: false,
      path: "",
    };
  }
  return {
    exist: fileExist,
    path: steamcmdExe,
  };
}

export async function download(task: Task): Promise<number> {
  task.type = TaskType.DOWNLOAD;
  task.status = TaskStatus.STARTING;
  const folderExist = await fs.promises
    .access(resolve(process.cwd(), "downloads"), fs.promises.constants.F_OK)
    .then(() => true)
    .catch(() => false);

  if (!folderExist) {
    await fs.promises.mkdir(resolve(process.cwd(), "downloads"));
  }

  const writer = fs.createWriteStream(
    resolve(process.cwd(), "downloads", task.filename)
  );

  // 创建取消令牌
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  // 设置进度监控
  const progressStream = progress({
    time: 100 /* 更新频率（毫秒）*/,
  });

  progressStream.on("progress", (progress) => {
    task.progress = Math.floor(progress.percentage);
    task.downloaded = progress.transferred;
  });

  task.status = TaskStatus.DOWNLOADING;
  axios({
    method: "get",
    url: task.url,
    responseType: "stream",
    cancelToken: source.token,
  })
    .then((response) => {
      response.data.pipe(progressStream).pipe(writer);
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        task.status = TaskStatus.CANCELED;
      } else {
        task.status = TaskStatus.ERROR;
      }
    });

  writer.on("finish", () => {
    task.progress = Math.floor(100);
    task.finish_at = new Date().toISOString();
    task.status = TaskStatus.COMPLETED;
    if (task.filename.includes("steamcmd")) {
      setTimeout(() => {
        unzipTask(task);
      }, 1000);
    }
  });

  writer.on("error", (error) => {
    task.status = TaskStatus.ERROR;
  });

  const id = downloadMissions.push(task) - 1;

  task.cancelCallback = () => {
    source.cancel();
    downloadMissions[id].status = TaskStatus.CANCELED;
  };
  return id;
}

async function unzipTask(task: Task) {
  task.type = TaskType.UNZIP;
  task.status = TaskStatus.STARTING;
  const zip = new AdmZip(resolve(process.cwd(), "downloads", task.filename));

  if (zip.getEntries().length === 0) {
    task.status = TaskStatus.ERROR;
    task.error = TaskError.FILESYSTEM;
    return;
  }
  if (task.filename.includes("steamcmd")) {
    zip.extractAllTo(resolve(process.cwd(), "SteamCMD"), true);
    task.status = TaskStatus.COMPLETED;
    return;
  }

  if (task.filename.endsWith(".zip")) {
    zip.extractAllTo(resolve(process.cwd(), "downloads"), true);
  }
  task.status = TaskStatus.COMPLETED;
  return;
}
