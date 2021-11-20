<template>
    <Map ref="map" @getRouteMap="getRouteMap" :mapInfo="mapInfo" />
</template>

<script>
import Map from "../components/Map.vue";
import { getBusStop } from "../utils/api";
export default {
    components: { Map },
    data() {
        return {
            routeName: "225",
            city: "Taipei",
            mapInfo: [],
        };
    },
    methods: {
        async getRouteMap() {
            const sendData = {
                routeName: this.routeName,
                city: this.city,
            };
            try {
                const result = await getBusStop(sendData);
                console.log("result", result);
                this.mapInfo = result[0].Stops;
                console.log("this.mapInfo", this.mapInfo);
                this.setView();
            } catch (error) {
                console.log("error", error);
            }
        },
        setView() {
            const { PositionLat, PositionLon } = this.mapInfo[0]?.StopPosition;
            this.$refs.map.setView(PositionLat, PositionLon);
            this.$refs.map.drawMark();
        },
    },
    mounted() {
        // this.getRouteMap();
    },
};
</script>

<style lang="postcss"></style>
