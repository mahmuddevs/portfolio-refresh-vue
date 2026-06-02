<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { PhX } from '@phosphor-icons/vue';
import Sidebar from '@/components/dashboard/Sidebar.vue';
import Header from '@/components/dashboard/Header.vue';

const sidebarCollapsed = ref(false);
const mobileOpen = ref(false);

const route = useRoute();

watch(
  () => route.path,
  () => {
    mobileOpen.value = false;
  }
);
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-background text-foreground font-sans">
    <!-- Desktop Sidebar -->
    <div class="hidden md:block shrink-0 h-full">
      <Sidebar :collapsed="sidebarCollapsed" />
    </div>

    <!-- Mobile Sidebar Drawer -->
    <div class="fixed inset-0 z-40 md:hidden transition-all duration-300"
      :class="[mobileOpen ? 'pointer-events-auto' : 'pointer-events-none']">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        :class="[mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none']" @click="mobileOpen = false"></div>

      <!-- Drawer Panel -->
      <div
        class="absolute top-0 bottom-0 left-0 w-64 max-w-[80vw] transition-transform duration-300 ease-in-out transform z-50 flex"
        :class="[mobileOpen ? 'translate-x-0' : '-translate-x-full']">
        <div class="flex-1 relative h-full">
          <Sidebar :collapsed="false" />
          <button @click="mobileOpen = false"
            class="absolute top-3.5 right-3.5 p-1.5 rounded-lg hover:bg-secondary text-foreground/60 hover:text-foreground transition-all duration-200 cursor-pointer"
            aria-label="Close menu">
            <PhX :size="20" />
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content Panel (Right side) -->
    <div class="flex-1 flex flex-col h-full overflow-hidden">
      <!-- Top Header -->
      <Header :sidebarCollapsed="sidebarCollapsed" @toggle-sidebar="sidebarCollapsed = !sidebarCollapsed"
        @toggle-mobile-sidebar="mobileOpen = !mobileOpen" />

      <!-- Content Container -->
      <main class="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8 bg-secondary/10 dark:bg-secondary/5 relative">
        <!-- Accent Glow elements for luxury premium look -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

        <!-- Render active sub-routes with micro-transitions -->
        <router-view v-slot="{ Component }">
          <transition name="fade-slide" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
