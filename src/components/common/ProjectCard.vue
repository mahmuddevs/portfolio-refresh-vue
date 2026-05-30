<script setup lang="ts">
import { type Project } from '@/utils/projects';
import { PhEye, PhArrowUpRight } from '@phosphor-icons/vue';
import ExternalLink from './ExternalLink.vue';

defineProps<{
  project: Project;
}>();
</script>

<template>
  <article
    class="group relative flex flex-col h-full bg-secondary/30 dark:bg-secondary/20 border border-border/10 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/5 dark:hover:shadow-primary/10 transition-all duration-500 ease-out hover:-translate-y-2">
    <!-- Project Image Container -->
    <div class="relative overflow-hidden aspect-video w-full bg-secondary/50 dark:bg-secondary/40">
      <img :src="project.image" :alt="project.title"
        class="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
        loading="lazy" />

      <!-- Premium Dark Hover Overlay with Quick Actions -->
      <div
        class="absolute inset-0 bg-linear-to-t from-background/95 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex items-end justify-between p-6">
        <span
          class="text-xs font-bold tracking-wider uppercase text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 backdrop-blur-xs">
          Interactive Mockup
        </span>
      </div>
    </div>

    <!-- Project Details -->
    <div class="flex-1 flex flex-col p-6 @container">
      <h4 class="text-foreground group-hover:text-primary transition-colors duration-300">
        {{ project.title }}
      </h4>

      <p class="mt-3 text-sm sm:text-base text-foreground/70 dark:text-foreground/60 flex-1 leading-relaxed">
        {{ project.description }}
      </p>

      <!-- Tags List -->
      <div class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/10 dark:border-white/5">
        <span v-for="tag in project.tags" :key="tag"
          class="px-2.5 py-1 text-xs font-semibold rounded-md bg-background border border-border/20 dark:border-white/5 text-foreground/80 dark:text-foreground/75 hover:border-primary/50 dark:hover:border-primary/50 transition-colors duration-300">
          {{ tag }}
        </span>
      </div>

      <!-- Action Buttons -->
      <div
        class="flex flex-col @xs:flex-row items-center gap-3 mt-6 pt-4 border-t border-border/10 dark:border-white/5">
        <router-link :to="'/projects/' + project.slug"
          class="w-full flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border/20 dark:border-white/10 text-sm font-semibold hover:bg-secondary dark:hover:bg-white/5 hover:text-primary dark:hover:text-primary transition-all duration-300 ease-in-out">
          <PhEye :size="18" />
          <span>View Details</span>
        </router-link>
        <ExternalLink :href="project.liveUrl" :ariaLabel="`View Live Demo for ${project.title}`"
          class="w-full flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 ease-in-out">
          <span>Live Demo</span>
          <PhArrowUpRight :size="16" />
        </ExternalLink>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* Any local component styling (if needed) */
</style>
