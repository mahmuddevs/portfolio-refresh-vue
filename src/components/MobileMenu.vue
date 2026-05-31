<script setup lang="ts">
import type { Component } from 'vue';
import { PhX, PhDownloadSimple } from '@phosphor-icons/vue';
import Logo from './common/Logo.vue';
import { useRouter } from 'vue-router';

interface MenuItem {
  label: string;
  path: string;
  icon: Component;
}

defineProps<{
  items: MenuItem[];
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
  emit('close');
};
</script>

<template>
  <!-- Overlay -->
  <transition name="mobile-fade">
    <div v-if="isOpen" @click="emit('close')" @touchmove.prevent @wheel.prevent
      class="fixed inset-0 h-screen bg-black/30 z-40 overflow-hidden md:hidden" />
  </transition>

  <!-- Sidebar drawer -->
  <transition name="mobile-slide">
    <div v-if="isOpen"
      class="fixed top-0 left-0 bottom-0 w-64 bg-background z-50 overflow-y-auto overscroll-contain flex flex-col justify-between">
      <div>
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-2 border-b">
          <Logo />
          <button @click="emit('close')"
            class="p-2 hover:bg-secondary dark:hover:bg-primary/40 rounded-md transition-colors" aria-label="Close menu">
            <PhX :size="24" />
          </button>
        </div>

        <!-- Menu Items -->
        <nav class="py-6">
          <ul class="space-y-4 px-4">
            <li v-for="item in items" :key="item.path">
              <button @click="navigateTo(item.path)"
                class="flex items-center gap-4 w-full px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-left group">
                <component :is="item.icon" :size="20" class="group-hover:text-primary transition-colors" />
                <span class="group-hover:text-primary transition-colors">{{ item.label }}</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Mobile Download Resume Button -->
      <div class="p-4 border-t border-border/10 bg-secondary/10">
        <a href="/resume.pdf" download
          class="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-primary text-white hover:bg-primary/90 hover:shadow-md hover:shadow-primary/30 text-sm font-semibold rounded-md transition-all duration-300 ease-in-out border border-primary">
          <span>Download Resume</span>
          <PhDownloadSimple :size="18" />
        </a>
      </div>
    </div>
  </transition>
</template>

<style>
/* Fade transition for overlay */
.mobile-fade-enter-active,
.mobile-fade-leave-active {
  transition: opacity 0.3s ease;
}

.mobile-fade-enter-from,
.mobile-fade-leave-to {
  opacity: 0;
}

/* Slide transition for sidebar */
.mobile-slide-enter-active,
.mobile-slide-leave-active {
  transition: transform 0.3s ease;
}

.mobile-slide-enter-from,
.mobile-slide-leave-to {
  transform: translateX(-100%);
}
</style>
