<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      ><UIAvatar>
        <AvatarImage
          v-if="user?.picture"
          :src="user.picture"
          :alt="user.username + '\'s avatar'"
        />
        <AvatarFallback v-else>{{ user?.username.charAt(0) }}</AvatarFallback>
      </UIAvatar></DropdownMenuTrigger
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
</template>
<script setup lang="ts">
import type { User } from "@/types/user.type";
import AvatarFallback from "../ui/avatar/AvatarFallback.vue";
import { Avatar as UIAvatar } from "../ui/avatar";

defineProps<{
  user: User;
}>();

const router = useRouter();
function logout() {
  router.push("/account/logout");
}
</script>
