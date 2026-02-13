import { createRouter, createWebHistory } from "vue-router";
import Guard from "./guard";

// Routes
import { ROUTES_TEST, ROUTES_LY0, ROUTES_COMMON_TEST, ROUTES_VIEWS } from "./routes";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...ROUTES_TEST,
    ...ROUTES_LY0,
    ...ROUTES_COMMON_TEST,
    ...ROUTES_VIEWS
  ]
});

router.beforeEach(Guard.beforeEach);

export default router;
