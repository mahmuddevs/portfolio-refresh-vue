<script setup lang="ts">
import Logo from './common/Logo.vue';
import ExternalLink from './common/ExternalLink.vue';
import { contactDetails } from '@/utils/contact';
import { socials } from '@/utils/socials';

const currentYear = new Date().getFullYear();

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' }
];
</script>

<template>
  <footer class="border-t border-border/20 bg-background/50 backdrop-blur-xs mt-auto">
    <div class="cont">
      <!-- Top Row: 4 Columns Grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 text-center sm:text-left sec-padding">
        <!-- Column 1: Logo and Short Description -->
        <div class="flex flex-col items-center sm:items-start space-y-4 max-w-sm max-sm:mx-auto">
          <Logo class="inline-block" />
          <p class="text-sm text-foreground/75 leading-relaxed font-sans">
            Crafting high-performance digital experiences and pixel-perfect web applications.
          </p>
        </div>

        <!-- Column 2: Navigation Links -->
        <div class="flex flex-col items-center sm:items-start space-y-3">
          <h6>Navigation</h6>
          <nav class="flex flex-col items-center sm:items-start space-y-2">
            <router-link v-for="link in footerLinks" :key="link.path" :to="link.path"
              class="text-sm font-medium hover:text-primary transition-colors duration-300">
              {{ link.label }}
            </router-link>
          </nav>
        </div>

        <!-- Column 3: Connect / Socials -->
        <div class="flex flex-col items-center sm:items-start space-y-3">
          <h6>Connect</h6>
          <div class="flex items-center gap-3">
            <ExternalLink v-for="social in socials" :key="social.name" :href="social.url" :ariaLabel="social.name"
              class="p-2 border border-border/30 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 rounded-md transition-all duration-300 ease-in-out text-foreground/70 hover:text-primary icon-center hover:-translate-y-0.5">
              <component :is="social.icon" :size="18" />
            </ExternalLink>
          </div>
        </div>

        <!-- Column 4: Contact Info -->
        <div class="flex flex-col items-center sm:items-start space-y-3">
          <h6>Contact</h6>
          <ul class="space-y-3 text-sm text-foreground/75 font-sans flex flex-col items-center sm:items-start">
            <li v-for="item in contactDetails" :key="item.label" class="flex items-center gap-2.5">
              <component :is="item.icon" class="text-primary shrink-0" :size="18" />
              <a v-if="item.href" :href="item.href" class="hover:text-primary transition-colors">
                {{ item.value }}
              </a>
              <span v-else>
                {{ item.value }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-border/10"></div>

      <!-- Bottom Row: Copyright Centered -->
      <div class="flex items-center justify-center text-xs font-mono text-foreground/50 py-6">
        <p>© {{ currentYear }} Mahmud. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
