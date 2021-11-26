<template>
    <header
        class="
            gradients-deep
            flex flex-wrap
            justify-center
            items-center
            relative
            h-24
            w-full
            text-white
            md:justify-between
        "
    >
        <h1 class="w-full text-2xl text-right pr-5 md:hidden">
            機智公車族
            <p class="text-base">全台公車動態時刻查詢應用服務</p>
        </h1>
        <ul class="hidden md:block">
            <li
                v-for="item in menuList"
                class="text-white pr-40 py-4 text-right text-lg"
                @click="goPath(item.path)"
                :key="item.path"
            >
                {{ item.name }}
            </li>
        </ul>
        <img
            class="absolute top-1 left-1"
            src="images/Index-header-logo.svg"
            alt=""
        />
        <img
            class="absolute bottom-0 right-0"
            src="images/Index-header-quarter.svg"
            alt=""
        />
    </header>
</template>

<script>
export default {
    data(){
        return{
            menuList: [
                { name: "回首頁", path: "/" },
                { name: "公車快找", path: "/bussearch" },
                { name: "查詢公車", path: "/busnear" },
                { name: "我的最愛", path: "/favorite" },
            ],
        }
    },
    components: {},
};
</script>

<style lang="postcss">
header {
    border-bottom-left-radius: 50px;
}
</style>
