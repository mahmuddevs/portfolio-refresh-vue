<script setup lang="ts">
import {
  PhMoonStars,
  PhSunDim,
  PhHouse,
  PhFolderOpen,
  PhEnvelope,
} from '@phosphor-icons/vue';
import { useThemeStore } from '../stores/theme';
import Logo from './common/Logo.vue';
import MobileMenu from './MobileMenu.vue';

const theme = useThemeStore();

const menuItems = [
  { label: 'Home', path: '/', icon: PhHouse },
  { label: 'Projects', path: '/projects', icon: PhFolderOpen },
  { label: 'Contact', path: '/contact', icon: PhEnvelope },
];

</script>
<template>
  <header class="cont flex items-center justify-between py-4">
    <Logo />
    <nav class="flex items-center gap-4">
      <ul class="hidden md:flex items-center gap-4">
        <li v-for="item in menuItems" :key="item.path">
          <router-link :to="item.path">{{ item.label }}</router-link>
        </li>
      </ul>
      <button @click="theme.toggle"
        class="p-2 rounded-md hover:bg-secondary dark:hover:bg-primary/40 transition-colors md:border icon-center">
        <PhMoonStars v-if="theme.activeTheme === 'light'" :size="20" />
        <PhSunDim v-if="theme.activeTheme === 'dark'" :size="20" />
      </button>
      <MobileMenu :items="menuItems" />
    </nav>
  </header>
</template>