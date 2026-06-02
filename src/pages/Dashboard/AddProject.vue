<script lang="ts" setup>
import { ref, watch, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQueryMutation } from '@/composables/useQueryMutation';
import {
  PhArrowLeft,
  PhUploadSimple,
  PhX,
  PhPlus,
  PhSpinner,
} from '@phosphor-icons/vue';

const router = useRouter();

// Form State
const title = ref('');

const description = ref('');
const role = ref('');
const timeline = ref('');
const liveUrl = ref('');
const githubFrontendUrl = ref('');
const githubBackendUrl = ref('');
const featured = ref(false);
const overview = ref('');
const challenges = ref('');
const solution = ref('');
const tagsInput = ref(''); // Comma-separated tags

// Dynamic Features List
const features = ref<string[]>([]);
const newFeature = ref('');

const addFeature = () => {
  if (newFeature.value.trim()) {
    features.value.push(newFeature.value.trim());
    newFeature.value = '';
  }
};

const removeFeature = (index: number) => {
  features.value.splice(index, 1);
};



// Image Upload Previews
const imageFiles = ref<File[]>([]);
const imagePreviews = ref<string[]>([]);
const isDragging = ref(false);

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files) {
    addFiles(Array.from(target.files));
  }
};

const addFiles = (files: File[]) => {
  const imageFilesOnly = files.filter((file) => file.type.startsWith('image/'));
  for (const file of imageFilesOnly) {
    imageFiles.value.push(file);
    imagePreviews.value.push(URL.createObjectURL(file));
  }
};

const removeFile = (index: number) => {
  imageFiles.value.splice(index, 1);
  URL.revokeObjectURL(imagePreviews.value[index] || '');
  imagePreviews.value.splice(index, 1);
};

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = true;
};

const handleDragLeave = () => {
  isDragging.value = false;
};

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = false;
  if (e.dataTransfer?.files) {
    addFiles(Array.from(e.dataTransfer.files));
  }
};

// Cleanup URLs on unmount
onUnmounted(() => {
  imagePreviews.value.forEach((url) => URL.revokeObjectURL(url));
});

// Form Submission
const { mutateAsync, isPending } = useQueryMutation<any, any, FormData>({
  url: '/projects/add',
  method: 'POST',
  isPrivate: true,
});

const loading = isPending;
const errorMessage = ref('');
const successMessage = ref('');

const handleSubmit = async () => {
  if (imageFiles.value.length === 0) {
    errorMessage.value = 'At least one project image is required.';
    return;
  }

  errorMessage.value = '';
  successMessage.value = '';

  try {
    const formData = new FormData();
    formData.append('title', title.value);

    formData.append('description', description.value);
    formData.append('role', role.value);
    formData.append('timeline', timeline.value);
    formData.append('liveUrl', liveUrl.value);

    if (githubFrontendUrl.value) {
      formData.append('githubFrontendUrl', githubFrontendUrl.value);
    }
    if (githubBackendUrl.value) {
      formData.append('githubBackendUrl', githubBackendUrl.value);
    }

    formData.append('featured', String(featured.value));
    formData.append('overview', overview.value);
    formData.append('challenges', challenges.value);
    formData.append('solution', solution.value);

    // Parse tags to array before appending
    const tagsArray = tagsInput.value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    formData.append('tags', JSON.stringify(tagsArray));

    // Append features array
    formData.append('features', JSON.stringify(features.value));

    // Append multiple files
    imageFiles.value.forEach((file) => {
      formData.append('images', file);
    });

    await mutateAsync(formData);

    successMessage.value = 'Project added successfully! Redirecting...';
    setTimeout(() => {
      router.push('/dashboard/projects');
    }, 1500);
  } catch (err: any) {
    console.error(err);
    errorMessage.value = err.message || 'Failed to add project. Please try again.';
  }
};
</script>

<template>
  <div class="space-y-6 max-w-6xl mx-auto pb-12">
    <!-- Header Controls -->
    <div>
      <h4>Add New Project</h4>
      <p class="text-sm text-foreground/50">Upload and configure a new project card for your portfolio.</p>
    </div>

    <!-- Alert Messaging -->
    <transition name="fade">
      <div v-if="errorMessage" class="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
        {{ errorMessage }}
      </div>
    </transition>
    <transition name="fade">
      <div v-if="successMessage"
        class="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm">
        {{ successMessage }}
      </div>
    </transition>

    <!-- Two-Column Form -->
    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Left Column: Primary Content (Span 2) -->
      <div class="lg:col-span-2 space-y-6">

        <!-- Details Card -->
        <div
          class="p-6 rounded-xl bg-background/50 border border-border/10 dark:border-white/5 backdrop-blur-md space-y-4">
          <h5>Project Basics</h5>

          <!-- Title -->
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground/75 uppercase tracking-wider">Project Title *</label>
            <input v-model="title" type="text" required placeholder="E.g., Sales Dashboard"
              class="w-full px-3 py-2.5 rounded-lg border border-border/20 dark:border-white/5 bg-background/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm" />
          </div>

          <!-- Description -->
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground/75 uppercase tracking-wider">Short Description *</label>
            <textarea v-model="description" required rows="3"
              placeholder="Provide a concise 2-3 sentence overview of the project's purpose and tech."
              class="w-full px-3 py-2.5 rounded-lg border border-border/20 dark:border-white/5 bg-background/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm resize-none"></textarea>
          </div>
        </div>

        <!-- Case Study Sections -->
        <div
          class="p-6 rounded-xl bg-background/50 border border-border/10 dark:border-white/5 backdrop-blur-md space-y-4">
          <h5>Case Study Details</h5>

          <!-- Overview -->
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground/75 uppercase tracking-wider">Project Overview *</label>
            <textarea v-model="overview" required rows="4"
              placeholder="What problem does this project solve? Describe the overarching goal."
              class="w-full px-3 py-2.5 rounded-lg border border-border/20 dark:border-white/5 bg-background/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm"></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Challenges -->
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-foreground/75 uppercase tracking-wider">Challenges Encountered
                *</label>
              <textarea v-model="challenges" required rows="4"
                placeholder="What bottlenecks, technical hurdles, or blockades did you face?"
                class="w-full px-3 py-2.5 rounded-lg border border-border/20 dark:border-white/5 bg-background/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm"></textarea>
            </div>

            <!-- Solution -->
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-foreground/75 uppercase tracking-wider">Solution Implemented
                *</label>
              <textarea v-model="solution" required rows="4"
                placeholder="How did you resolve those challenges? Mention architectures or designs used."
                class="w-full px-3 py-2.5 rounded-lg border border-border/20 dark:border-white/5 bg-background/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm"></textarea>
            </div>
          </div>
        </div>

        <!-- Features List -->
        <div
          class="p-6 rounded-xl bg-background/50 border border-border/10 dark:border-white/5 backdrop-blur-md space-y-4 @container">
          <h5>Key Features</h5>

          <div class="flex gap-2 @max-xs:flex-col">
            <input v-model="newFeature" type="text" placeholder="E.g., Multi-tenant support, Stripe payments"
              @keydown.enter.prevent="addFeature"
              class="flex-1 px-3 py-2.5 rounded-lg border border-border/20 dark:border-white/5 bg-background/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm" />
            <button type="button" @click="addFeature"
              class="px-4 py-2.5 bg-secondary hover:bg-secondary/80 border border-border/10 text-foreground text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer @max-xs:w-full">
              <PhPlus :size="16" />
              <span>Add</span>
            </button>
          </div>

          <!-- Feature Chips -->
          <div v-if="features.length > 0" class="space-y-2">
            <div v-for="(feature, idx) in features" :key="idx"
              class="flex items-center justify-between px-3 py-2 bg-secondary/30 dark:bg-white/5 rounded-lg border border-border/10 group">
              <span class="text-sm font-medium text-foreground/80">{{ feature }}</span>
              <button type="button" @click="removeFeature(idx)"
                class="text-foreground/45 hover:text-red-500 transition-colors p-1">
                <PhX :size="16" />
              </button>
            </div>
          </div>
          <p v-else class="text-xs text-foreground/40 italic">Add at least one feature using the field above.</p>
        </div>
      </div>

      <!-- Right Column: Settings, Metadata & Files -->
      <div class="space-y-6">

        <!-- Files / Images Upload -->
        <div
          class="p-6 rounded-xl bg-background/50 border border-border/10 dark:border-white/5 backdrop-blur-md space-y-4">
          <h5>Project Media *</h5>

          <!-- Dropzone -->
          <label @dragover="handleDragOver" @dragleave="handleDragLeave" @drop="handleDrop"
            class="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition-all text-center select-none cursor-pointer"
            :class="[
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-border/20 dark:border-white/10 hover:border-primary/50'
            ]">
            <PhUploadSimple :size="32" class="text-foreground/40 mb-3" />
            <p class="text-sm font-medium">Drag & drop project images</p>
            <p class="text-xs text-foreground/40 mt-1 mb-4">PNG, JPG, or WEBP up to 5MB</p>

            <span
              class="px-4 py-2 bg-primary hover:bg-primary/95 text-white text-xs font-semibold rounded-lg shadow-sm shadow-primary/20 hover:shadow-md transition-all">
              Browse Files
            </span>
            <input type="file" multiple accept="image/*" class="hidden" @change="handleFileChange" />
          </label>

          <!-- Upload List Previews -->
          <div v-if="imagePreviews.length > 0" class="grid grid-cols-2 gap-3 pt-2">
            <div v-for="(url, index) in imagePreviews" :key="url"
              class="relative aspect-video rounded-lg overflow-hidden border border-border/20 group">
              <img :src="url" alt="Preview" class="w-full h-full object-cover" />
              <!-- Remove Image overlay -->
              <button type="button" @click="removeFile(index)"
                class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-white hover:text-red-400 p-2 cursor-pointer">
                <PhX :size="20" />
              </button>
            </div>
          </div>
        </div>

        <!-- Project Metadata -->
        <div
          class="p-6 rounded-xl bg-background/50 border border-border/10 dark:border-white/5 backdrop-blur-md space-y-4">
          <h5>Metadata Details</h5>

          <!-- Role -->
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground/75 uppercase tracking-wider">Your Role *</label>
            <input v-model="role" type="text" required placeholder="E.g., Fullstack Developer"
              class="w-full px-3 py-2.5 rounded-lg border border-border/20 dark:border-white/5 bg-background/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm" />
          </div>

          <!-- Timeline -->
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground/75 uppercase tracking-wider">Project Timeline *</label>
            <input v-model="timeline" type="text" required placeholder="E.g., 2 Months (Jan - Feb)"
              class="w-full px-3 py-2.5 rounded-lg border border-border/20 dark:border-white/5 bg-background/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm" />
          </div>

          <!-- Tags -->
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground/75 uppercase tracking-wider">Technologies / Tags
              *</label>
            <input v-model="tagsInput" type="text" required placeholder="Vue 3, TypeScript, Express, MongoDB"
              class="w-full px-3 py-2.5 rounded-lg border border-border/20 dark:border-white/5 bg-background/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm" />
            <p class="text-[10px] text-foreground/45">Separate technologies using commas.</p>
          </div>
        </div>

        <!-- Links & Switch settings -->
        <div
          class="p-6 rounded-xl bg-background/50 border border-border/10 dark:border-white/5 backdrop-blur-md space-y-4">
          <h5>Links & Settings</h5>

          <!-- Live URL -->
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground/75 uppercase tracking-wider">Live Site URL *</label>
            <input v-model="liveUrl" type="url" required placeholder="https://myproject.com"
              class="w-full px-3 py-2.5 rounded-lg border border-border/20 dark:border-white/5 bg-background/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm" />
          </div>

          <!-- Github Frontend -->
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground/75 uppercase tracking-wider">GitHub Frontend URL</label>
            <input v-model="githubFrontendUrl" type="url" placeholder="https://github.com/.../frontend"
              class="w-full px-3 py-2.5 rounded-lg border border-border/20 dark:border-white/5 bg-background/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm" />
          </div>

          <!-- GitHub Backend -->
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground/75 uppercase tracking-wider">GitHub Backend URL</label>
            <input v-model="githubBackendUrl" type="url" placeholder="https://github.com/.../backend"
              class="w-full px-3 py-2.5 rounded-lg border border-border/20 dark:border-white/5 bg-background/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm" />
          </div>

          <!-- Featured Switch -->
          <div class="flex items-center justify-between pt-2">
            <div class="space-y-0.5">
              <label class="text-xs font-semibold text-foreground/80">Featured Project</label>
              <p class="text-[10px] text-foreground/45">Display prominently on portfolio page.</p>
            </div>

            <!-- Custom switch toggle -->
            <button type="button" @click="featured = !featured"
              class="w-11 h-6 rounded-full transition-all duration-300 relative focus:outline-none cursor-pointer border border-border/10"
              :class="[featured ? 'bg-primary' : 'bg-secondary/80']">
              <span
                class="absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-full bg-white transition-transform duration-300 shadow-sm"
                :class="[featured ? 'transform translate-x-5' : '']"></span>
            </button>
          </div>
        </div>

        <!-- Form Submit Actions -->
        <div>
          <button type="submit" :disabled="loading"
            class="w-full py-3 bg-primary hover:bg-primary/95 text-white text-sm font-semibold rounded-lg shadow-sm shadow-primary/20 hover:shadow-md cursor-pointer transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <PhSpinner v-if="loading" class="animate-spin" :size="16" />
            <span>{{ loading ? 'Saving...' : 'Save Project' }}</span>
          </button>
        </div>

      </div>

    </form>
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
