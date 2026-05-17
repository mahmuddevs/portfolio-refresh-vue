<script setup lang="ts">
import { PhMoonStars, PhSunDim } from '@phosphor-icons/vue';
import { useThemeStore } from '../stores/theme';
import Logo from './common/Logo.vue';
import MobileMenu from './MobileMenu.vue';

const theme = useThemeStore();

</script>
<template>
  <header class="cont flex items-center justify-between py-4">
    <Logo />
    <nav class="flex items-center gap-4">
      <ul class="hidden md:flex items-center gap-4">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/projects">Projects</router-link>
        </li>
        <li>
          <router-link to="/contact">Contact</router-link>
        </li>
      </ul>
      <button @click="theme.toggle"
        class="p-2 rounded-md hover:bg-secondary dark:hover:bg-primary/40 transition-colors md:border icon-center">
        <PhMoonStars v-if="theme.activeTheme === 'light'" :size="20" />
        <PhSunDim v-if="theme.activeTheme === 'dark'" :size="20" />
      </button>
      <MobileMenu />
    </nav>
  </header>
</template>