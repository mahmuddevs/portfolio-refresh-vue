<script setup lang="ts">
defineProps<{
  type?: 'primary' | 'secondary';
}>()

const primaryClasses = 'text-white bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50';
const secondaryClasses = 'bg-transparent hover:bg-primary/10';

</script>

<template>
  <button :class="type === 'primary' ? primaryClasses : secondaryClasses"
    class="px-4 md:px-5 py-2 md:py-3 text-sm sm:text-base md:text-lg font-semibold rounded-md  transition-all duration-300 ease-in-out border border-primary group flex items-center gap-2">
    <slot name="preicon" />
    <slot />
    <slot name="posticon" />
  </button>
</template>