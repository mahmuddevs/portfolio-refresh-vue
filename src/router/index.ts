import Auth from "@/layouts/Auth.vue";
import Dashboard from "@/layouts/Dashboard.vue";
import Root from "@/layouts/Root.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Root,
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/pages/Home.vue"),
        },
        {
          path: "/contact",
          name: "contact",
          component: () => import("@/pages/Contact.vue"),
        },
        {
          path: "/projects",
          name: "projects",
          component: () => import("@/pages/Projects.vue"),
        },
        {
          path: "/projects/:slug",
          name: "project-detail",
          component: () => import("@/pages/ProjectDetail.vue"),
        },
      ],
    },
    {
      path: "/admin-login",
      component: Auth,
      meta: { guestOnly: true },
      children: [
        {
          path: "",
          name: "admin-login",
          component: () => import("@/pages/AdminLogin/AdminLogin.vue"),
        },
      ],
    },
    {
      path: "/dashboard",
      component: Dashboard,
      meta: { requiresAdmin: true },
      children: [
        {
          path: "",
          name: "dashboard-home",
          component: () => import("@/pages/Dashboard/Home.vue"),
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.loading) {
    await authStore.checkAuth();
  }

  const isAuth = authStore.isAuthenticated;
  const isAdmin = authStore.isAdmin;

  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);
  const guestOnly = to.matched.some((record) => record.meta.guestOnly);

  if (requiresAdmin) {
    if (!isAuth || !isAdmin) {
      next({ name: "admin-login" });
    } else {
      next();
    }
  } else if (guestOnly && isAuth && isAdmin) {
    next({ name: "dashboard-home" });
  } else {
    next();
  }
});

export default router;

