<template>
    <li class="rounded-md pl-4 py-2 border-line border-b text-left">
        <h3 class="font-bold text-black">{{ itemData.RouteName.Zh_tw }}</h3>
        <p class="text-gray-500 text-sm">
            {{ itemData.DepartureStopNameZh }}
            <span> - </span>
            {{ itemData.DestinationStopNameZh }}
        </p>
    </li>
</template>

<script>
export default {
    props: {
        itemData: {
            type: Object,
            default: () => {},
        },
    },
    methods: {
        toBusInfo() {
            this.$router.push("/");
        },
    },
};
</script>
