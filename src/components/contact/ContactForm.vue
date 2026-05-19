<script setup lang="ts">
import { PhPaperPlaneTilt } from '@phosphor-icons/vue';
import Button from '../common/Button.vue';
</script>

<template>
  <div class="w-full max-w-2xl mx-auto space-y-8 mt-10">
    <div class="space-y-2">
      <h5 class="font-bold">Send A Message</h5>
      <p class="text-sm text-foreground/60 font-sans">
        I typically respond within 24 hours. Let's create something awesome.
      </p>
    </div>

    <form @submit.prevent class="space-y-5">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <!-- Name Input -->
        <div class="space-y-2 text-left">
          <label for="name" class="text-sm font-medium text-foreground/80 font-sans">
            Name <span class="text-primary">*</span>
          </label>
          <input type="text" id="name" placeholder="John Doe" required
            class="w-full px-4 py-3 bg-secondary/30 dark:bg-secondary/20 border border-border/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden transition-all duration-300 font-sans text-sm text-foreground placeholder-foreground/30" />
        </div>

        <!-- Email Input -->
        <div class="space-y-2 text-left">
          <label for="email" class="text-sm font-medium text-foreground/80 font-sans">
            Email <span class="text-primary">*</span>
          </label>
          <input type="email" id="email" placeholder="john@example.com" required
            class="w-full px-4 py-3 bg-secondary/30 dark:bg-secondary/20 border border-border/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden transition-all duration-300 font-sans text-sm text-foreground placeholder-foreground/30" />
        </div>
      </div>

      <!-- Subject Input -->
      <div class="space-y-2 text-left">
        <label for="subject" class="text-sm font-medium text-foreground/80 font-sans">
          Subject <span class="text-primary">*</span>
        </label>
        <input type="text" id="subject" placeholder="Project Inquiry / Job Opportunity" required
          class="w-full px-4 py-3 bg-secondary/30 dark:bg-secondary/20 border border-border/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden transition-all duration-300 font-sans text-sm text-foreground placeholder-foreground/30" />
      </div>

      <!-- Message Textarea -->
      <div class="space-y-2 text-left">
        <label for="message" class="text-sm font-medium text-foreground/80 font-sans">
          Message <span class="text-primary">*</span>
        </label>
        <textarea id="message" rows="5" placeholder="Tell me about your project, goals, and timeline..." required
          class="w-full px-4 py-3 bg-secondary/30 dark:bg-secondary/20 border border-border/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden transition-all duration-300 font-sans text-sm text-foreground placeholder-foreground/30 resize-none"></textarea>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-center sm:justify-end pt-2">
        <Button type="primary" class="w-full flex justify-center">
          Send Message
          <template #posticon>
            <PhPaperPlaneTilt :size="18"
              class="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </template>
        </Button>
      </div>
    </form>
  </div>
</template>