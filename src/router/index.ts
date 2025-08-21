import StepperPage from "../pages/StepperPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/login", component: LoginPage },
  { path: "/stepper", component: StepperPage },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
