<script lang="ts" setup>
import { PhArrowUpRight } from '@phosphor-icons/vue';
import ExternalLink from '@/components/common/ExternalLink.vue';
import Button from '@/components/common/Button.vue';

defineProps<{
  image: string;
  title: string;
  liveUrl: string;
}>();
</script>

<template>
  <div
    class="relative group border border-border/10 dark:border-white/5 rounded-2xl overflow-hidden bg-secondary/20 dark:bg-secondary/10 shadow-2xl transition-all duration-500 ease-out hover:-translate-y-1">
    <img :src="image" :alt="title" class="w-full h-auto object-cover max-h-125" />

    <!-- Float Action Overlay -->
    <div class="absolute bottom-6 right-6 flex items-center gap-3">
      <ExternalLink :href="liveUrl" :ariaLabel="`Visit live site for ${title}`">
        <Button type="primary" class="shadow-lg shadow-primary/30 py-2.5! px-4! text-sm">
          <span>Visit Live Demo</span>
          <template #posticon>
            <PhArrowUpRight :size="16" />
          </template>
        </Button>
      </ExternalLink>
    </div>
  </div>
</template>
