<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { PhSignOut } from '@phosphor-icons/vue';
import { dashboardNavItems } from '@/utils/dashboard-nav';
import { useAuthStore } from '@/stores/auth';
import favicon from "@/assets/favicon.png"

defineProps<{
  collapsed: boolean;
}>();


const authStore = useAuthStore();
const route = useRoute();

const handleLogout = async () => {
  await authStore.logout();
};

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/';
  }
  if (path === '/dashboard') {
    return route.path === '/dashboard';
  }
  if (path === '/dashboard/projects') {
    return route.path === '/dashboard/projects' || (route.path.startsWith('/dashboard/projects/') && !route.path.startsWith('/dashboard/projects/add'));
  }
  return route.path.startsWith(path);
};
</script>

<template>
  <aside
    class="flex flex-col h-full bg-background/80 backdrop-blur-md border-r border-border/10 dark:border-white/5 transition-all duration-300 ease-in-out"
    :class="[collapsed ? 'w-20' : 'w-64']">
    <div class="flex items-center h-16 px-4 border-b border-border/10 dark:border-white/5"
      :class="[collapsed ? 'justify-center' : '']">
      <router-link to="/" class="flex items-center overflow-hidden select-none transition-all duration-300"
        :class="[collapsed ? 'justify-center w-full gap-0' : 'gap-3']">
        <img :src="favicon" alt="" class="size-10" />
        <span class="font-bold text-lg tracking-tight whitespace-nowrap transition-all duration-300"
          :class="[collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto']">
          Admin<span class="text-primary">Console</span>
        </span>
      </router-link>
    </div>

    <!-- Navigation Items -->
    <nav class="flex-1 py-6 space-y-1.5 px-3 overflow-y-auto overflow-x-hidden">
      <router-link v-for="item in dashboardNavItems" :key="item.path" :to="item.path"
        class="flex items-center rounded-lg transition-all duration-300 group relative py-3" :class="[
          isActive(item.path)
            ? 'bg-primary/10 text-primary font-semibold'
            : 'text-foreground/75 hover:bg-secondary hover:text-foreground',
          collapsed ? 'justify-center gap-0 px-0' : 'gap-4 px-3'
        ]">
        <component :is="item.icon" :size="28" class="shrink-0 transition-transform group-hover:scale-110" />

        <span class="whitespace-nowrap transition-all duration-300"
          :class="[collapsed ? 'opacity-0 w-0 overflow-hidden pointer-events-none' : 'opacity-100 w-auto']">
          {{ item.label }}
        </span>

        <!-- Collapsed Tooltip -->
        <span v-if="collapsed"
          class="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-200 origin-left bg-foreground text-background text-xs font-semibold px-2 py-1.5 rounded-md shadow-md whitespace-nowrap z-50 pointer-events-none">
          {{ item.label }}
        </span>
      </router-link>
    </nav>

    <!-- Sidebar Footer -->
    <div class="p-3 border-t border-border/10 dark:border-white/5 space-y-2">
      <button @click="handleLogout"
        class="flex items-center w-full py-3 rounded-lg text-foreground/75 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 group relative cursor-pointer"
        :class="[collapsed ? 'justify-center gap-0 px-0' : 'gap-4 px-3']">
        <PhSignOut :size="22" class="shrink-0 transition-transform group-hover:scale-110" />
        <span class="whitespace-nowrap transition-all duration-300"
          :class="[collapsed ? 'opacity-0 w-0 overflow-hidden pointer-events-none' : 'opacity-100 w-auto']">
          Logout
        </span>

        <!-- Collapsed Tooltip -->
        <span v-if="collapsed"
          class="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-200 origin-left bg-red-500 text-white text-xs font-semibold px-2 py-1.5 rounded-md shadow-md whitespace-nowrap z-50 pointer-events-none">
          Logout
        </span>
      </button>
    </div>
  </aside>
</template>
