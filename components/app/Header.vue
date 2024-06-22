<template>
  <header
    class="w-full flex flex-nowrap justify-between items-center pt-5 pl-10 pr-20"
  >
    <div>
      <img src="~/public/favicon.ico" alt="Logo" class="h-10 w-10" />
    </div>
    <div>
      <HeaderNavList :user="user" />
    </div>
    <div>
      <HeaderAvatar :user="user" />
    </div>
  </header>
</template>
<script setup lang="ts">
import type { User } from "~/types/user.type";

defineProps<{ user: User }>();
</script>
