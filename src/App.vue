<template>
    <div id="app">
        <router-view />
        <mobile-menu v-if="showMobileMenu" />
        <Loading v-if="showLoading" />
    </div>
</template>

<script>
import Loading from "./components/Loading";
import MobileMenu from "./components/MobileMenu.vue";
export default {
    components: {
        Loading,
        MobileMenu,
    },
    watch: {
        $route: {
            immediate: true,
            handler: function (to) {
                this.showMobileMenu = to.path !== "/";
            },
        },
    },
    data() {
        return {
            showLoading: false,
            showMobileMenu: false,
        };
    },
    created() {
        this.$bus.$on("setLoading", (boolean) => {
            this.showLoading = boolean;
        });
    },
    beforeDestroy() {
        this.$bus.$off("setLoading");
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
