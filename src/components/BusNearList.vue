<template>
    <div
        class="
            pt-2
            rounded-tl-3xl
            px-4
            h-72
            w-screen
            rounded-rl-3xl
            bg-light
            fixed
            z-20
            bottom-0
        "
    >
        <div class="w-10 h-0.5 bg-gray-400 m-auto"></div>
        <h2 class="py-4 text-gray-400 text-left">最近站牌</h2>
        <ul>
            <li
                v-for="item in stopList"
                :key="item.StationUID"
                class="p-2 my-2 border border-purple-300 rounded-lg text-left"
            >
                <h3 class="font-bold text-black py-2">
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
                <p class="text-primary-700"></p>
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
};
</script>

<style lang="postcss" scoped></style>
