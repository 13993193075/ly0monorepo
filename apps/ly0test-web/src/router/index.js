import { createRouter, createWebHistory } from "vue-router";
import Guard from "./guard.js";

// Routes
import { ROUTES_TEST, ROUTES_LY0, ROUTES_PORTALS } from "./routes/index.js";

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...ROUTES_TEST,
        ...ROUTES_LY0,
        ...ROUTES_PORTALS
    ]
});

router.beforeEach(Guard.beforeEach);

export default router;
