<script setup lang="ts">
import { ref } from 'vue';
import {
  PhX,
  PhList,
  PhHouse,
  PhFolderOpen,
  PhEnvelope,
} from '@phosphor-icons/vue';
import Logo from './common/Logo.vue';
import { useRouter } from 'vue-router';

const isOpen = ref(false);
const router = useRouter();

const menuItems = [
  { label: 'Home', path: '/', icon: PhHouse },
  { label: 'Projects', path: '/projects', icon: PhFolderOpen },
  { label: 'Contact', path: '/contact', icon: PhEnvelope },
];

const navigateTo = (path: string) => {
  router.push(path);
  isOpen.value = false;
};

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div>
    <!-- Hamburger Menu Button -->
    <button @click="toggleMenu"
      class="md:hidden p-2 rounded-md hover:bg-secondary dark:hover:bg-primary/40 transition-colors"
      aria-label="Toggle menu">
      <PhList :size="24" />
    </button>

    <!-- Mobile Menu Overlay -->
    <transition name="fade">
      <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 bg-black/30 bg-opacity-50 md:hidden z-40" />
    </transition>

    <!-- Mobile Menu Sidebar -->
    <transition name="slide">
      <div v-if="isOpen" class="fixed left-0 top-0 h-full w-64 bg-background z-50 overflow-y-auto">
        <!-- Header with Logo and Close Button -->
        <div class="flex items-center justify-between p-6 border-b">
          <Logo />
          <button @click="isOpen = false"
            class="p-2 hover:bg-secondary dark:hover:bg-primary/40 rounded-md transition-colors"
            aria-label="Close menu">
            <PhX :size="24" />
          </button>
        </div>

        <!-- Menu Items -->
        <nav class="py-6">
          <ul class="space-y-4 px-4">
            <li v-for="item in menuItems" :key="item.path">
              <button @click="navigateTo(item.path)"
                class="flex items-center gap-4 w-full px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-left group">
                <component :is="item.icon" :size="20" class="group-hover:text-primary transition-colors" />
                <span class="group-hover:text-primary transition-colors">{{
                  item.label
                }}</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
