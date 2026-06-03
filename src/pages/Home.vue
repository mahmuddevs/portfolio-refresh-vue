<script setup lang="ts">
import CTA from '@/components/CTA.vue';
import Hero from '@/components/home/Hero.vue';
import About from '@/components/home/About.vue';
import SkillSlider from '@/components/home/SkillSlider.vue';
import FeaturedProjects from '@/components/home/FeaturedProjects.vue';
</script>

<template>
  <div>
    <Hero />
    <FeaturedProjects />
    <About />
    <SkillSlider />
    <CTA />
  </div>
</template>

<style scoped></style>