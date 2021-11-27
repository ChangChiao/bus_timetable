<template>
    <div
        @click="ctrlKeyboard"
        class="ball touch-ball fixed md:absolute right-2 top-32 cursor-pointer"
    >
        <img
            :src="`images/${showKeyboard ? 'keyboard' : 'command'}.svg`"
            alt=""
            v-if="inView"
        />
        <p class="text-gray-500" v-else>TOP</p>
    </div>
</template>

<script>
export default {
    props: {
        showKeyboard: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            inView: true,
        };
    },
    methods: {
        ctrlKeyboard() {
            this.inView && this.$emit("ctrlKeyboard");
            if (!this.inView) {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }
        },
        scrollEvent() {
            this.inView = window.pageYOffset < window.innerHeight;
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
