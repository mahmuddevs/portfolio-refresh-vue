<script setup lang="ts">
import { onMounted } from "vue";
import { useThemeStore } from "./stores/theme";
import { useAuthStore } from "./stores/auth";

const theme = useThemeStore();
const authStore = useAuthStore();

onMounted(async () => {
  theme.init();
  await authStore.checkAuth();
});
</script>

<template>
  <router-view />
</template>
