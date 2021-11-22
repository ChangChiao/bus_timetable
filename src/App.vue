<template>
    <div id="app">
        <!-- <router-link to="/">
            <font-awesome-icon icon="user-secret" />
        </router-link> -->
        <router-view />
        <mobile-menu v-if="false" />
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
    data() {
        return {
            showLoading: false,
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
    text-align: center;
    color: #2c3e50;
}
</style>
