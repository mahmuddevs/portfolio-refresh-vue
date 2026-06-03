<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  PhList,
  PhMoonStars,
  PhSunDim,
  PhSignOut,
  PhHouse,
  PhCaretLeft,
  PhCaretRight,
} from '@phosphor-icons/vue';
import { useThemeStore } from '@/stores/theme';
import { useAuthStore } from '@/stores/auth';

defineProps<{
  sidebarCollapsed: boolean;
}>();

const emit = defineEmits<{
  "toggle-sidebar": [];
  "toggle-mobile-sidebar": [];
}>();

const theme = useThemeStore();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const userInitials = computed(() => {
  const user = authStore.user;
  if (!user) return "A";
  if (user.firstName && user.lastName) {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  }
  if (user.name) {
    const parts = user.name.split(' ');
    const first = parts[0];
    const second = parts[1];
    if (first && second) {
      return `${first.charAt(0)}${second.charAt(0)}`.toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  }
  return user.email.substring(0, 2).toUpperCase();
});

const userFullName = computed(() => {
  const user = authStore.user;
  if (!user) return "Administrator";
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  return user.name || user.email.split('@')[0] || user.email;
});

const pageTitle = computed(() => {
  if (route.name === 'dashboard-home') return 'Site Settings';
  const path = route.path;
  if (path.includes('/projects/add')) return 'Add Project';
  if (path.includes('/projects')) return 'Projects';
  return 'Dashboard';
});

const handleOutsideClick = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener("click", handleOutsideClick);
});

onUnmounted(() => {
  window.removeEventListener("click", handleOutsideClick);
});

const handleLogout = async () => {
  await authStore.logout();
  router.push('/admin-login');
};
</script>

<template>
  <header
    class="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-background/80 backdrop-blur-md border-b border-border/10 dark:border-white/5 transition-all duration-300">
    <!-- Left: Sidebar Toggle & Page Title -->
    <div class="flex items-center gap-4">
      <!-- Mobile Hamburger Button -->
      <button @click="emit('toggle-mobile-sidebar')"
        class="block md:hidden p-2 rounded-lg hover:bg-secondary dark:hover:bg-primary/20 text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
        aria-label="Toggle Mobile Menu">
        <PhList :size="22" />
      </button>

      <button @click="emit('toggle-sidebar')"
        class="hidden md:block p-2 rounded-lg hover:bg-secondary dark:hover:bg-primary/20 text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
        aria-label="Toggle Sidebar">
        <PhCaretLeft v-if="!sidebarCollapsed" :size="22" />
        <PhCaretRight v-else :size="22" />
      </button>

      <!-- Title / Breadcrumb -->
      <h5>
        {{ pageTitle }}
      </h5>
    </div>

    <!-- Right: Theme Toggle & User Info -->
    <div class="flex items-center gap-4">
      <!-- Theme Toggle -->
      <button @click="theme.toggle"
        class="p-2.5 rounded-lg hover:bg-secondary dark:hover:bg-primary/20 text-foreground/80 hover:text-foreground transition-colors cursor-pointer border border-transparent md:border-border/10 dark:md:border-white/5"
        aria-label="Toggle Theme">
        <PhMoonStars v-if="theme.activeTheme === 'light'" :size="18" />
        <PhSunDim v-if="theme.activeTheme === 'dark'" :size="18" />
      </button>

      <!-- User Dropdown Menu -->
      <div ref="dropdownRef" class="relative">
        <button @click="isDropdownOpen = !isDropdownOpen"
          class="flex items-center gap-2 p-1.5 rounded-lg hover:bg-secondary dark:hover:bg-primary/20 transition-all cursor-pointer focus:outline-none">
          <!-- User initials circle avatar -->
          <div
            class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white font-bold text-sm tracking-wider shadow-sm select-none">
            {{ userInitials }}
          </div>
          <span class="hidden sm:block text-sm font-medium text-foreground/80 hover:text-foreground select-none">
            {{ userFullName }}
          </span>
        </button>

        <!-- Dropdown Card -->
        <transition enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0">
          <div v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-56 rounded-lg bg-background border border-border/20 dark:border-white/10 shadow-lg py-1.5 focus:outline-none z-50 backdrop-blur-lg">
            <!-- User Info Summary -->
            <div class="px-4 py-2 border-b border-border/10 dark:border-white/5 select-none">
              <p class="text-xs text-foreground/50 font-medium uppercase tracking-wider">Signed in as</p>
              <p class="text-sm font-semibold text-foreground truncate mt-0.5">{{ userFullName }}</p>
              <p class="text-xs text-foreground/60 truncate mt-0.5">{{ authStore.user?.email }}</p>
              <span
                class="inline-block mt-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-primary/10 text-primary">
                {{ authStore.user?.role || 'User' }}
              </span>
            </div>

            <!-- Action Links -->
            <div class="py-1">
              <router-link to="/"
                class="flex items-center gap-2.5 px-4 py-2 text-sm text-foreground/80 hover:bg-secondary dark:hover:bg-primary/20 transition-colors"
                @click="isDropdownOpen = false">
                <PhHouse :size="16" />
                <span>Go to Website</span>
              </router-link>
            </div>

            <div class="border-t border-border/10 dark:border-white/5 my-1"></div>

            <!-- Logout -->
            <div class="py-0.5">
              <button @click="handleLogout"
                class="flex items-center gap-2.5 w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer">
                <PhSignOut :size="16" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>
