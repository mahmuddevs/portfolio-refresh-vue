import { defineStore } from "pinia";

const STORAGE_KEY = "theme-preference";

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export const useThemeStore = defineStore("theme", {
  state: () => ({
    preference: "system",
    systemTheme: getSystemTheme(),
  }),
  getters: {
    activeTheme(state) {
      if (state.preference === "system") {
        return state.systemTheme;
      }
      return state.preference;
    },
  },
  actions: {
    init() {
      const savedTheme = localStorage.getItem(STORAGE_KEY);

      if (savedTheme) {
        this.preference = savedTheme;
      }

      const media = window.matchMedia("(prefers-color-scheme: dark)");

      const updateSystemTheme = (e: MediaQueryListEvent) => {
        this.systemTheme = getSystemTheme();
        this.applyTheme();
      };

      media.addEventListener("change", updateSystemTheme);
      this.applyTheme();
    },
    setPreference(theme: "light" | "dark" | "system") {
      this.preference = theme;
      localStorage.setItem(STORAGE_KEY, theme);
      this.applyTheme();
    },

    toggle() {
      const newPreference = this.activeTheme === "dark" ? "light" : "dark";
      this.setPreference(newPreference);
    },
    applyTheme() {
      const root = document.documentElement;
      if (this.activeTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    },
  },
});
