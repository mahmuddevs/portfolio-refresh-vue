<script lang="ts" setup>
import { PhGithubLogo, PhLink, PhArrowUpRight } from '@phosphor-icons/vue';
import ExternalLink from '@/components/common/ExternalLink.vue';

defineProps<{
  title: string;
  tags: string[];
  githubFrontendUrl?: string;
  githubBackendUrl?: string;
  liveUrl: string;
}>();
</script>

<template>
  <div class="space-y-8 lg:pl-4">
    <!-- Technologies Showcase -->
    <div class="space-y-4">
      <h5 class="capitalize">Technologies Used</h5>
      <div class="flex flex-wrap gap-2.5 font-sans">
        <span v-for="tag in tags" :key="tag"
          class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-secondary/30 border border-border/20 dark:border-white/5 text-foreground/80 dark:text-foreground/75">
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Project Actions Panel -->
    <div class="space-y-4 pt-6 border-t border-border/10">
      <h5 class="capitalize">Project Attachments</h5>
      <div class="flex flex-col gap-3">
        <!-- If BOTH frontend and backend github repos are defined -->
        <template v-if="githubFrontendUrl && githubBackendUrl">
          <!-- Frontend Github repo button -->
          <ExternalLink :href="githubFrontendUrl || ''"
            :ariaLabel="`View Frontend GitHub repo for ${title}`"
            class="flex items-center justify-between w-full p-4 rounded-xl border border-border/30 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300 font-sans group">
            <div class="flex items-center gap-3">
              <PhGithubLogo :size="24" class="text-foreground/80 group-hover:text-primary transition-colors" />
              <span
                class="font-semibold text-sm text-foreground/80 group-hover:text-primary transition-colors">GitHub
                (Frontend)</span>
            </div>
            <PhLink :size="16" class="text-foreground/40 group-hover:text-primary transition-colors" />
          </ExternalLink>

          <!-- Backend Github repo button -->
          <ExternalLink :href="githubBackendUrl || ''"
            :ariaLabel="`View Backend GitHub repo for ${title}`"
            class="flex items-center justify-between w-full p-4 rounded-xl border border-border/30 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300 font-sans group">
            <div class="flex items-center gap-3">
              <PhGithubLogo :size="24" class="text-foreground/80 group-hover:text-primary transition-colors" />
              <span
                class="font-semibold text-sm text-foreground/80 group-hover:text-primary transition-colors">GitHub
                (Backend)</span>
            </div>
            <PhLink :size="16" class="text-foreground/40 group-hover:text-primary transition-colors" />
          </ExternalLink>
        </template>

        <!-- Otherwise, if only one of them is defined -->
        <template v-else>
          <!-- Single Github repo button (Frontend or Backend) -->
          <ExternalLink v-if="githubFrontendUrl || githubBackendUrl"
            :href="githubFrontendUrl || githubBackendUrl || ''"
            :ariaLabel="`View GitHub repo for ${title}`"
            class="flex items-center justify-between w-full p-4 rounded-xl border border-border/30 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300 font-sans group">
            <div class="flex items-center gap-3">
              <PhGithubLogo :size="24" class="text-foreground/80 group-hover:text-primary transition-colors" />
              <span
                class="font-semibold text-sm text-foreground/80 group-hover:text-primary transition-colors">GitHub
                Repository</span>
            </div>
            <PhLink :size="16" class="text-foreground/40 group-hover:text-primary transition-colors" />
          </ExternalLink>
        </template>

        <!-- Live Demo Button -->
        <ExternalLink :href="liveUrl" :ariaLabel="`Visit live site for ${title}`"
          class="flex items-center justify-between w-full p-4 rounded-xl border border-border/30 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300 font-sans group">
          <div class="flex items-center gap-3">
            <PhLink :size="24" class="text-foreground/80 group-hover:text-primary transition-colors" />
            <span
              class="font-semibold text-sm text-foreground/80 group-hover:text-primary transition-colors">Launch
              Live Preview</span>
          </div>
          <PhArrowUpRight :size="16" class="text-foreground/40 group-hover:text-primary transition-colors" />
        </ExternalLink>
      </div>
    </div>
  </div>
</template>
