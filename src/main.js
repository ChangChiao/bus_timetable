import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueGtag from "vue-gtag";
import "./style/main.css";
import "tailwindcss/tailwind.css";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import Pagination from "vue-pagination-2";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faHeart,
    faMapMarkerAlt,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("pagination", Pagination);
library.add(faHeart);
library.add(faMapMarkerAlt);
library.add(faSearch);
Vue.config.productionTip = false;


Vue.use(VueGtag, {
  config: { id: "G-N2LJBT6101" }
});



Vue.prototype.$bus = new Vue();

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
