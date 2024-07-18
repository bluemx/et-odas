import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
  createWebHashHistory
} from "vue-router";

import WelcomeView from "@/views/WelcomeView.vue";
import TrainView from "@/views/TrainView.vue";
import FinishView from "@/views/FinishView.vue";

const base = window.location.pathname;
const router = createRouter({
  history: createWebHashHistory(base),
  routes: [
    {
      path: "/:id?",
      name: "welcome",
      component: WelcomeView,
    },
    {
      path: "/:id?/train",
      name: "train",
      component: TrainView,
    },
    {
      path: "/:id?/finish",
      name: "finish",
      component: FinishView,
    },
    /*
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    */
  ],
});

export default router;
