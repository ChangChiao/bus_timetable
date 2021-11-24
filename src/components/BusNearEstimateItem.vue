<template>
    <li class="w-full border-b p-4 border-line relative">
        <span :class="{ red: item.EstimateTime <= 90 }">
            {{ transStatus(item.EstimateTime) }}
        </span>
        <span>{{ item.RouteName.Zh_tw }}</span>
        <img
            src="images/arrow/arrow-right-light.svg"
            @click="goRouteDetail"
            alt=""
        />
    </li>
</template>

<script>
import { transBusStatus } from "../utils/common";
export default {
    props: {
        itemData: {
            type: Object,
            default: () => {},
        },
    },
    methods: {
        transStatus(sec) {
            return transBusStatus(sec);
        },
        goRouteDetail() {
            console.log("gogogo");
        },
    },
};
</script>

<style lang="postcss" scoped></style>
