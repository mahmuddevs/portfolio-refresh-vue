<script lang="ts" setup>
import { PhLightbulb, PhCheckCircle } from '@phosphor-icons/vue';

defineProps<{
  challenges: string;
  solution: string;
  features: string[];
}>();
</script>

<template>
  <div class="space-y-8">
    <!-- Project Challenges -->
    <div class="space-y-4">
      <h4 class="flex items-center gap-3 capitalize">
        <PhLightbulb class="text-primary" :size="28" />
        The Challenge
      </h4>
      <p class="text-foreground/75 leading-relaxed text-sm sm:text-base">
        {{ challenges }}
      </p>
    </div>

    <!-- Project Solution -->
    <div class="space-y-4 pt-6 border-t border-border/10">
      <h4 class="flex items-center gap-3 capitalize">
        <PhCheckCircle class="text-primary" :size="28" />
        The Solution
      </h4>
      <p class="text-foreground/75 leading-relaxed text-sm sm:text-base">
        {{ solution }}
      </p>
    </div>

    <!-- Architectural Features -->
    <div class="space-y-4 pt-6 border-t border-border/10">
      <h5 class="capitalize">Key Architectural Features</h5>
      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-sm">
        <li v-for="feat in features" :key="feat" class="flex items-start gap-2.5 text-foreground/75">
          <span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
          <span>{{ feat }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
