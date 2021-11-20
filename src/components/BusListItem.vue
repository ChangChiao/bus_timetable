<template>
    <div class="border rounded-md p-2">
        <h3>{{ itemData.RouteName.Zh_tw }}</h3>
        <p>
            {{ itemData.DepartureStopNameZh }}
            <span></span>
            {{ itemData.DestinationStopNameZh }}
        </p>
    </div>
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
