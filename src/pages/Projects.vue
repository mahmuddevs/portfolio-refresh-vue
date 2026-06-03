<script lang="ts" setup>
import { ref, computed } from 'vue';
import SectionHeading from '@/components/common/SectionHeading.vue';
import ProjectCard from '@/components/common/ProjectCard.vue';
import Pagination from '@/components/common/Pagination.vue';
import NoData from '@/components/common/NoData.vue';
import { PhSpinner } from '@phosphor-icons/vue';
import { useGetQuery } from '@/composables/useGetQuery';

const currentPage = ref(1);
const limit = 6;

const { data, isLoading } = useGetQuery<any>({
  url: '/projects',
  queryParams: () => ({
    page: currentPage.value,
    limit,
    sort: '-createdAt',
  }),
  keys: [currentPage],
});

const projects = computed(() => data.value?.projects || []);
const totalPages = computed(() => data.value?.meta?.totalPages || 1);

const changePage = (pageNum: number) => {
  currentPage.value = pageNum;
};
</script>

<template>
  <div class="relative py-12 sm:py-16 md:py-24 overflow-hidden">
    <!-- Premium Backdrop Glow Elements -->
    <div
      class="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none">
    </div>
    <div
      class="absolute bottom-1/4 right-1/4 translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none">
    </div>

    <div class="cont space-y-12 sm:space-y-16">
      <!-- Section Heading -->
      <SectionHeading :center="true">
        <template #subheading>Portfolio</template>
        <template #heading>
          <h2 class="capitalize">
            All My <span>Projects</span>
          </h2>
        </template>
        <template #paragraph>
          <p
            class="max-w-2xl mx-auto text-foreground/70 dark:text-foreground/60 leading-relaxed text-center text-sm sm:text-base md:text-lg">
            Discover a showcase of modern web architectures, customized developer tools, analytics consoles, and
            interactive experiences crafted with precision.
          </p>
        </template>
      </SectionHeading>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 space-y-3">
        <PhSpinner class="animate-spin text-primary" :size="36" />
        <p class="text-sm text-foreground/60 font-medium">Loading projects...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="projects.length === 0" class="py-6">
        <NoData
          title="No Projects Found"
          message="There are no projects in the portfolio yet. Please check back later!"
        />
      </div>

      <div v-else class="space-y-12 sm:space-y-16">
        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="project in projects" :key="project.slug" class="h-full">
            <ProjectCard :project="project" />
          </div>
        </div>

        <!-- Reusable Premium Pagination Controls -->
        <Pagination :currentPage="currentPage" :totalPages="totalPages" @pageChange="changePage" />
      </div>
    </div>
  </div>
</template>
