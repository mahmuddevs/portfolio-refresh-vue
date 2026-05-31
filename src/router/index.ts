import Dashboard from "@/layouts/Dashboard.vue";
import Root from "@/layouts/Root.vue";
import { createRouter, createWebHistory } from "vue-router";

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
      path: "/dashboard",
      component: Dashboard,
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

export default router;
