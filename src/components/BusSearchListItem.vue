<template>
    <li
        @click="toBusRoute()"
        class="rounded-md pl-4 py-2 border-line border-b text-left relative"
    >
        <h3 class="font-bold text-black">
            {{ item.RouteName.Zh_tw }}
        </h3>
        <p class="text-gray-500 text-sm">
            {{ item.DepartureStopNameZh }}
            <span> - </span>
            {{ item.DestinationStopNameZh }}
        </p>
        <img
            class="w-6 absolute right-2 top-4"
            src="images/arrow/arrow-right-light.svg"
            alt=""
        />
    </li>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => {},
        },
    },
    methods: {
        toBusRoute() {
            const {
                DepartureStopNameZh,
                DestinationStopNameZh,
                RouteName,
                RouteUID,
                City,
            } = this.item;
            this.$router.push({
                path: "/busroute",
                query: {
                    routeUID: RouteUID,
                    routeName: RouteName.Zh_tw,
                    city: City,
                    to: DepartureStopNameZh,
                    back: DestinationStopNameZh,
                },
            });
        },
    },
};
</script>
