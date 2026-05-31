<script lang="ts" setup>
import { PhCpu, PhCalendar, PhUser } from '@phosphor-icons/vue';

defineProps<{
  title: string;
  overview: string;
  client: string;
  role: string;
  timeline: string;
}>();
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
    <div class="space-y-4">
      <div class="text-sm font-bold tracking-wider text-primary uppercase">
        Project Showcase
      </div>
      <h2 class="capitalize">
        {{ title.split(' - ')[0] }} <span>{{ title.split(' - ')[1] || '' }}</span>
      </h2>
      <p class="text-base sm:text-lg text-foreground/75 leading-relaxed max-w-3xl">
        {{ overview }}
      </p>
    </div>

    <!-- Quick Meta Panel -->
    <div class="bg-secondary/40 dark:bg-secondary/20 border border-border/10 dark:border-white/5 rounded-2xl p-6 space-y-4 shadow-sm backdrop-blur-xs font-sans">
      <div class="flex items-center gap-3.5 text-sm text-foreground/80">
        <PhUser class="text-primary" :size="20" />
        <div>
          <span class="block text-xs text-foreground/40 font-semibold uppercase tracking-wider">Client</span>
          <span class="font-semibold">{{ client }}</span>
        </div>
      </div>
      <div class="flex items-center gap-3.5 text-sm text-foreground/80">
        <PhCpu class="text-primary" :size="20" />
        <div>
          <span class="block text-xs text-foreground/40 font-semibold uppercase tracking-wider">Role</span>
          <span class="font-semibold">{{ role }}</span>
        </div>
      </div>
      <div class="flex items-center gap-3.5 text-sm text-foreground/80">
        <PhCalendar class="text-primary" :size="20" />
        <div>
          <span class="block text-xs text-foreground/40 font-semibold uppercase tracking-wider">Timeline</span>
          <span class="font-semibold">{{ timeline }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
