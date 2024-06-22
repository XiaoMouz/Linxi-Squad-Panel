<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";
import type { User } from "@/types/user.type";

const props = defineProps<{ user: User }>();

const isRooter =
  !(props.user.role === undefined) &&
  props.user.role.some((role) => role.super_role || role.maintainer);

const $route = useRoute();

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink
          @click="() => $router.push('/')"
          :class="
            cn(
              'cursor-pointer',
              navigationMenuTriggerStyle(),
              $route.path === `/` && 'bg-muted hover:bg-muted'
            )
          "
        >
          你好，世界
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger
          :class="
            cn(
              navigationMenuTriggerStyle(),
              $route.path.startsWith('/server') && 'bg-muted hover:bg-muted',
              $route.path.includes('/ticket') && 'bg-muted hover:bg-muted',
              $route.path.includes('/admin') && 'bg-muted hover:bg-muted'
            )
          "
          >导航</NavigationMenuTrigger
        >
        <NavigationMenuContent>
          <ul
            class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]"
          >
            <li class="row-span-3">
              <NavigationMenuLink as-child class="">
                <div class="rounded-md bg-custom w-full h-full">
                  <a
                    class="rounded-md bg-custom-child cursor-pointer flex h-full w-full select-none flex-col justify-end from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    @click="() => $router.push('/admin')"
                  >
                    <img src="/public/favicon.ico" class="h-6 w-6" />
                    <div class="mb-2 mt-4 text-lg font-medium">管理中心</div>
                    <p
                      class="text-white/90 text-sm leading-tight dark:text-muted-foreground"
                    >
                      Welcome back Commander.
                    </p>
                  </a>
                </div>
              </NavigationMenuLink>
            </li>
            <NavListItem href="/server/var" title="人数最多的服务器 (42人)">
              [CN] 萌新乐园 压家保护
            </NavListItem>
            <NavListItem
              href="/server/"
              title="查看所有服务器"
              :class="
                cn(
                  $route.path.includes('/server') &&
                    $route.path !== '/server/var' &&
                    'bg-muted hover:bg-muted'
                )
              "
            >
              当前有 0 个服务器，没有要初始化的服务器
            </NavListItem>
            <NavListItem href="/ticket/" title="工单管理">
              当前有 0 个工单，没有要处理的工单
            </NavListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>组件中心</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul
            class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
          >
            <NavListItem
              v-for="component in components"
              :key="component.title"
              :title="component.title"
              :href="component.href"
            >
              {{ component.description }}
            </NavListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem v-if="isRooter">
        <NavigationMenuLink
          @click="() => $router.push('/rooter')"
          :class="
            cn(
              'cursor-pointer',
              navigationMenuTriggerStyle(),
              $route.path.includes(`/rooter`) && 'bg-muted hover:bg-muted'
            )
          "
        >
          根管理
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>

<style scoped>
/* add a filter shadow for background */
.bg-custom {
  background: url(/assets/image/nav/NAVBG.png) center center/cover;
}
.bg-custom-child {
  backdrop-filter: blur(2px);
}
@media (prefers-color-scheme: dark) {
  .bg-custom-child {
    position: relative;
    background: rgba(0, 0, 0, 0.3); /* 先设置一个基础颜色 */
  }

  .bg-custom-child::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
    transition: opacity 0.3s;
    opacity: 0.2;
  }

  .bg-custom-child:hover::before {
    opacity: 0.6; /* 调整透明度以改变显示效果 */
  }
}

@media (prefers-color-scheme: light) {
  .bg-custom {
    background: url(/assets/image/nav/NAVBGL.png) center center/cover;
  }

  .bg-custom-child {
    position: relative;
    background: rgba(0, 0, 0, 0.1); /* 先设置一个基础颜色 */
  }
  .bg-custom-child::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      32deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
    transition: opacity 0.3s;
    opacity: 0.2;
  }

  .bg-custom-child:hover::before {
    opacity: 0.5; /* 调整透明度以改变显示效果 */
  }
}
</style>
