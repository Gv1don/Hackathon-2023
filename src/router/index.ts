import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainView,
    },
    {
      path: "/auth",
      name: "auth",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/Auth/AuthView.vue"),
    },
    {
      path: "/new-point",
      name: "new-point",
      component: () => import("@/views/Rating/NewPointView.vue"),
    }
  ],
});

export default router;
