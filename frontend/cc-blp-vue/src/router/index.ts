import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import AppDashboard from "../views/DashboardView.vue";
import AppCampaigns from "../views/CampaignsView.vue";

 // Determine if the app is running in standalone mode
const isStandalone = process.env.VUE_APP_STANDALONE === "true";

const shellBaseUrl = !isStandalone ? process.env.VUE_APP_SHELL_BASE_URL : '/';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/blp-vue",
    name: "AppDashboard",
    component: AppDashboard,
  },
  {
    path: "/blp-vue/campaigns",
    name: "AppCampaigns",
    component: AppCampaigns,
  },
  {
    path: "/",
    redirect: "/blp-vue"
  },
];

const router = createRouter({
  history: createWebHistory(shellBaseUrl),
  routes,
});

export default router;
