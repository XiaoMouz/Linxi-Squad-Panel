<template>
  <Card>
    <CardHeader>
      <CardTitle>Steam CMD</CardTitle>
      <CardDescription
        >透过 SteamCMD 进行 Squad Server 的下载与更新</CardDescription
      >
    </CardHeader>
    <CardContent>
      <div v-if="loading" class="flex flex-raw space-x-3">
        <Skeleton class="h-[80px] w-[80px] rounded-xl" />
        <div class="space-y-2">
          <Skeleton class="h-10 w-[250px]" />
          <Skeleton class="h-8 w-[200px]" />
        </div>
      </div>
      <div v-else>
        <div class="flex flex-raw space-x-4 align-center">
          <div class="h-[80px] w-[80px] rounded-xl">
            <img class="rounded-xl" src="/assets/image/steamcmd.png" />
          </div>
          <div class="space-y-1">
            <div class="h-10 w-full space-x-4">
              <span>Steam CMD</span>
              <Badge v-if="status.exist">可用</Badge>
              <Badge v-else variant="destructive">不可用</Badge>
            </div>

            <div v-if="status.exist" class="h-8">
              <span>
                已安装至 <code>{{ status.path }}</code>
              </span>
            </div>
            <div v-else v-if="!status.downloading" class="h-8">
              <span>目前尚未安装</span>
            </div>
            <div v-if="status.downloading" class="h-8">
              <Progress :model-value="status?.task?.progress" />
            </div>
          </div>
          <div class="my-auto">
            <Button
              :disabled="status.downloading"
              v-if="!status.exist"
              @click="downloadSteamCMD"
            >
              <LoadingCycle v-if="status.downloading" sizeClass="w-4 h-4" />
              <span>{{ status.downloading ? "下载中" : "初始化" }}</span>
            </Button>
            <Button v-else @click="">
              <span>设置</span>
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter> </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { TaskType, TaskError, TaskStatus } from "@/types/io/task";
import type { Task } from "@/types/io/task";
const loading = ref(true);
let data = await fetch("/api/rooter/init/steamcmd").then((res) => res.json());
data = data.data;

const status = reactive<{
  exist: boolean;
  path: string;
  downloading: boolean;
  task: Task | null;
}>({
  exist: data?.exist,
  path: data?.path,
  downloading: false,
  task: null,
});

const downloadSteamCMD = async () => {
  status.downloading = true;

  while (
    data.status != TaskStatus.COMPLETED &&
    data.status != TaskStatus.CANCELED &&
    data.status != TaskStatus.ERROR
  ) {
    let task = await fetch("/api/rooter/init/steamcmd/download").then((res) =>
      res.json()
    );
    data = task.data;
    setTimeout(() => {}, 200);
  }
  status.downloading = false;
  let local = await fetch("/api/rooter/init/steamcmd").then((res) =>
    res.json()
  );
  status.exist = local.data.exist;
  status.path = local.data.path;
};

if (status) {
  loading.value = false;
}
</script>
