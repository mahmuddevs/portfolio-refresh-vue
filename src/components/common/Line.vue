<script setup lang="ts">
defineProps({
  bgColor: {
    type: String,
    default: 'bg-primary'
  }
});
</script>
<template>
  <div class="h-0.5 w-5" :class="bgColor"></div>
</template>