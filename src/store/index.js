import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    reducer: (state) => ({
        channelAccount: state.text,
    }),
});

const initialState = () => {
    return {
        text: "",
    };
};

export default new Vuex.Store({
    state: initialState,
    mutations: {},
    actions: {},
    modules: {},
    plugins: [vuexLocal.plugin],
});
