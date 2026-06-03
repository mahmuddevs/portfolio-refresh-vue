<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  PhMoonStars,
  PhSunDim,
  PhHouse,
  PhFolderOpen,
  PhEnvelope,
  PhList,
  PhDownloadSimple,
  PhLayout,
} from '@phosphor-icons/vue';
import { useThemeStore } from '../stores/theme';
import { useAuthStore } from '../stores/auth';
import Logo from './common/Logo.vue';
import MobileMenu from './MobileMenu.vue';

const theme = useThemeStore();
const authStore = useAuthStore();
const isMenuOpen = ref(false);

const menuItems = computed(() => {
  const items = [
    { label: 'Home', path: '/', icon: PhHouse },
    { label: 'Projects', path: '/projects', icon: PhFolderOpen },
    { label: 'Contact', path: '/contact', icon: PhEnvelope },
  ];

  if (authStore.isAuthenticated && authStore.isAdmin) {
    items.push({ label: 'Dashboard', path: '/dashboard', icon: PhLayout });
  }

  return items;
});

</script>
<template>
  <header
    class="sticky top-0 z-35 w-full bg-background/80 backdrop-blur-md border-b border-border/10 dark:border-white/5 transition-all duration-300">
    <div class="cont flex items-center justify-between py-4">
      <Logo />
      <nav class="flex items-center gap-4">
        <ul class="hidden md:flex items-center gap-4">
          <li v-for="item in menuItems" :key="item.path">
            <router-link :to="item.path">{{ item.label }}</router-link>
          </li>
        </ul>
        <a href="/resume.pdf" download
          class="hidden md:flex items-center gap-2 px-4 py-2 bg-primary text-white hover:bg-primary/90 hover:shadow-md hover:shadow-primary/30 text-sm font-semibold rounded-md transition-all duration-300 ease-in-out border border-primary">
          <span>Resume</span>
          <PhDownloadSimple :size="16" />
        </a>
        <button @click="theme.toggle"
          class="p-2 rounded-md hover:bg-secondary dark:hover:bg-primary/40 transition-colors md:border icon-center">
          <PhMoonStars v-if="theme.activeTheme === 'light'" :size="20" />
          <PhSunDim v-if="theme.activeTheme === 'dark'" :size="20" />
        </button>
        <button @click="isMenuOpen = true"
          class="md:hidden p-2 rounded-md hover:bg-secondary dark:hover:bg-primary/40 transition-colors"
          aria-label="Open menu">
          <PhList :size="24" />
        </button>
      </nav>
    </div>
  </header>
  <MobileMenu :items="menuItems" :isOpen="isMenuOpen" @close="isMenuOpen = false" />
</template>