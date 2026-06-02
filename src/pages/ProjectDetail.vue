<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { PhArrowLeft, PhSpinner } from '@phosphor-icons/vue';
import Button from '@/components/common/Button.vue';
import FsLightboxComponent from 'fslightbox-vue';
import { useGetQuery } from '@/composables/useGetQuery';

// Resolve CommonJS default export wrapper for Vite ESM builds
const FsLightbox = (FsLightboxComponent as any).default || FsLightboxComponent;

// Import newly structured project detail sub-components
import DetailHeader from '@/components/project-details/DetailHeader.vue';
import DetailImage from '@/components/project-details/DetailImage.vue';
import DetailContent from '@/components/project-details/DetailContent.vue';
import DetailSidebar from '@/components/project-details/DetailSidebar.vue';

const route = useRoute();
const toggler = ref(false);

const slug = computed(() => {
  const s = route.params.slug;
  return Array.isArray(s) ? s[0] : s;
});

// Fetch project by slug using useGetQuery
const { data: project, isLoading } = useGetQuery<any>({
  url: computed(() => `/projects/${slug.value}`),
  keys: computed(() => [slug.value]),
  enabled: computed(() => !!slug.value),
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

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-24 flex flex-col items-center justify-center space-y-4">
        <PhSpinner class="animate-spin text-primary" :size="48" />
        <p class="text-foreground/50 text-sm">Loading project details...</p>
      </div>

      <!-- Project Found State -->
      <div v-else-if="project" class="space-y-12 sm:space-y-16">

        <!-- Header Showcase area -->
        <DetailHeader
          :title="project.title"
          :overview="project.overview"
          :client="project.client || 'Personal Project'"
          :role="project.role"
          :timeline="project.timeline"
        />

        <!-- Image Mockup Showcase -->
        <DetailImage
          :image="project.images?.[0] || project.image || ''"
          :title="project.title"
          :liveUrl="project.liveUrl"
          @open-lightbox="toggler = !toggler"
        />

        <!-- Lightbox Component -->
        <FsLightbox
          :toggler="toggler"
          :sources="project.images && project.images.length > 0 ? project.images : [project.image || '']"
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
