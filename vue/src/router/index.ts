import { createRouter, createWebHistory } from "vue-router";

import DataView from "../views/DataView.vue";
import PortfolioView from "../views/PortfolioView.vue";
import ExtraView from "../views/ExtraView.vue";

const routerHistory = createWebHistory();
const routes = [
  { path: "/", component: PortfolioView },
  { path: "/data", component: DataView },
  { path: "/extra", component: ExtraView },
];

const router = createRouter({
  history: routerHistory,
  routes,
});

export default router;
