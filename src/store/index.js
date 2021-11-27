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
            const { RouteUID } = data;
            const index = state.favoriteList.findIndex(
                (vo) => vo.RouteUID === RouteUID
            );
            if (index >= 0) {
                state.favoriteList.splice(index, 1);
            } else {
                state.favoriteList.push(data);
            }
        },
    },
    actions: {},
    modules: {},
    plugins: [vuexLocal.plugin],
});
