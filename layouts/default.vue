<template>
  <div class="w-screen min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1 flex justify-center"><slot /></main>
    <AppFooter />
  </div>
</template>
<style scoped></style>
