<template>
    <div class="side-block px-4">
        <h2 class="py-4 text-gray-400 text-left">最近站牌</h2>
        <ul class="relative z-30 w-full">
            <li
                v-for="(item, i) in stopList"
                :key="item.StationUID"
                @click="selectRoute(item)"
                class="p-2 my-2 border border-purple-300 rounded-lg text-left"
            >
                <h3 class="font-bold text-black py-2">
                    <span>{{ i + 1 }}</span>
                    {{ item.StationName.Zh_tw }}
                    <span
                        class="
                            rounded-full
                            bg-gray-400
                            px-2
                            py-1
                            text-sm text-white
                        "
                    >
                        {{ direction[item.Bearing] }}
                    </span>
                </h3>
                <p class="text-primary-700">
                    <!-- {{ item.routeList }} -->
                    {{ transRoute(item.Stops) }}
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        stopList: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            direction: {
                E: "東行",
                W: "西行",
                S: "南行",
                N: "北行",
                SE: "東南行",
                NE: "東北行",
                SW: "西南行",
                NW: "西北行",
            },
        };
    },
    methods: {
        selectRoute(obj) {
            this.$emit("selectRoute", obj);
        },
        transRoute(arr) {
            const temp = arr.map((vo) => vo.RouteName.Zh_tw);
            return temp.join(",");
        },
    },
};
</script>

<style lang="postcss" scoped></style>
