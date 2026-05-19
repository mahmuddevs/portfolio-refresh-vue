<script setup lang="ts">
import { useSlots } from 'vue';
import Line from './Line.vue';

defineProps<{
  center?: boolean;
}>();

const slots = useSlots();
if (!slots.heading) {
  console.warn('SectionHeading: "heading" slot is required');
}
</script>

<template>
  <div class="space-y-2 sm:space-y-4" :class="{ 'text-center flex flex-col items-center justify-center': center }">
    <div v-if="slots.subheading" class="text-lg md:text-xl flex items-center gap-2 text-primary font-semibold"
      :class="{ 'justify-center': center }">
      <Line />
      <span class="capitalize">
        <slot name="subheading"></slot>
      </span>
      <Line v-if="center" />
    </div>
    <slot v-if="slots.heading" name="heading"></slot>
    <slot v-if="slots.paragraph" name="paragraph"></slot>
  </div>
</template>
