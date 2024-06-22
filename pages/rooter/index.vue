<script setup lang="ts">
definePageMeta({
  layout: "sidebar-rooter",
  middleware: "root-middleware",
});
// handle url if not have any path senting to server
const $router = useRouter();
if ($router.currentRoute.value.path === "/rooter") {
  $router.push("/rooter/server");
}
</script>

<template>
  <div class="w-full h-full m-auto flex justify-center bg-muted rounded-md">
    <LoadingCycle sizeClass="w-6 h-6" />
  </div>
</template>
