<template>
  <div class="w-screen min-h-screen flex flex-col">
    <AppHeader :user="sessionUser" />
    <main class="flex-1 flex justify-center"><slot /></main>
    <AppFooter />
  </div>
</template>
<style scoped></style>
<script setup lang="ts">
const sessionUser = await useUserInfo();
console.log(sessionUser);
</script>
