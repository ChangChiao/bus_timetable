<template>
    <div class="home">
        <Header />
        <div class="px-4">
            <index-menu />
        </div>
        <map-index ref="mapIndex" />
        <near-stop @setNowPos="setNowPos" @drawStation="drawStation" />
        <Footer />
    </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import IndexMenu from "../components/IndexMenu.vue";
import MapIndex from "../components/MapIndex.vue";
import NearStop from "../components/NearStop.vue";
// @ is an alias to /src

export default {
    name: "Home",
    components: { Footer, Header, NearStop, IndexMenu, MapIndex },
    data() {
        return {};
    },
    methods: {
        goPath(path) {
            this.$router.push(path);
        },
        setNowPos(obj) {
            const { latitude, longitude } = obj;
            this.$refs.mapIndex.setView(latitude, longitude);
            this.$refs.mapIndex.drawSelfMark(latitude, longitude);
        },
        drawStation(obj) {
            const { PositionLat, PositionLon } = obj;
            this.$refs.mapIndex.drawStation(PositionLat, PositionLon);
        },
    },
};
</script>

<style lang="postcss" scoped></style>
