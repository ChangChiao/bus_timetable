<template>
    <div class="home">
        <Header />
        <div class="px-4">
            <index-menu />
        </div>
        <div class="for-web">
            <map-near />
        </div>
        <near-stop />
        <Footer />
    </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import IndexMenu from '../components/IndexMenu.vue';
import MapNear from '../components/MapNear.vue';
import NearStop from "../components/NearStop.vue";
// @ is an alias to /src

export default {
    name: "Home",
    components: { Footer, Header, NearStop, IndexMenu, MapNear },
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

</style>
