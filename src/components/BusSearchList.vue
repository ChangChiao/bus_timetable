<template>
    <div>
        <h3 class="text-left pt-4 text-gray-500">搜尋結果</h3>
        <ul>
            <li
                v-for="item in pageData"
                :key="item.RouteUID"
                @click="toBusRoute(item)"
                class="rounded-md pl-4 py-2 border-line border-b text-left"
            >
                <h3 class="font-bold text-black">
                    {{ item.RouteName.Zh_tw }}
                </h3>
                <p class="text-gray-500 text-sm">
                    {{ item.DepartureStopNameZh }}
                    <span> - </span>
                    {{ item.DestinationStopNameZh }}
                </p>
                <font-awesome-icon @click="setFavorite" icon="fa-heart" />
            </li>
            <li v-if="pageData.length === 0">
                <p>哎呀!查無結果</p>
                <p>請重新搜尋關鍵字或切換縣市</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        pageData: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        toBusRoute(item) {
            const {
                DepartureStopNameZh,
                DestinationStopNameZh,
                RouteName,
                City,
            } = item;
            this.$router.push({
                path: "/busroute",
                query: {
                    routeName: RouteName.Zh_tw,
                    city: City,
                    to: DepartureStopNameZh,
                    back: DestinationStopNameZh,
                },
            });
        },
        setFavorite(item) {
            const {
                RouteUID,
                RouteName,
                DepartureStopNameZh,
                DestinationStopNameZh,
                City,
                CityCode,
            } = item;
            this.$store.commit("setFavorite", {
                RouteUID,
                RouteName,
                DepartureStopNameZh,
                DestinationStopNameZh,
                City,
                CityCode,
            });
        },
    },
};
</script>
