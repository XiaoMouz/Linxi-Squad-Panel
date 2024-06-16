<template>
  <header
    class="w-full flex flex-nowrap justify-between items-center pt-5 pl-10 pr-20"
  >
    <div>
      <img src="~/public/favicon.ico" alt="Logo" class="h-10 w-10" />
    </div>
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          ><Avatar>
            <AvatarImage
              v-if="user?.picture"
              :src="user.picture"
              :alt="user.username + '\'s avatar'"
            />
            <AvatarFallback v-else>{{
              user?.username.charAt(0)
            }}</AvatarFallback>
          </Avatar></DropdownMenuTrigger
        >
        <DropdownMenuContent>
          <DropdownMenuLabel>你好呀 {{ user?.username }}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <NuxtLink to="/">
            <DropdownMenuItem>主页</DropdownMenuItem>
          </NuxtLink>
          <NuxtLink to="/account">
            <DropdownMenuItem>个人资料</DropdownMenuItem>
          </NuxtLink>
          <NuxtLink to="/subscription">
            <DropdownMenuItem>订阅</DropdownMenuItem>
          </NuxtLink>
          <DropdownMenuSeparator />
          <NuxtLink to="/settings">
            <DropdownMenuItem>设置</DropdownMenuItem>
          </NuxtLink>
          <DropdownMenuItem @click="logout()">登出</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>
<script setup lang="ts">
import AvatarFallback from "../ui/avatar/AvatarFallback.vue";

const { getSession } = useAuth();
const user = await getSession();
const router = useRouter();
function logout() {
  router.push("/account/logout");
}
</script>
