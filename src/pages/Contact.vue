<script setup lang="ts">
import SectionHeading from '@/components/common/SectionHeading.vue';
import ContactForm from '@/components/contact/ContactForm.vue';
import ExternalLink from '@/components/common/ExternalLink.vue';
import { contactDetails } from '@/utils/contact';
import { socials } from '@/utils/socials';
</script>

<template>
  <section class="cont sec-margin">
    <SectionHeading :center="true">
      <template #heading>
        <h3>Let's Work Together</h3>
      </template>
      <template #paragraph>
        <p class="max-w-lg text-foreground/75">
          Have a project in mind? I'd love to hear about it. Get in touch and let's discuss how I can help.
        </p>
      </template>
    </SectionHeading>
  </section>

  <section
    class="w-11/12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20 items-start sec-margin">
    <ContactForm />

    <div class="space-y-8 mt-10 lg:pl-8">
      <!-- Contact Info Section -->
      <div class="space-y-6">
        <h5 class="capitalize">Other ways to reach me</h5>
        <div class="space-y-5">
          <div v-for="item in contactDetails" :key="item.label" class="flex items-center gap-4 group">
            <!-- Icon with soft background -->
            <div
              class="h-12 w-12 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
              <component :is="item.icon" :size="22" />
            </div>
            <!-- Details -->
            <div class="text-left font-sans">
              <span class="block text-xs font-semibold text-foreground/40 uppercase tracking-wider">
                {{ item.label }}
              </span>
              <a v-if="item.href" :href="item.href"
                class="text-sm sm:text-base font-semibold text-foreground/85 hover:text-primary transition-colors duration-300">
                {{ item.value }}
              </a>
              <span v-else class="text-sm sm:text-base font-semibold text-foreground/85">
                {{ item.value }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Socials Section -->
      <div class="space-y-4 pt-6 border-t border-border/10">
        <h6 class="capitalize">
          Connect on social media
        </h6>
        <div class="flex items-center gap-3">
          <ExternalLink v-for="social in socials" :key="social.name" :href="social.url" :ariaLabel="social.name"
            class="p-3 border border-border/30 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 rounded-xl transition-all duration-300 ease-in-out text-foreground/75 hover:text-primary icon-center hover:-translate-y-0.5 w-12 h-12 flex items-center justify-center">
            <component :is="social.icon" :size="20" />
          </ExternalLink>
        </div>
      </div>
    </div>
  </section>
</template>
