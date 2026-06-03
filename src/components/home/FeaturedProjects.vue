<script setup lang="ts">
import SectionHeading from '../common/SectionHeading.vue';
import ProjectCard from '../common/ProjectCard.vue';
import NoData from '../common/NoData.vue';
import Button from '../common/Button.vue';
import { PhArrowRight, PhSpinner } from '@phosphor-icons/vue';
import { computed } from 'vue';
import { useGetQuery } from '@/composables/useGetQuery';

// Fetch featured projects from database (up to 3 items)
const { data, isLoading } = useGetQuery<any>({
  url: '/projects',
  queryParams: {
    featured: true,
    limit: 3,
    sort: '-createdAt',
  },
});

const featuredProjects = computed(() => data.value?.projects || []);
</script>

<template>
  <section class="sec-padding border-y border-border/10 dark:border-white/5 relative overflow-hidden">
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

      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-16 space-y-3">
        <PhSpinner class="animate-spin text-primary" :size="32" />
        <p class="text-sm text-foreground/60 font-medium">Loading featured projects...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="featuredProjects.length === 0" class="py-6">
        <NoData title="No Featured Projects"
          message="There are no featured projects highlighting right now. Explore all projects using the link below!" />
      </div>

      <!-- Project Cards Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-0!">
        <div v-for="project in featuredProjects" :key="project.slug" class="h-full">
          <router-link :to="'/projects/' + project.slug">
            <ProjectCard :project="project" />
          </router-link>
        </div>
      </div>

      <!-- Mobile Call to Action Button -->
      <div v-if="!isLoading && featuredProjects.length > 0" class="flex justify-center lg:hidden pt-4 w-fit mx-auto">
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
