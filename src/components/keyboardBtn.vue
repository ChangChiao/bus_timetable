<template>
    <div
        @click="ctrlKeyboard"
        class="
            rounded-full
            touch-ball
            fixed
            top-56
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
        <img src="images/keyboard.svg" alt="" v-if="showKeyboard" />
        <p class="text-gray-500" v-else>TOP</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showKeyboard: true,
        };
    },
    methods: {
        ctrlKeyboard() {
            this.showKeyboard && this.$emit("ctrlKeyboard");
            if (!this.showKeyboard) {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }
        },
        scrollEvent() {
            this.showKeyboard = window.pageYOffset < window.innerHeight;
        },
    },
    mounted() {
        window.addEventListener("scroll", this.scrollEvent);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.scrollEvent);
    },
};
</script>

<style lang="postcss" scoped></style>
