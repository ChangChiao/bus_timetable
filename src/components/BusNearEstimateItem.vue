<template>
    <li class="w-full flex items-center border-b p-4 border-line relative">
        <p class="w-24" v-html="transStatus(itemData)"></p>
        <p>
            <span>{{ itemData.RouteName.Zh_tw }}</span>
            <span class="text-gray-400 text-sm block w-full">
                {{
                    (terminalList[itemData.RouteUID] &&
                        `開往${terminalList[itemData.RouteUID]}`) ||
                    "--"
                }}
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
import { mapState } from "vuex";
import { transBusStatus } from "../utils/common";
export default {
    props: {
        itemData: {
            type: Object,
            default: () => {},
        },
    },
    computed: { ...mapState(["terminalList"]) },

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
