<script setup lang="ts">
const list = [
  {
    title: "账户信息",
    href: "/settings/account",
  },
  {
    title: "关于",
    href: "/settings/about",
  },
];
</script>

<template>
  <NuxtLayout name="sidebar">
    <template #title>设置</template>
    <template #subtitle>管理您的账户设置</template>
    <template #sidebar>
      <SidebarNavList :itemList="list" />
    </template>
    <template><slot /></template>
  </NuxtLayout>
</template>
