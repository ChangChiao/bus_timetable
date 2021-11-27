<template>
    <li class="w-full border-b p-4 border-line relative">
        <p class="w-24" v-html="transStatus(itemData.EstimateTime)"></p>
        <p>
            <span class="text-gray-400 text-sm block w-full">
                {{ itemData }}
                {{ (itemData.head && `開往${itemData.head}`) || "--" }}
            </span>
        </p>
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
