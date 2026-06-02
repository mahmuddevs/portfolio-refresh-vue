<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { PhLockKey, PhEnvelopeSimple, PhSignIn, PhArrowLeft, PhEye, PhEyeSlash } from "@phosphor-icons/vue";
import Button from "@/components/common/Button.vue";

const showPassword = ref(false);
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const isSubmitting = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  errorMessage.value = "";
  isSubmitting.value = true;

  const result = await authStore.login(email.value, password.value);
  isSubmitting.value = false;

  if (result.success) {
    router.push({ name: "dashboard-home" });
  } else {
    errorMessage.value = result.error || "Invalid email or password";
  }
};
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4 relative transition-colors duration-300">
    <!-- Back to Home Link -->
    <router-link
      to="/"
      class="absolute top-8 left-8 flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors duration-300 font-sans"
    >
      <PhArrowLeft :size="18" />
      Back to Home
    </router-link>

    <!-- Sleek, Glassmorphic Login Card -->
    <div class="w-full max-w-md bg-secondary/30 dark:bg-secondary/10 border border-border/20 p-8 sm:p-10 rounded-lg shadow-xl backdrop-blur-md space-y-8">
      <div class="space-y-2 text-center">
        <h3 class="capitalize">Admin <span>Login</span></h3>
        <p class="text-sm text-foreground/60 font-sans">
          Access the dashboard to manage projects and settings.
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Error Alert -->
        <div 
          v-if="errorMessage" 
          class="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-md text-sm font-sans flex items-center gap-2"
        >
          <span class="w-2 h-2 rounded-full bg-red-500"></span>
          {{ errorMessage }}
        </div>

        <!-- Email Input -->
        <div class="space-y-2 text-left">
          <label for="email" class="text-sm font-medium text-foreground/80 font-sans flex items-center gap-2">
            <PhEnvelopeSimple :size="16" class="text-foreground/45" />
            Email <span class="text-primary">*</span>
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="admin@example.com"
            required
            class="w-full px-4 py-3 bg-secondary/30 dark:bg-secondary/20 border border-border/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden transition-all duration-300 font-sans text-sm text-foreground placeholder-foreground/30"
          />
        </div>

        <!-- Password Input -->
        <div class="space-y-2 text-left">
          <label for="password" class="text-sm font-medium text-foreground/80 font-sans flex items-center gap-2">
            <PhLockKey :size="16" class="text-foreground/45" />
            Password <span class="text-primary">*</span>
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              required
              class="w-full pl-4 pr-12 py-3 bg-secondary/30 dark:bg-secondary/20 border border-border/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden transition-all duration-300 font-sans text-sm text-foreground placeholder-foreground/30"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-4 flex items-center text-foreground/60 hover:text-primary transition-colors duration-300 focus:outline-hidden cursor-pointer"
              title="Toggle password visibility"
            >
              <PhEyeSlash v-if="showPassword" :size="20" />
              <PhEye v-else :size="20" />
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="pt-2">
          <Button
            type="primary"
            :disabled="isSubmitting"
            class="w-full flex justify-center py-3"
          >
            <span v-if="isSubmitting" class="animate-spin rounded-full h-5 w-4 border-2 border-white border-t-transparent mr-2"></span>
            <span>{{ isSubmitting ? 'Verifying...' : 'Sign In' }}</span>
            <template v-if="!isSubmitting" #posticon>
              <PhSignIn :size="18" class="group-hover:translate-x-1 transition-transform duration-300" />
            </template>
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>
