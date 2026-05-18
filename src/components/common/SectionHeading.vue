<script setup lang="ts">
import { useSlots } from 'vue';
import Line from './Line.vue';

const slots = useSlots();

if (!slots.subheading) {
  console.warn('SectionHeading: "subheading" slot is required');
}

if (!slots.heading) {
  console.warn('SectionHeading: "heading" slot is required');
}
</script>

<template>
  <div class="space-y-4">
    <div v-if="slots.subheading" class="text-lg md:text-xl flex items-center gap-2 text-primary font-semibold">
      <Line />
      <span class="capitalize">
        <slot name="subheading"></slot>
      </span>
    </div>
    <slot v-if="slots.heading" name="heading"></slot>
    <slot v-if="slots.paragraph" name="paragraph"></slot>
  </div>
</template>
