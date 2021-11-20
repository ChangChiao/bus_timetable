import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    reducer: (state) => ({
        favoriteList: state.favoriteList,
    }),
});

const initialState = () => {
    return {
        favoriteList: [],
    };
};

export default new Vuex.Store({
    state: initialState,
    mutations: {
        updateFavoriteList(state, data) {
            state.favoriteList = data;
        },
    },
    actions: {},
    modules: {},
    plugins: [vuexLocal.plugin],
});
