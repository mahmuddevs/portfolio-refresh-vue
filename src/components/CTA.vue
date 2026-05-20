<script setup lang="ts">
import { PhArrowRight } from '@phosphor-icons/vue';
import Button from './common/Button.vue';
import SectionHeading from './common/SectionHeading.vue';
import ExternalLink from './common/ExternalLink.vue';

</script>

<template>
  <section class="w-11/12 max-w-2xl md:max-w-3xl mx-auto sec-margin space-y-6">
    <SectionHeading :center=true>
      <template #heading>
        <h3 class="capitalize">Ready to build something <span>exceptional</span>?</h3>
      </template>
      <template #paragraph>
        <p>Let's collaborate on your next project. Get in touch and let's create something amazing together.</p>
      </template>
    </SectionHeading>
    <div class="flex items-center justify-center gap-4">
      <Button :type="'primary'">
        Start A Project
        <template #posticon>
          <PhArrowRight :size="20"
            class="icon-center group-hover:translate-x-1 transition-transform ease-in-out duration-300" />
        </template>
      </Button>
      <ExternalLink href="mailto:mahmudrashid574@gmail.com">
        <Button :type="'secondary'">
          Send Email
        </Button>
      </ExternalLink>
    </div>
  </section>
</template>