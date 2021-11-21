<template>
    <div class="home">
        <Header />
        <router-link to="/busRoute">/busRoute</router-link>
        <router-link to="/busSearch">/busSearch</router-link>
        <router-link to="/favorite">/favorite</router-link>
        <router-link to="/busNear">/busNear</router-link>
        <router-link to="/busmap">/busmap</router-link>
        <div class="px-4">
            <ul class="mt-4">
                <li class="list-item">
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
                <li class="list-item">
                    <p class="w-2/3 text-left">
                        <span class="text-lg font-bold block text-black"
                            >公車快找</span
                        >
                        <span class="text-gray-600 text-sm"
                            >直接輸入路線名稱獲得資訊！</span
                        >
                    </p>
                    <img src="images/Index-section-image01_m.svg" alt="" />
                </li>
                <li class="list-item">
                    <p class="w-2/3 text-left">
                        <span class="text-lg font-bold block text-black"
                            >公車快找</span
                        >
                        <span class="text-gray-600 text-sm"
                            >直接輸入路線名稱獲得資訊！</span
                        >
                    </p>
                    <img src="images/Index-section-image02_m.svg" alt="" />
                </li>
            </ul>
            <p class="text-md font-bold block text-black pt-6">
                開啟裝置定位功能，以便為您提供更好的服務。
            </p>
            <p class="text-sm text-primary-700 pb-2">
                我們將用在提供您所在位置附近的交通等資訊。
            </p>
            <button
                class="
                    border-2
                    w-full
                    h-12
                    text-primary-500
                    border-primary-500
                    rounded-3xl
                "
                @click="getNowPos"
            >
                開啟定位功能
            </button>
        </div>
        <near-stop v-show="showNear" ref="near" />
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
        return {
            showNear: false,
        };
    },
    methods: {
        getNowPos() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const longitude = position.coords.longitude;
                        const latitude = position.coords.latitude;
                        console.log("longitude", longitude);
                        console.log("latitude", latitude);
                        this.showNear = true;
                        this.$refs.near.getNearStop(latitude, longitude);
                    },
                    (event) => {
                        const { code, message } = event;
                        console.log("error", `code=${code}, msg=${message}`);
                    }
                );
            }
        },
    },
};
</script>

<style lang="postcss" scoped>
.list-item {
    @apply bg-light h-20 flex items-center pl-4 justify-between rounded-md shadow-lg mb-4;
}
</style>
