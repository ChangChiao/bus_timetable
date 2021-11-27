<template>
    <ul class="mt-8 md:fixed md:w-96 md:right-0 top-32 z-50 md:cursor-pointer">
        <li class="list-item" @click="goPath('/bussearch')">
            <p class="w-2/3 text-left">
                <span class="text-lg font-bold block text-black">公車快找</span>
                <span class="text-gray-600 text-sm"
                    >直接輸入路線名稱獲得資訊！</span
                >
            </p>
            <img src="images/Index-section-image04_m.svg" alt="" />
        </li>
        <li class="list-item" @click="goPath('/busnear')">
            <p class="w-2/3 text-left">
                <span class="text-lg font-bold block text-black">查詢站牌</span>
                <span class="text-gray-600 text-sm"
                    >附近站牌 / 公車動態及路線圖</span
                >
            </p>
            <img src="images/Index-section-image01_m.svg" alt="" />
        </li>
        <li class="list-item" @click="goPath('/favorite')">
            <p class="w-2/3 text-left">
                <span class="text-lg font-bold block text-black">我的最愛</span>
                <span class="text-gray-600 text-sm"
                    >將常用路線加入我的最愛吧！</span
                >
            </p>
            <img src="images/Index-section-image02_m.svg" alt="" />
        </li>
    </ul>
</template>

<script>
export default {
    methods: {
        goPath(path) {
            this.$router.push(path);
        },
    },
};
</script>

<style lang="postcss" scoped>
.list-item {
    @apply bg-light h-20 flex items-center pl-4 justify-between rounded-md shadow-lg mb-4;
}
</style>
