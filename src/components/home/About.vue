<script setup lang="ts">
import SectionHeading from '../common/SectionHeading.vue';
import {
  PhGraduationCap,
  PhCertificate,
  PhBriefcase,
  PhMapPin,
  PhCalendarBlank,
  PhCheckCircle
} from '@phosphor-icons/vue';
</script>

<template>
  <section class="sec-padding relative overflow-hidden">
    <!-- Background Light Accent -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/5 rounded-full blur-[120px] pointer-events-none">
    </div>

    <div class="cont grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start relative z-10">

      <!-- Left Column: Story, Education, Certifications -->
      <div class="space-y-8">
        <SectionHeading>
          <template #subheading>About Me</template>
          <template #heading>
            <h2 class="capitalize">Who I <span>Am</span></h2>
          </template>
        </SectionHeading>

        <p class="text-foreground/80 dark:text-foreground/75 leading-relaxed text-base sm:text-lg">
          I am a dedicated Frontend Developer who thrives on turning complex design ideas into pixel-perfect, highly
          performant
          digital realities. Combining B.Sc. studies in Computer Science and Engineering with robust web technologies
          expertise,
          I craft intuitive, user-centric web applications.
        </p>

        <!-- Education & Certifications Cards -->
        <div class="space-y-4">
          <!-- Education Card -->
          <div
            class="group flex items-start gap-4 p-5 rounded-2xl bg-secondary/30 dark:bg-secondary/20 border border-border/10 dark:border-white/5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
            <div
              class="p-3 bg-primary/10 text-primary rounded-xl border border-primary/20 group-hover:scale-110 transition-transform">
              <PhGraduationCap :size="24" />
            </div>
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-primary">Education</span>
              <h6 class="mt-1">B.Sc. in Computer Science and Engineering</h6>
              <p class="text-sm font-medium text-foreground/80 dark:text-foreground/70 mt-1">Uttara University</p>
              <div class="flex items-center gap-1.5 text-xs text-foreground/50 mt-2">
                <PhCalendarBlank :size="12" />
                <span>2022 – 2026</span>
              </div>
            </div>
          </div>

          <!-- Certification Card -->
          <div
            class="group flex items-start gap-4 p-5 rounded-2xl bg-secondary/30 dark:bg-secondary/20 border border-border/10 dark:border-white/5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
            <div
              class="p-3 bg-primary/10 text-primary rounded-xl border border-primary/20 group-hover:scale-110 transition-transform">
              <PhCertificate :size="24" />
            </div>
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-primary">Certification</span>
              <h6 class="mt-1">Complete Web Development</h6>
              <p class="text-sm font-medium text-foreground/80 dark:text-foreground/70 mt-1">Programming Hero
                Certificate</p>
              <div class="flex items-center gap-1.5 text-xs text-foreground/50 mt-2">
                <PhCalendarBlank :size="12" />
                <span>Issued in 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Experience Timeline -->
      <div class="space-y-6">
        <div class="flex items-center gap-3">
          <div class="p-2.5 bg-primary/10 text-primary rounded-xl border border-primary/20">
            <PhBriefcase :size="24" />
          </div>
          <h3 class="text-2xl sm:text-3xl font-bold text-foreground">Professional Journey</h3>
        </div>

        <!-- Experience Timeline Item -->
        <div
          class="relative bg-secondary/20 dark:bg-secondary/15 border border-border/10 dark:border-white/5 rounded-2xl p-6 sm:p-8 hover:border-primary/30 transition-all duration-300 shadow-sm space-y-4">
          <!-- Decorative Top Left Glow Bar -->
          <div class="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-primary to-transparent rounded-l-2xl">
          </div>

          <div>
            <div class="flex flex-wrap items-center justify-between gap-2">
              <h4>Frontend Developer</h4>
              <span
                class="px-3 py-1 text-xs font-bold text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                Full-Time Role
              </span>
            </div>

            <!-- Company Subtitle details -->
            <div
              class="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5 text-sm text-foreground/60 dark:text-foreground/55 font-medium">
              <span class="text-primary font-bold text-base tracking-wide">Softivus Tech Wizards</span>
              <div class="flex items-center gap-1">
                <PhMapPin :size="14" class="text-primary/70" />
                <span>Uttara, Dhaka, Bangladesh</span>
              </div>
              <div class="flex items-center gap-1">
                <PhCalendarBlank :size="14" class="text-primary/70" />
                <span>Jun 2025 – Present</span>
              </div>
            </div>
          </div>

          <!-- Intern Promotion Badge -->
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 dark:bg-primary/5 border border-primary/20 text-xs font-semibold text-primary">
            <span class="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shrink-0"></span>
            <span>Started as 3-month intern • Promoted full-time in Sep 2025</span>
          </div>

          <!-- Bullet Accomplishments -->
          <ul class="space-y-3.5 pt-2">
            <li
              class="flex items-start gap-3 text-foreground/80 dark:text-foreground/75 leading-relaxed text-sm sm:text-base">
              <PhCheckCircle :size="18" class="text-primary shrink-0 mt-1" />
              <span>
                Delivered the full frontend of a production **Next.js real estate platform** by owning all UI
                implementation
                and collaborating directly with the backend developer to integrate REST APIs, resulting in a fully
                functional
                client-ready product.
              </span>
            </li>
            <li
              class="flex items-start gap-3 text-foreground/80 dark:text-foreground/75 leading-relaxed text-sm sm:text-base">
              <PhCheckCircle :size="18" class="text-primary shrink-0 mt-1" />
              <span>
                Converted Figma designs into clean, responsive HTML/CSS/JS interfaces by following accessibility, **SEO
                best
                practices**, and cross-browser compatibility standards across all deliverables.
              </span>
            </li>
            <li
              class="flex items-start gap-3 text-foreground/80 dark:text-foreground/75 leading-relaxed text-sm sm:text-base">
              <PhCheckCircle :size="18" class="text-primary shrink-0 mt-1" />
              <span>
                Produced **2 ThemeForest-approved HTML templates** and **1 CodeCanyon-approved Next.js application** by
                meeting each platform’s quality, cross-browser compatibility, and code standards.
              </span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Scoped styles */
</style>
