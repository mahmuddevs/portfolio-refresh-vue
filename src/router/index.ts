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
          path: "contact",
          name: "contact",
          component: () => import("@/pages/Contact.vue"),
        },
        {
          path: "projects",
          name: "projects",
          component: () => import("@/pages/Projects.vue"),
        },
        {
          path: "projects/:slug",
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
        {
          path: "projects/add",
          name: "add-project",
          component: () => import("@/pages/Dashboard/AddProject.vue"),
        },
        {
          path: "projects/edit/:slug",
          name: "edit-project",
          component: () => import("@/pages/Dashboard/EditProject.vue"),
        },
        {
          path: "projects",
          name: "dashboard-projects",
          component: () => import("@/pages/Dashboard/Projects.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/pages/NotFound.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
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

