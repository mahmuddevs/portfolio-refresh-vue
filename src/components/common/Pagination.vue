<script lang="ts" setup>
import { PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue';

defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  pageChange: [page: number];
}>();
</script>

<template>
  <div v-if="totalPages > 1"
    class="flex items-center justify-center gap-2 pt-8 border-t border-border/10 dark:border-white/5">
    <!-- Previous Page Button -->
    <button @click="emit('pageChange', currentPage - 1)" :disabled="currentPage === 1"
      class="p-2.5 rounded-lg border border-border/20 dark:border-white/10 bg-secondary/20 hover:bg-secondary dark:hover:bg-white/5 text-foreground/75 disabled:opacity-40 disabled:hover:bg-secondary/20 disabled:cursor-not-allowed transition-all duration-300 icon-center"
      aria-label="Previous Page">
      <PhCaretLeft :size="18" />
    </button>

    <!-- Page Numbers List -->
    <button v-for="pageNum in totalPages" :key="pageNum" @click="emit('pageChange', pageNum)"
      :class="currentPage === pageNum
        ? 'bg-primary text-white border-primary shadow-md shadow-primary/20 scale-105'
        : 'bg-secondary/20 border-border/20 dark:border-white/10 hover:bg-secondary dark:hover:bg-white/5 text-foreground/85 hover:text-primary hover:scale-[1.02]'"
      class="w-10 h-10 rounded-lg border text-sm font-semibold transition-all duration-300">
      {{ pageNum }}
    </button>

    <!-- Next Page Button -->
    <button @click="emit('pageChange', currentPage + 1)" :disabled="currentPage === totalPages"
      class="p-2.5 rounded-lg border border-border/20 dark:border-white/10 bg-secondary/20 hover:bg-secondary dark:hover:bg-white/5 text-foreground/75 disabled:opacity-40 disabled:hover:bg-secondary/20 disabled:cursor-not-allowed transition-all duration-300 icon-center"
      aria-label="Next Page">
      <PhCaretRight :size="18" />
    </button>
  </div>
</template>
