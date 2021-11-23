<template>
    <div class="w-screen overflow-hidden">
        <div class="fixed w-screen h-screen top-0 left-0 z-20" v-if="active">
            <div class="mask"></div>
            <nav
                class="
                    menu
                    overflow-hidden
                    fixed
                    right-0
                    top-0
                    w-60
                    gradients-dark
                    z-30
                "
            >
                <!-- <div class="hamburger">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </div> -->
                <ul
                    class="
                        menu-list
                        absolute
                        pt-16
                        pr-48
                        top-16
                        rounded-full
                        gradients
                    "
                >
                    <li
                        v-for="item in menuList"
                        class="text-white pr-40 py-4 text-right text-lg"
                        :key="item.path"
                    >
                        <router-link :to="item.path">{{
                            item.name
                        }}</router-link>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="hamburger" @click="ctrlMenu">
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menuList: [
                { name: "回首頁", path: "/" },
                { name: "公車快找", path: "/bussearch" },
                { name: "查詢公車", path: "/busnear" },
                { name: "該搭哪一台公車", path: "/b" },
                { name: "我的最愛", path: "/favorite" },
            ],
            active: false,
        };
    },
    methods: {
        ctrlMenu() {
            this.active = !this.active;
        },
    },
};
</script>

<style lang="postcss" scoped>
.menu {
    border-bottom-left-radius: 160px;
    height: 475px;
    transition: 0.5s;
}

.menu-list {
    height: 500px;
    width: 500px;
}
.hamburger {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background: #d5d6d8;
    overflow: hidden;
    position: fixed;
    z-index: 100;
    right: -57px;
    top: -50px;
    padding-top: 40px;
    padding-right: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.hamburger::after {
    content: "";
    top: 50px;
    left: 0;
    width: 30px;
    height: 30px;
    position: absolute;
    background-image: url("/images/Frame 4-1.svg");
}

.line {
    width: 30px;
    height: 3px;
    background-color: #7550cc;
    display: block;
    margin: 3px 0;
    transition: all 0.3s ease-in-out;
}

.line:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}

.line:nth-child(2) {
    opacity: 0;
}

.line:nth-child(3) {
    transform: translateY(-10px) rotate(-45deg);
}
</style>
