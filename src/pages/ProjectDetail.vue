<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { PhArrowLeft } from '@phosphor-icons/vue';
import Button from '@/components/common/Button.vue';
import projectsData from '@/utils/projects';

// Import newly structured project detail sub-components
import DetailHeader from '@/components/project-details/DetailHeader.vue';
import DetailImage from '@/components/project-details/DetailImage.vue';
import DetailContent from '@/components/project-details/DetailContent.vue';
import DetailSidebar from '@/components/project-details/DetailSidebar.vue';

const route = useRoute();

// Additional details scaffolding that can be easily customized or expanded in the utils/projects.ts schema
const project = computed(() => {
  const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;
  const p = projectsData.find(item => item.slug === slug);
  if (!p) return null;

  return {
    ...p,
    // Add additional metadata fields with defaults (customizable in the database schema)
    role: "Lead Frontend Developer",
    timeline: "3 Months (Q1 2026)",
    client: "Showcase & Open Source",
    overview: p.description + " Developed with focus on exceptional user interactions, visual depth, and responsive layouts.",
    challenges: "Building a high-performance interactive interface with real-time feedback and state preservation. Optimizing component renders under high load, and maintaining an exceptionally premium glassmorphic styling contour across all mobile devices.",
    solution: "Leveraged Vue's reactive ecosystem alongside high-end modular component architecture. Implemented responsive event listeners, custom utility states, and applied modern CSS properties with tailored radial blur configurations.",
    features: [
      "Dynamic interactive layout components",
      "Frosted-glass design system with harmonized color accents",
      "Fully responsive architecture optimized for mobile platforms",
      "State preservation and smooth visual animations"
    ]
  };
});
</script>

<template>
  <div class="relative py-12 sm:py-16 md:py-24 overflow-hidden min-h-screen">
    <!-- Premium Backdrop Glow Accents -->
    <div
      class="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none">
    </div>
    <div
      class="absolute bottom-1/4 right-1/4 translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none">
    </div>

    <!-- Main Container -->
    <div class="cont space-y-12 sm:space-y-16">

      <!-- Back Link -->
      <div class="flex">
        <router-link to="/projects"
          class="inline-flex items-center gap-2 text-sm font-semibold text-foreground/60 hover:text-primary transition-colors group">
          <PhArrowLeft :size="18" class="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </router-link>
      </div>

      <!-- Project Found State -->
      <div v-if="project" class="space-y-12 sm:space-y-16">

        <!-- Header Showcase area -->
        <DetailHeader
          :title="project.title"
          :overview="project.overview"
          :client="project.client"
          :role="project.role"
          :timeline="project.timeline"
        />

        <!-- Image Mockup Showcase -->
        <DetailImage
          :image="project.image"
          :title="project.title"
          :liveUrl="project.liveUrl"
        />

        <!-- Double Column Content block -->
        <div class="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-12 sm:gap-16">
          <DetailContent
            :challenges="project.challenges"
            :solution="project.solution"
            :features="project.features"
          />
          <DetailSidebar
            :title="project.title"
            :tags="project.tags"
            :githubFrontendUrl="project.githubFrontendUrl"
            :githubBackendUrl="project.githubBackendUrl"
            :liveUrl="project.liveUrl"
          />
        </div>

      </div>

      <!-- Project Not Found State -->
      <div v-else class="text-center py-16 space-y-6">
        <h4 class="capitalize">Project Not Found</h4>
        <p class="text-foreground/60 max-w-md mx-auto">
          The project detail page you are trying to view does not exist or has been relocated.
        </p>
        <router-link to="/projects" class="inline-block">
          <Button type="primary">
            <template #preicon>
              <PhArrowLeft :size="18" />
            </template>
            <span>Back to Portfolio</span>
          </Button>
        </router-link>
      </div>

    </div>
  </div>
</template>

<style scoped>
</style>
