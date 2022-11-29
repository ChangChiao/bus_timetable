import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueGtag from "vue-gtag";
import "./style/main.css";
// import "tailwindcss/tailwind.css";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import Pagination from "vue-pagination-2";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { getToken } from "@/utils/api";
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("pagination", Pagination);

library.add(faHeart);
Vue.config.productionTip = false;

Vue.use(VueGtag, {
    config: { id: "G-N2LJBT6101" },
});

const checkToken = async () => {
    console.log(
        "test",
        new Date().getTime() <= Number(localStorage.getItem("expireTime"))
    );
    if (
        new Date().getTime() / 1000 <=
        Number(localStorage.getItem("expireTime"))
    )
        return;
    const res = await getToken();
    if (res.access_token) {
        localStorage.setItem("token", res.access_token);
        localStorage.setItem(
            "expireTime",
            new Date().getTime() / 1000 + res.expires_in
        );
    }
};

checkToken();

Vue.prototype.$bus = new Vue();

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
