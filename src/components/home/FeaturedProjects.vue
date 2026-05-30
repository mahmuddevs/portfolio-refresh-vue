<script setup lang="ts">
import SectionHeading from '../common/SectionHeading.vue';
import ProjectCard from '../common/ProjectCard.vue';
import projects from '@/utils/projects';
import Button from '../common/Button.vue';
import { PhArrowRight } from '@phosphor-icons/vue';
import { computed } from 'vue';

// Get only the featured projects (limit to 3 for clean display)
const featuredProjects = computed(() =>
  projects.filter(project => project.featured).slice(0, 3)
);
</script>

<template>
  <section class="sec-margin sec-padding border-y border-border/10 dark:border-white/5 relative overflow-hidden">
    <!-- Subtle Background Glows -->
    <div
      class="absolute top-1/3 left-1/4 -translate-x-1/2 w-87.5 h-87.5 bg-primary/5 rounded-full blur-[100px] pointer-events-none">
    </div>
    <div
      class="absolute bottom-1/3 right-1/4 translate-x-1/2 w-87.5 h-87.5 bg-primary/5 rounded-full blur-[100px] pointer-events-none">
    </div>

    <div class="cont space-y-12">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <SectionHeading>
          <template #subheading>Portfolio</template>
          <template #heading>
            <h2 class="capitalize">Featured Projects</h2>
          </template>
          <template #paragraph>
            <p class="max-w-2xl text-foreground/70 dark:text-foreground/60">
              A curated selection of modern, high-performance web applications built with Vue, React, Next.js, and
              Node.js.
            </p>
          </template>
        </SectionHeading>

        <router-link to="/projects" class="hidden lg:block">
          <Button type="secondary" class="px-4! py-2.5! text-sm">
            View All Projects
            <template #posticon>
              <PhArrowRight :size="16" class="group-hover:translate-x-1 transition-transform" />
            </template>
          </Button>
        </router-link>
      </div>

      <!-- Project Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-0!">
        <div v-for="project in featuredProjects" :key="project.id" class="h-full">
          <router-link :to="'/projects/' + project.slug">
            <ProjectCard :project="project" />
          </router-link>
        </div>
      </div>

      <!-- Mobile Call to Action Button -->
      <div class="flex justify-center lg:hidden pt-4 w-fit mx-auto">
        <router-link to="/projects" class="w-full">
          <Button type="secondary" class="w-full justify-center">
            View All Projects
            <template #posticon>
              <PhArrowRight :size="18" class="group-hover:translate-x-1 transition-transform" />
            </template>
          </Button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Any custom local styles */
</style>
