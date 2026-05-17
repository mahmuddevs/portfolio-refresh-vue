<script setup lang="ts">
import VueTypewriterEffect from "vue-typewriter-effect";
import Button from "../common/Button.vue";
import { PhArrowRight } from "@phosphor-icons/vue";


</script>

<template>
  <section class="cont sec-margin">
    <div class="space-y-4">
      <div class="text-lg md:text-xl flex items-center gap-2 text-primary font-semibold">
        <div class="h-0.5 w-5 bg-primary"></div>
        <vue-typewriter-effect :strings="['Hello, I\'m Mahmud', 'I\'m a Web Developer']" />
      </div>
      <h1 class="capitalize">
        Build amazing
        <span>
          digital experiences
        </span>
      </h1>
      <p class="md:text-xl max-w-2xl">
        I craft high-performance web applications with React and Next.js. Specialized in converting designs to
        pixel-perfect, fully functional interfaces.
      </p>
      <div class="flex items-center gap-4 mt-8">
        <router-link to="/projects">
          <Button type="primary">
            Explore Works
            <template #posticon>
              <PhArrowRight :size="20"
                class="icon-center group-hover:translate-x-1 transition-transform ease-in-out duration-300" />
            </template>
          </Button>
        </router-link>
        <router-link to="/contact">
          <Button type="secondary">
            Get in Touch
          </Button>
        </router-link>
      </div>
    </div>
  </section>
</template>


<style scoped></style>