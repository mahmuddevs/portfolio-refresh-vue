<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import SectionHeading from '../common/SectionHeading.vue';
import skills from '@/utils/skills';

import 'swiper/css';

// Duplicate skills for seamless marquee effect
const duplicatedSkills = [...skills, ...skills];
</script>
<template>
  <section class="border-y border-border/10 dark:border-white/5 sec-margin sec-padding space-y-8">
    <div class="cont">
      <SectionHeading>
        <template #subheading>Experties</template>
        <template #heading>
          <h2 class="capitalize">Technical Skills</h2>
        </template>
      </SectionHeading>
    </div>
    <!-- skill slider -->
    <div class="cont relative">
      <div class="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-background to-transparent z-10"></div>
      <div class="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-background to-transparent z-10"></div>
      <Swiper :slides-per-view="'auto'" :space-between="32" :loop="false" class="skill-swiper marquee">
        <SwiperSlide v-for="(skill, index) in duplicatedSkills" :key="`${skill.name}-${index}`" class="skill-slide">
          <div class="flex flex-col items-center gap-3">
            <img :src="skill.icon" :alt="skill.name" class="h-16 w-16 object-contain" />
            <span class="text-center text-sm font-medium capitalize">
              {{ skill.name }}
            </span>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<style scoped>
.skill-swiper {
  overflow: hidden;
}

.skill-swiper.marquee :deep(.swiper-wrapper) {
  animation: marquee 25s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.skill-slide {
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
