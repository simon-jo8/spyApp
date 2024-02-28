import { createRouter, createWebHistory } from "vue-router";
import Role from "../views/Role.vue";
import Informations from "../views/Informations.vue";
import ScenariosView from "../views/ScenariosView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "role",
      component: Role,
    },
    {
      path: "/informations",
      name: "informations",
      component: Informations,
    },
    {
      path: "/scenarios",
      name: "scenarios",
      component: ScenariosView,
    },
  ],
});

export default router;
