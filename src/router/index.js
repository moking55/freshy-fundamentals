import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CoursesView from "../views/CoursesView.vue";
import GameView from "../views/GameView.vue";
import LabView from "../views/LabView.vue";
import DocumentView from "../views/DocumentView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/home",
      redirect: "/"
    },
    {
      path: "/courses",
      name: "courses",
      component: CoursesView
    },
    {
      path: "/lab",
      component: LabView
    },
    {
      path: "/documents",
      component: DocumentView
    },
    {
      path: "/game",
      component: GameView
    }
  ]
});

export default router;
