<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import lightLogo from '@/assets/logo-light.png';
import darkLogo from '@/assets/logo-dark.png';

const theme = useThemeStore();
</script>
<template>
  <router-link to="/">
    <img class="w-16 md:w-20" :src="theme.activeTheme === 'dark' ? darkLogo : lightLogo" alt="Logo" />
  </router-link>
</template>
