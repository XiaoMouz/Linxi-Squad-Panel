<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Item {
  title: string;
  href: string;
}

const $route = useRoute();

const sidebarNavItems: Item[] = [
  {
    title: "账户信息",
    href: "/settings/++++",
  },
  {
    title: "服务器",
    href: "/settings/server",
  },
  {
    title: "子用户设定",
    href: "/settings/user",
  },
  {
    title: "订阅",
    href: "/settings/subscription",
  },
  {
    title: "关于",
    href: "/settings/about",
  },
];
</script>

<template>
  <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
    <Button
      v-for="item in sidebarNavItems"
      :key="item.title"
      as="a"
      :href="item.href"
      variant="ghost"
      :class="
        cn(
          'w-full text-left justify-start',
          $route.path === `${item.href}.html` && 'bg-muted hover:bg-muted'
        )
      "
    >
      {{ item.title }}
    </Button>
  </nav>
</template>
