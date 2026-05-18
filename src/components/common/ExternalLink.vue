<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  href: string
  ariaLabel?: string
  class?: string
}>()

const isHttpLink = computed(() =>
  /^https?:/.test(props.href)
)
</script>

<template>
  <a :href="href" :target="isHttpLink ? '_blank' : undefined" :rel="isHttpLink ? 'noopener noreferrer' : undefined"
    :aria-label="ariaLabel" :class="class">
    <slot />
  </a>
</template>