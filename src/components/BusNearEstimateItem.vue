<template>
    <li
        @click="goRouteDetail"
        class="
            flex
            items-center
            justify-between
            flex-wrap
            h-16
            border-b
            px-2
            border-line
        "
    >
        <p
            :class="{ red: itemData.EstimateTime <= 90 }"
            class="w-24 font-bold"
            v-html="transStatus(itemData)"
        ></p>

        <p class="text-black w-3/5">
            <span
                ><strong v-if="!isIndex">{{ order }}.</strong>
                {{ itemData.RouteName.Zh_tw }}</span
            >
            <span class="text-gray-400 text-sm block w-full">
                {{ (head && `開往${head}`) || "--" }}
            </span>
        </p>
        <img
            class="w-6 block"
            src="images/arrow/arrow-right-light.svg"
            alt=""
        />
    </li>
</template>

<script>
import { mapState } from "vuex";
import { transBusStatus } from "../utils/common";
export default {
    props: {
        itemData: {
            type: Object,
            default: () => {},
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        ...mapState(["terminalList"]),
        target() {
            return this.terminalList[this.itemData.RouteUID];
        },
        head() {
            return this.itemData.Direction === 0
                ? this.target?.DestinationStopNameZh
                : this.target?.DepartureStopNameZh;
        },
        isIndex() {
            return this.$route.path === "/";
        },
    },
    methods: {
        transStatus(obj) {
            return transBusStatus(obj);
        },
        goRouteDetail() {
            const { RouteName, RouteUID } = this.itemData;
            const { DepartureStopNameZh, DestinationStopNameZh, City } =
                this.target;

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

<style lang="postcss" scoped></style>
