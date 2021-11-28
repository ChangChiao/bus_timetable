<template>
    <li
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

        <p class="font-bold text-black w-3/5">
            <span>{{ itemData.RouteName.Zh_tw }}</span>
            <span class="text-gray-400 text-sm block w-full">
                {{ (head && `開往${head}`) || "--" }}
            </span>
        </p>
        <img
            class="w-6 block"
            src="images/arrow/arrow-right-light.svg"
            @click="goRouteDetail"
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
    },
    computed: {
        ...mapState(["terminalList"]),
        head() {
            let target = this.terminalList[this.itemData.RouteUID];
            return this.itemData.Direction === 0
                ? target.DestinationStopNameZh
                : target.DepartureStopNameZh;
        },
    },
    methods: {
        transStatus(obj) {
            return transBusStatus(obj);
        },
        goRouteDetail() {
            console.log("gogogo");
        },
    },
};
</script>

<style lang="postcss" scoped></style>
