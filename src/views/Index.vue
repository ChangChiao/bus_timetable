<template>
    <div class="home">
        <Header />
        <div class="px-4">
            <ul class="mt-8">
                <li class="list-item" @click="goPath('/bussearch')">
                    <p class="w-2/3 text-left">
                        <span class="text-lg font-bold block text-black"
                            >公車快找</span
                        >
                        <span class="text-gray-600 text-sm"
                            >直接輸入路線名稱獲得資訊！</span
                        >
                    </p>
                    <img src="images/Index-section-image04_m.svg" alt="" />
                </li>
                <li class="list-item" @click="goPath('/busnear')">
                    <p class="w-2/3 text-left">
                        <span class="text-lg font-bold block text-black"
                            >查詢站牌</span
                        >
                        <span class="text-gray-600 text-sm"
                            >附近站牌 / 公車動態及路線圖</span
                        >
                    </p>
                    <img src="images/Index-section-image01_m.svg" alt="" />
                </li>
                <li class="list-item" @click="goPath('/favorite')">
                    <p class="w-2/3 text-left">
                        <span class="text-lg font-bold block text-black"
                            >推薦公車路線</span
                        >
                        <span class="text-gray-600 text-sm"
                            >直接輸入路線名稱獲得資訊！</span
                        >
                    </p>
                    <img src="images/Index-section-image02_m.svg" alt="" />
                </li>
            </ul>
        </div>
        <near-stop />
        <Footer />
    </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import NearStop from "../components/NearStop.vue";
// @ is an alias to /src

export default {
    name: "Home",
    components: { Footer, Header, NearStop },
    data() {
        return {};
    },
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
