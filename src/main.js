import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "tailwindcss/tailwind.css";
import Pagination from "vue-pagination-2";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faUserSecret,
    faMapMarkerAlt,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("pagination", Pagination);
library.add(faUserSecret);
library.add(faMapMarkerAlt);
library.add(faSearch);
Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue();

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
