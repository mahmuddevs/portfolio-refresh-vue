<script lang="ts" setup>
import Button from '@/components/common/Button.vue';
import { PhHouse, PhFolderOpen } from '@phosphor-icons/vue';
</script>

<template>
  <div class="relative min-h-dvh flex items-center justify-center py-16 px-4 overflow-hidden">
    <!-- Premium Backdrop Glow Accents matching the core theme -->
    <div
      class="absolute top-1/4 left-1/3 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none">
    </div>
    <div
      class="absolute bottom-1/4 right-1/3 translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none">
    </div>

    <!-- Center Content Card -->
    <div
      class="relative z-10 max-w-xl w-full text-center space-y-8 p-8 md:p-12 rounded-2xl border border-border/10 dark:border-white/5 bg-background/50 dark:bg-secondary/10 backdrop-blur-xl shadow-2xl">
      <!-- Big Visual 404 Display -->
      <div class="relative select-none">
        <h1
          class="text-8xl sm:text-9xl md:text-[10rem] font-extrabold tracking-tighter bg-linear-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent leading-none drop-shadow-sm">
          404
        </h1>
        <div class="absolute inset-0 bg-primary/20 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      </div>

      <!-- Typography -->
      <div class="space-y-3">
        <h3>Page <span>Not Found</span></h3>
        <p class="text-sm sm:text-base text-foreground/70 dark:text-foreground/60 max-w-md mx-auto leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
      </div>

      <!-- Call to Actions -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <router-link to="/">
          <Button type="primary" class="w-full sm:w-auto">
            <template #preicon>
              <PhHouse :size="18" />
            </template>
            Back to Home
          </Button>
        </router-link>

        <router-link to="/projects">
          <Button type="secondary" class="w-full sm:w-auto">
            <template #preicon>
              <PhFolderOpen :size="18" />
            </template>
            View Projects
          </Button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom animations or transitions if necessary */
</style>
