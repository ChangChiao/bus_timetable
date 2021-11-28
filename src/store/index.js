import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    reducer: (state) => ({
        favoriteList: state.favoriteList,
        terminalList: state.terminalList,
    }),
});

const initialState = () => {
    return {
        favoriteList: [],
        terminalList: [],
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
        updateTerminalList(state, obj) {
            const {
                RouteUID,
                RouteName,
                DestinationStopNameZh,
                DepartureStopNameZh,
                City,
            } = obj;
            Vue.set(state.terminalList, RouteUID, {
                RouteName,
                DestinationStopNameZh,
                DepartureStopNameZh,
                City,
            });
        },
    },
    actions: {},
    modules: {},
    plugins: [vuexLocal.plugin],
});
