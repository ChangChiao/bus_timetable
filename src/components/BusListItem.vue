<template>
    <div>
        <h3>{{ "紅10" }}</h3>
        <p>
            {{ "臺大醫院" }}
            <span></span>
            {{ "劍潭" }}
        </p>
    </div>
</template>

<script>
export default {
    props: {
        type: Object,
        default: () => {},
    },
    methods: {
        toBusInfo() {
            this.$router.push("/");
        },
    },
};
</script>
