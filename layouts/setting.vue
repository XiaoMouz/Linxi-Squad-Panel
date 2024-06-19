<script setup lang="ts"></script>

<template>
  <NuxtLayout name="default">
    <div class="hidden space-y-6 p-10 pb-16 md:block w-full">
      <div class="space-y-0.5">
        <h2 class="text-2xl font-bold tracking-tight">管理/设定</h2>
        <p class="text-muted-foreground">
          编辑您的个人资料，设定订阅下的服务器、子用户、权限等
        </p>
      </div>
      <Separator class="my-6" />
      <div
        class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0"
      >
        <aside class="-mx-4 lg:w-1/5">
          <SidebarNavList />
        </aside>
        <div class="flex-1 lg:max-w-2xl">
          <div class="space-y-6">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
