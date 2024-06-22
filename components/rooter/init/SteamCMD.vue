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
        <div class="flex flex-raw space-x-3 align-center">
          <div class="h-[89px] w-[80px] rounded-xl">
            <img class="rounded-xl" src="/assets/image/steamcmd.png" />
          </div>
          <div class="space-y-1">
            <div class="h-10 w-[250px] space-x-4">
              <span>Steam CMD</span>
              <Badge v-if="status.exist">可用</Badge>
              <Badge v-else variant="destructive">不可用</Badge>
            </div>
            <div v-if="status.exist" class="h-8 w-[200px]">目前尚未安装</div>
            <div v-if="!status.exist" class="h-8 w-[200px]">
              <span>已安装至 {{ status.path }}</span>
            </div>
          </div>
          <div class="my-auto">
            <Button @click="">
              <span>下载</span>
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter> </CardFooter>
  </Card>
</template>

<script setup lang="ts">
const loading = ref(true);
let status = await fetch("/api/rooter/init/steamcmd").then((res) => res.json());
status = status.data;
console.log(status.exist);
if (status) {
  loading.value = false;
}

const downloadSteamCMD = async () => {
  await fetch("/api/rooter/init/steamcmd/download");
  const data = await fetch("/api/rooter/init/steamcmd").then((res) =>
    res.json()
  );

  if (data) {
  }
};
</script>
