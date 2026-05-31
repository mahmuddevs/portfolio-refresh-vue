<script setup lang="ts">
import VueTypewriterEffect from "vue-typewriter-effect";
import Button from "../common/Button.vue";
import { PhArrowRight, PhEnvelopeSimple, PhGithubLogo, PhLinkedinLogo } from "@phosphor-icons/vue";
import ExternalLink from "../common/ExternalLink.vue";
import Line from "../common/Line.vue";
import HeroVisual from "./HeroVisual.vue";


</script>

<template>
  <section class="cont sec-margin grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
    <!-- Left Column: Copy & Links -->
    <div class="space-y-4">
      <div class="text-lg md:text-xl flex items-center gap-2 text-primary font-semibold">
        <Line />
        <vue-typewriter-effect :strings="['Hello, I\'m Mahmud', 'I\'m a Web Developer']" />
      </div>
      <h1 class="capitalize">
        Build amazing
        <span>
          digital experiences
        </span>
      </h1>
      <p class="md:text-xl max-w-2xl text-foreground/80 dark:text-foreground/75 leading-relaxed">
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
      <div class="flex items-center gap-4 mt-8">
        <ExternalLink href="https://github.com/mahmuddevs" ariaLabel="GitHub Profile"
          class="p-2 hover:bg-primary/20 rounded-md transition-all duration-300 ease-in-out icon-center border border-primary hover:-translate-y-1">
          <PhGithubLogo class="text-lg md:text-2xl" />
        </ExternalLink>
        <ExternalLink href="https://www.linkedin.com/in/themahmudrashid" ariaLabel="Linkedin Profile"
          class="p-2 hover:bg-primary/20 rounded-md transition-all duration-300 ease-in-out icon-center border border-primary hover:-translate-y-1">
          <PhLinkedinLogo class="text-lg md:text-2xl" />
        </ExternalLink>
        <ExternalLink href="mailto:mahmudrashid574@gmail.com" ariaLabel="Email"
          class="p-2 hover:bg-primary/20 rounded-md transition-all duration-300 ease-in-out icon-center border border-primary hover:-translate-y-1">
          <PhEnvelopeSimple class="text-lg md:text-2xl" />
        </ExternalLink>
      </div>
    </div>

    <!-- Right Column: Interactive IDE/Terminal Visual mockup -->
    <div class="w-full">
      <HeroVisual />
    </div>
  </section>
</template>


<style scoped></style>