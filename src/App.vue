<template>
    <div id="app">
        <router-link to="/">
            <font-awesome-icon icon="user-secret" />
        </router-link>
        <router-view />
        <Loading v-if="showLoading" />
    </div>
</template>

<script>
import Loading from "./components/Loading";
export default {
    components: {
        Loading,
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

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
