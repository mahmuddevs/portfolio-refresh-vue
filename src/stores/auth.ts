import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { getFetch, setIsGuest, setSessionExpiredCallback } from "@/utils/getFetch";

export interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
  firstName?: string;
  lastName?: string;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isGuest = ref(false);
  const isAuthenticated = ref(false);
  const loading = ref(true);

  // Watch isGuest and sync it with the getFetch module-level variable
  watch(isGuest, (val) => {
    setIsGuest(val);
  }, { immediate: true });

  function setUser(newUser: User | null) {
    user.value = newUser;
    isAuthenticated.value = !!newUser;
    isGuest.value = !newUser;
  }

  async function login(email: string, password: string) {
    loading.value = true;
    try {
      const data = await getFetch<any>("/auth/login", {
        method: "POST",
        body: { email, password },
      });

      setUser(data.data.user);
      return { success: true };
    } catch (err: any) {
      console.error(err);
      return { success: false, error: err.message || "Login failed" };
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    loading.value = true;
    try {
      await getFetch("/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout request failed", err);
    } finally {
      setUser(null);
      loading.value = false;
    }
  }

  let authPromise: Promise<void> | null = null;

  async function checkAuth() {
    if (authPromise) {
      return authPromise;
    }

    loading.value = true;
    authPromise = (async () => {
      try {
        const resData = await getFetch<{
          data: {
            user: User | null;
            isGuest?: boolean;
          };
        }>("/auth", {
          method: "POST",
          private: true,
        });

        user.value = resData.data.user;
        isAuthenticated.value = !!resData.data.user;
        isGuest.value = !!resData.data.isGuest;
      } catch (error) {
        user.value = null;
        isAuthenticated.value = false;
        isGuest.value = true;
      } finally {
        loading.value = false;
        authPromise = null;
      }
    })();

    return authPromise;
  }

  // Set the session expired callback
  setSessionExpiredCallback(() => {
    setUser(null);
  });

  const isAdmin = computed(() => user.value?.role === "admin");

  return {
    user,
    isGuest,
    isAuthenticated,
    loading,
    isAdmin,
    login,
    logout,
    checkAuth,
    setUser,
  };
});

