import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import BusRoute from "../views/BusRoute.vue";
import BusSearch from "../views/BusSearch.vue";
import Favorite from "../views/Favorite.vue";
import BusNear from "../views/BusNear.vue";
import BusMap from "../views/BusMap.vue";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Index",
        component: Index,
    },
    {
        path: "/busroute",
        name: "BusRoute",
        component: BusRoute,
    },
    {
        path: "/bussearch",
        name: "BusSearch",
        component: BusSearch,
    },
    {
        path: "/favorite",
        name: "Favorite",
        component: Favorite,
    },
    {
        path: "/busnear",
        name: "BusNear",
        component: BusNear,
    },
    {
        path: "/busmap",
        name: "BusMap",
        component: BusMap,
    },
];

const router = new VueRouter({
    routes,
});

export default router;
