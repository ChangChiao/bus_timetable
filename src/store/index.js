import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    reducer: (state) => ({
        favoriteList: state.favoriteList,
        historyList: state.historyList,
    }),
});

const initialState = () => {
    return {
        favoriteList: [],
        historyList: [],
    };
};

export default new Vuex.Store({
    state: initialState,
    mutations: {
        updateFavoriteList(state, data) {
            state.favoriteList = data;
        },
        updateHistoryList(state, data) {
            state.historyList = data;
        },
    },
    actions: {},
    modules: {},
    plugins: [vuexLocal.plugin],
});
