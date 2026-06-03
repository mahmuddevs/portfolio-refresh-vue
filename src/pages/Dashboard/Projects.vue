<script lang="ts" setup>
import { ref } from 'vue';
import { useGetQuery } from '@/composables/useGetQuery';
import { useQueryMutation } from '@/composables/useQueryMutation';
import Pagination from '@/components/common/Pagination.vue';
import {
  PhPlus,
  PhEye,
  PhPencil,
  PhTrash,
  PhSpinner,
  PhX,
  PhFolderOpen,
  PhLink,
  PhGithubLogo,
  PhCalendar,
  PhUser,
  PhWarning,
} from '@phosphor-icons/vue';

// 1. Pagination & Fetch State
const currentPage = ref(1);
const limit = 10;

const {
  data: responseData,
  isLoading,
  isFetching,
  refetch,
} = useGetQuery<any>({
  url: '/projects',
  isPrivate: true,
  queryParams: () => ({
    page: currentPage.value,
    limit,
    sort: '-createdAt',
  }),
  keys: [currentPage],
});

// 2. Delete Mutation
const deleteMutation = useQueryMutation<any, any, string>({
  url: (slug) => `/projects/${slug}`,
  method: 'DELETE',
  isPrivate: true,
  mutationOptions: {
    onSuccess: () => {
      successMessage.value = 'Project deleted successfully.';
      showDeleteModal.value = false;
      selectedProjectForDelete.value = null;
      // If current page is empty now, go back one page if possible
      if (
        responseData.value?.projects?.length === 1 &&
        currentPage.value > 1
      ) {
        currentPage.value -= 1;
      } else {
        refetch();
      }
    },
    onError: (err: any) => {
      errorMessage.value = err.message || 'Failed to delete project.';
      showDeleteModal.value = false;
      selectedProjectForDelete.value = null;
    },
  },
});

// Modals & Action State
const successMessage = ref('');
const errorMessage = ref('');

// Preview Modal State
const showPreviewModal = ref(false);
const selectedProjectForPreview = ref<any>(null);

// Delete Modal State
const showDeleteModal = ref(false);
const selectedProjectForDelete = ref<any>(null);

// Open Preview Modal
const openPreview = (project: any) => {
  selectedProjectForPreview.value = project;
  showPreviewModal.value = true;
};

// Close Preview Modal
const closePreview = () => {
  showPreviewModal.value = false;
  selectedProjectForPreview.value = null;
};

// Open Delete Modal
const openDelete = (project: any) => {
  selectedProjectForDelete.value = project;
  showDeleteModal.value = true;
};

// Close Delete Modal
const closeDelete = () => {
  showDeleteModal.value = false;
  selectedProjectForDelete.value = null;
};

// Trigger Delete
const confirmDelete = async () => {
  if (selectedProjectForDelete.value) {
    errorMessage.value = '';
    successMessage.value = '';
    await deleteMutation.mutateAsync(selectedProjectForDelete.value.slug);
  }
};

// Handle Pagination page change
const handlePageChange = (page: number) => {
  currentPage.value = page;
};
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-12">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h4>Manage Projects</h4>
        <p class="text-sm text-foreground/50">Overview of all portfolio projects. View details, edit information, or
          remove entries.</p>
      </div>

      <router-link to="/dashboard/projects/add"
        class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-lg shadow-sm shadow-primary/20 hover:shadow-md transition-all duration-300 cursor-pointer">
        <PhPlus :size="18" />
        <span>Add Project</span>
      </router-link>
    </div>

    <!-- Alert Notifications -->
    <transition name="fade">
      <div v-if="errorMessage"
        class="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center justify-between">
        <span>{{ errorMessage }}</span>
        <button @click="errorMessage = ''" class="text-red-500 hover:opacity-85 transition-opacity">
          <PhX :size="16" />
        </button>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="successMessage"
        class="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm flex items-center justify-between">
        <span>{{ successMessage }}</span>
        <button @click="successMessage = ''" class="text-emerald-500 hover:opacity-85 transition-opacity">
          <PhX :size="16" />
        </button>
      </div>
    </transition>

    <!-- Main Table Card Container -->
    <div
      class="p-6 rounded-xl bg-background/50 border border-border/10 dark:border-white/5 backdrop-blur-md shadow-lg overflow-hidden">
      <!-- Loading Skeleton Loader -->
      <div v-if="isLoading" class="space-y-4">
        <div class="h-10 bg-secondary/30 dark:bg-white/5 rounded-lg animate-pulse"></div>
        <div v-for="i in 5" :key="i" class="flex gap-4 items-center py-4 border-b border-border/10">
          <div class="w-16 h-10 bg-secondary/30 dark:bg-white/5 rounded-md animate-pulse"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-secondary/30 dark:bg-white/5 rounded w-1/4 animate-pulse"></div>
            <div class="h-3 bg-secondary/30 dark:bg-white/5 rounded w-1/6 animate-pulse"></div>
          </div>
          <div class="w-24 h-4 bg-secondary/30 dark:bg-white/5 rounded animate-pulse"></div>
          <div class="w-24 h-4 bg-secondary/30 dark:bg-white/5 rounded animate-pulse"></div>
          <div class="w-20 h-8 bg-secondary/30 dark:bg-white/5 rounded animate-pulse"></div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!responseData?.projects || responseData.projects.length === 0"
        class="flex flex-col items-center justify-center py-16 text-center space-y-4">
        <div class="p-4 rounded-full bg-secondary/40 text-foreground/50 border border-border/10">
          <PhFolderOpen :size="40" />
        </div>
        <div class="max-w-md">
          <h6>No Projects Found</h6>
          <p class="text-xs text-foreground/50 mt-1">Get started by creating your very first project to show off on your
            portfolio.</p>
        </div>
        <router-link to="/dashboard/projects/add"
          class="px-4 py-2 bg-primary hover:bg-primary/95 text-white text-xs font-semibold rounded-lg shadow-sm shadow-primary/20 hover:shadow-md transition-all cursor-pointer">
          Add New Project
        </router-link>
      </div>

      <!-- Projects List Table -->
      <div v-else class="overflow-x-auto relative">
        <div v-if="isFetching && !isLoading"
          class="absolute inset-0 bg-background/20 dark:bg-black/10 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-lg">
          <div
            class="bg-background/80 dark:bg-secondary/80 border border-border/10 px-4 py-2 rounded-lg flex items-center gap-2 shadow-md">
            <PhSpinner class="animate-spin text-primary" :size="16" />
            <span class="text-xs font-medium">Refreshing list...</span>
          </div>
        </div>

        <table class="w-full text-left border-collapse min-w-210 table-fixed">
          <thead>
            <tr class="border-b border-border/10 text-foreground/50 text-[11px] font-semibold uppercase tracking-wider">
              <th class="pb-3 pl-1 w-75">Project</th>
              <th class="pb-3 w-45">Role</th>
              <th class="pb-3 w-35">Timeline</th>
              <th class="pb-3 text-center w-25">Status</th>
              <th class="pb-3 pr-1 text-right w-30">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/10">
            <tr v-for="project in responseData.projects" :key="project.slug"
              class="group hover:bg-secondary/20 dark:hover:bg-white/2 transition-colors">
              <!-- Thumbnail & Title -->
              <td class="py-4 pl-1 w-75">
                <div class="flex items-center gap-3.5">
                  <div class="w-16 h-10 rounded-lg overflow-hidden border border-border/10 bg-secondary/30 shrink-0">
                    <img v-if="project.images && project.images[0]" :src="project.images[0]" alt="Thumbnail"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div v-else class="w-full h-full flex items-center justify-center text-foreground/30">
                      <PhFolderOpen :size="20" />
                    </div>
                  </div>
                  <div class="min-w-0 flex-1">
                    <button @click="openPreview(project)"
                      class="text-sm font-semibold hover:text-primary transition-colors block cursor-pointer text-left focus:outline-none whitespace-normal wrap-break-word">
                      {{ project.title }}
                    </button>
                    <span class="text-[10px] text-foreground/45 font-mono block select-all truncate">{{ project.slug
                    }}</span>
                  </div>
                </div>
              </td>

              <!-- Role -->
              <td class="py-4 text-sm text-foreground/75 font-medium w-45 whitespace-nowrap">
                {{ project.role }}
              </td>

              <!-- Timeline -->
              <td class="py-4 text-sm text-foreground/75 w-35 whitespace-nowrap">
                {{ project.timeline }}
              </td>

              <!-- Featured badge -->
              <td class="py-4 text-center w-25 whitespace-nowrap">
                <span v-if="project.featured"
                  class="inline-flex items-center bg-primary/10 text-primary border border-primary/20 text-[10px] px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                  Featured
                </span>
                <span v-else
                  class="inline-flex items-center bg-secondary/40 text-foreground/45 border border-border/10 text-[10px] px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                  Standard
                </span>
              </td>

              <!-- Actions -->
              <td class="py-4 pr-1 text-right w-30 whitespace-nowrap">
                <div class="inline-flex items-center gap-1">
                  <!-- View Details -->
                  <button @click="openPreview(project)"
                    class="p-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-secondary border border-transparent hover:border-border/10 transition-all cursor-pointer"
                    title="View Details">
                    <PhEye :size="16" />
                  </button>

                  <!-- Update -->
                  <router-link :to="`/dashboard/projects/edit/${project.slug}`"
                    class="p-2 rounded-lg text-foreground/60 hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all inline-flex items-center justify-center cursor-pointer"
                    title="Update Project">
                    <PhPencil :size="16" />
                  </router-link>

                  <!-- Delete -->
                  <button @click="openDelete(project)"
                    class="p-2 rounded-lg text-foreground/60 hover:text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/25 transition-all cursor-pointer"
                    title="Delete Project">
                    <PhTrash :size="16" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Component Integration -->
      <div v-if="responseData?.meta && responseData.meta.totalPages > 1" class="pt-6">
        <Pagination :current-page="currentPage" :total-pages="responseData.meta.totalPages"
          @page-change="handlePageChange" />
      </div>
    </div>

    <!-- Preview Modal -->
    <transition name="fade">
      <div v-if="showPreviewModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closePreview"></div>

        <!-- Modal Box -->
        <div
          class="relative bg-background border border-border/10 dark:border-white/5 rounded-xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden z-10 transition-transform duration-300 scale-100">
          <!-- Modal Header -->
          <div
            class="flex items-center justify-between p-5 border-b border-border/10 dark:border-white/5 bg-secondary/20">
            <div class="flex items-center gap-3">
              <span class="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
                <PhFolderOpen :size="20" />
              </span>
              <div>
                <h6 class="font-bold leading-tight">{{ selectedProjectForPreview?.title }}</h6>
                <span class="text-[10px] text-foreground/45 font-mono select-all">{{ selectedProjectForPreview?.slug
                }}</span>
              </div>
            </div>
            <button @click="closePreview"
              class="p-1.5 rounded-lg hover:bg-secondary text-foreground/50 hover:text-foreground transition-all cursor-pointer">
              <PhX :size="18" />
            </button>
          </div>

          <!-- Modal Body (Scrollable) -->
          <div class="flex-1 overflow-y-auto p-6 space-y-6">
            <!-- Project Image Gallery -->
            <div v-if="selectedProjectForPreview?.images && selectedProjectForPreview.images.length > 0"
              class="space-y-2">
              <span class="text-xs font-semibold text-foreground/75 uppercase tracking-wider">Project Media</span>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <a v-for="(img, idx) in selectedProjectForPreview.images" :key="idx" :href="img" target="_blank"
                  rel="noopener noreferrer"
                  class="relative aspect-video rounded-lg overflow-hidden border border-border/10 hover:border-primary/50 group">
                  <img :src="img" alt="Project Media"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span
                    class="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-[9px] text-white rounded font-mono">#{{
                      Number(idx) + 1 }}</span>
                </a>
              </div>
            </div>

            <!-- Basic Metadata Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                class="flex items-center gap-3 p-4 rounded-xl bg-secondary/20 dark:bg-white/2 border border-border/5">
                <span class="p-2.5 rounded-lg bg-background text-foreground/70">
                  <PhUser :size="18" />
                </span>
                <div>
                  <p class="text-[10px] text-foreground/45 uppercase tracking-wider font-semibold">Your Role</p>
                  <p class="text-sm font-medium">{{ selectedProjectForPreview?.role }}</p>
                </div>
              </div>
              <div
                class="flex items-center gap-3 p-4 rounded-xl bg-secondary/20 dark:bg-white/2 border border-border/5">
                <span class="p-2.5 rounded-lg bg-background text-foreground/70">
                  <PhCalendar :size="18" />
                </span>
                <div>
                  <p class="text-[10px] text-foreground/45 uppercase tracking-wider font-semibold">Timeline</p>
                  <p class="text-sm font-medium">{{ selectedProjectForPreview?.timeline }}</p>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="space-y-1.5">
              <span class="text-xs font-semibold text-foreground/75 uppercase tracking-wider">Short Description</span>
              <p
                class="text-sm text-foreground/80 leading-relaxed bg-secondary/10 dark:bg-white/1 p-3.5 rounded-lg border border-border/5">
                {{ selectedProjectForPreview?.description }}
              </p>
            </div>

            <!-- Case Study Sections -->
            <div class="space-y-4">
              <div class="space-y-1.5">
                <span class="text-xs font-semibold text-foreground/75 uppercase tracking-wider">Project Overview</span>
                <p class="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{{
                  selectedProjectForPreview?.overview }}</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <span class="text-xs font-semibold text-red-500/90 uppercase tracking-wider">Challenges
                    Encountered</span>
                  <p
                    class="text-sm text-foreground/80 leading-relaxed whitespace-pre-line bg-red-500/2 border border-red-500/10 p-3 rounded-lg">
                    {{ selectedProjectForPreview?.challenges }}</p>
                </div>
                <div class="space-y-1.5">
                  <span class="text-xs font-semibold text-emerald-500/90 uppercase tracking-wider">Solution
                    Implemented</span>
                  <p
                    class="text-sm text-foreground/80 leading-relaxed whitespace-pre-line bg-emerald-500/2 border border-emerald-500/10 p-3 rounded-lg">
                    {{ selectedProjectForPreview?.solution }}</p>
                </div>
              </div>
            </div>

            <!-- Key Features -->
            <div v-if="selectedProjectForPreview?.features && selectedProjectForPreview.features.length > 0"
              class="space-y-2">
              <span class="text-xs font-semibold text-foreground/75 uppercase tracking-wider">Key Features</span>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 list-none pl-0">
                <li v-for="(feature, idx) in selectedProjectForPreview.features" :key="idx"
                  class="flex items-start gap-2 text-sm text-foreground/85">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>

            <!-- Technologies/Tags -->
            <div v-if="selectedProjectForPreview?.tags && selectedProjectForPreview.tags.length > 0" class="space-y-2">
              <span class="text-xs font-semibold text-foreground/75 uppercase tracking-wider">Technologies Used</span>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="tag in selectedProjectForPreview.tags" :key="tag"
                  class="bg-secondary/60 dark:bg-white/5 border border-border/10 text-xs px-2.5 py-1 rounded-lg font-medium text-foreground/80">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div
            class="flex items-center justify-between p-5 border-t border-border/10 dark:border-white/5 bg-secondary/10">
            <!-- External Site Links -->
            <div class="flex flex-wrap gap-2">
              <!-- Live Site -->
              <a v-if="selectedProjectForPreview?.liveUrl" :href="selectedProjectForPreview.liveUrl" target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-lg text-xs font-semibold hover:bg-primary hover:text-white transition-all cursor-pointer">
                <PhLink :size="14" />
                <span>Live Site</span>
              </a>

              <!-- Github Frontend -->
              <a v-if="selectedProjectForPreview?.githubFrontendUrl" :href="selectedProjectForPreview.githubFrontendUrl"
                target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary hover:bg-secondary/80 border border-border/10 rounded-lg text-xs font-semibold text-foreground/80 hover:text-foreground transition-all cursor-pointer">
                <PhGithubLogo :size="14" />
                <span>Frontend Repo</span>
              </a>

              <!-- Github Backend -->
              <a v-if="selectedProjectForPreview?.githubBackendUrl" :href="selectedProjectForPreview.githubBackendUrl"
                target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary hover:bg-secondary/80 border border-border/10 rounded-lg text-xs font-semibold text-foreground/80 hover:text-foreground transition-all cursor-pointer">
                <PhGithubLogo :size="14" />
                <span>Backend Repo</span>
              </a>
            </div>

            <button @click="closePreview"
              class="px-4 py-2 bg-secondary hover:bg-secondary/85 border border-border/10 rounded-lg text-xs font-semibold transition-all cursor-pointer">
              Close
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Delete Confirmation Modal -->
    <transition name="fade">
      <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeDelete"></div>

        <!-- Modal box -->
        <div
          class="relative bg-background border border-border/10 dark:border-white/5 rounded-xl shadow-2xl max-w-md w-full p-6 space-y-6 z-10 transition-transform duration-300 scale-100">
          <div class="flex items-start gap-4">
            <span class="p-3 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 shrink-0">
              <PhWarning :size="24" />
            </span>
            <div class="space-y-1.5">
              <h6 class="font-bold leading-tight">Delete Project?</h6>
              <p class="text-xs text-foreground/50 leading-relaxed">
                Are you sure you want to delete <span class="font-semibold text-foreground">{{
                  selectedProjectForDelete?.title }}</span>? This action is permanent and cannot be undone.
              </p>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-2">
            <button @click="closeDelete" :disabled="deleteMutation.isPending.value"
              class="px-4 py-2 bg-secondary hover:bg-secondary/85 border border-border/10 rounded-lg text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
              Cancel
            </button>
            <button @click="confirmDelete" :disabled="deleteMutation.isPending.value"
              class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-semibold shadow-sm shadow-red-500/20 hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
              <PhSpinner v-if="deleteMutation.isPending.value" class="animate-spin" :size="14" />
              <span>{{ deleteMutation.isPending.value ? 'Deleting...' : 'Delete' }}</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
