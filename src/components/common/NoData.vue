<script setup lang="ts">
import { PhFolderOpen } from '@phosphor-icons/vue';
import type { Component } from 'vue';

defineProps<{
  title?: string;
  message?: string;
  icon?: Component;
}>();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center py-12 px-6 text-center space-y-4 rounded-xl border border-border/10 dark:border-white/5 bg-secondary/10 dark:bg-white/2 backdrop-blur-md max-w-md mx-auto my-8">
    <div
      class="p-4.5 rounded-full bg-secondary/30 dark:bg-white/5 border border-border/10 dark:border-white/5 text-primary">
      <component :is="icon || PhFolderOpen" :size="36" />
    </div>
    <div class="space-y-1.5">
      <h6 class="font-bold text-foreground leading-tight">{{ title || 'No Data Available' }}</h6>
      <p class="text-xs text-foreground/55 max-w-70 leading-relaxed">
        {{ message || 'There are no items to display at the moment. Please check back later.' }}
      </p>
    </div>
  </div>
</template>
