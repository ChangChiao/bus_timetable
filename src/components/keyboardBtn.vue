<template>
    <div
        class="
            rounded-full
            touch-ball
            fixed
            top-12
            right-0
            bg-light
            w-16
            h-16
            flex
            justify-center
            items-center
            shadow-lg
        "
    >
        <img src="images/keyboard.svg" alt="" />
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        ctrlKeyboard() {
            this.$emit("ctrlKeyboard");
        },
    },
    mounted() {},
};
</script>

<style lang="postcss" scoped></style>
