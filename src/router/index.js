import { createRouter, createWebHistory } from "vue-router";
import Role from "../views/Role.vue";
import Informations from "../views/Informations.vue";
import ScenariosView from "../views/ScenariosView.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/role",
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
