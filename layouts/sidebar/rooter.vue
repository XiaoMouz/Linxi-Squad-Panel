<script setup lang="ts">
//set middleware

const list = [
  {
    title: "服务器状态",
    href: "/rooter/server",
  },
  {
    title: "用户状态",
    href: "/rooter/user",
  },
  {
    title: "订阅状态",
    href: "/rooter/subscriptions",
  },
  {
    title: "服务管理",
    href: "/rooter/service",
  },
  {
    title: "初始化检测",
    href: "/rooter/init",
  },
];
</script>

<template>
  <NuxtLayout name="sidebar">
    <template #title>根管理</template>
    <template #subtitle>单点管理</template>
    <template #sidebar>
      <SidebarNavList :itemList="list" />
    </template>
    <NuxtPage />
  </NuxtLayout>
</template>
