<template>
    <div
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
        :style="{ transform: 'translateY(' + this.moveY + 'px)' }"
        class="
            pt-2
            rounded-tl-3xl
            px-4
            h-screen
            w-screen
            rounded-rl-3xl
            bg-light
            fixed
            z-20
            bottom-0
            overflow-y-scroll
            max-h-14
        "
    >
        <div class="w-10 h-0.5 bg-gray-400 m-auto"></div>
        <slot></slot>
    </div>
</template>

<script>
const startPos = {
    x: 0,
    y: 0,
};
const endPos = {
    x: 0,
    y: 0,
};
export default {
    data() {
        return {
            moveY: 0,
        };
    },
    methods: {
        touchstart(e) {
            if (
                this.penndiing ||
                !this.isLogin ||
                this.isLockedMove ||
                this.isForbidden
            )
                return;
            this.sec = 0.5;
            this.touchPath = e.path || e?.composedPath?.();
            startPos.x = e.touches[0].pageX;
            startPos.y = e.touches[0].pageY;
        },
        touchmove(e) {
            endPos.x = e.touches[0].pageX;
            endPos.y = e.touches[0].pageY;
        },
        touchend() {
            let x = endPos.x - startPos.x;
            let y = endPos.y - startPos.y;
            if (Math.abs(y) > Math.abs(x)) {
                //水平滑動
                this.moveY = y > 0 ? 30 : 80;
            }
        },
    },
};
</script>

<style lang="postcss" scoped></style>
