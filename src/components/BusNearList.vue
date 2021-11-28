<template>
    <div class="md:px-4">
        <h2 class="py-4 text-gray-400 text-left">最近站牌</h2>
        <ul class="relative z-30 w-full">
            <li
                v-for="(item, i) in stopList"
                :key="item.StationUID"
                @click="selectStop(item)"
                class="
                    p-2
                    my-2
                    border border-purple-300
                    cursor-pointer
                    rounded-lg
                    text-left
                "
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
            <li class="no-data" v-if="stopList.length === 0">附近找不到站牌</li>
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
        direction: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {};
    },
    methods: {
        selectStop(obj) {
            this.$emit("selectStop", obj);
        },
        transRoute(arr) {
            const temp = arr.map((vo) => vo.RouteName.Zh_tw);
            return temp.join(",");
        },
    },
};
</script>

<style lang="postcss" scoped></style>
