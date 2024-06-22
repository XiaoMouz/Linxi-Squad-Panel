<script setup lang="ts"></script>

<template>
  <NuxtLayout name="default">
    <div class="hidden space-y-6 p-10 pb-16 md:block w-full">
      <div class="space-y-0.5">
        <h2 class="text-2xl font-bold tracking-tight"><slot name="title" /></h2>
        <p class="text-muted-foreground">
          <slot name="subtitle" />
        </p>
      </div>
      <Separator class="my-6" />
      <div
        class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0"
      >
        <aside class="-mx-4 lg:w-1/5">
          <slot name="sidebar" />
        </aside>
        <div class="flex-1 lg:max-w-full">
          <div class="space-y-6 w-full h-full">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
