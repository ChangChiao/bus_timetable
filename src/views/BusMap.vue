<template>
    <Map ref="map" @initData="initData" :mapInfo="mapInfo" />
</template>

<script>
import Map from "../components/Map.vue";
import { getBusStop, getBusLine, getBusPosition } from "../utils/api";
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
        async getRouteMapMark() {
            const sendData = {
                routeName: this.routeName,
                city: this.city,
            };
            try {
                const result = await getBusStop(sendData);
                let mapInfo = result[0].Stops;
                this.setView(mapInfo);
            } catch (error) {
                console.log("error", error);
            }
        },
        async getRouteLine() {
            const sendData = { routeName: this.routeName, city: this.city };
            try {
                const result = await getBusLine(sendData);
                let lineInfo = result[0].Geometry;
                this.$refs.map.drawLine(lineInfo);
            } catch (error) {
                console.log("error", error);
            }
        },
        async getBusPos() {
            const sendData = { routeName: this.routeName, city: this.city };
            try {
                const result = await getBusPosition(sendData);
                let busInfo = result;
                this.$refs.map.drawBus(busInfo);
            } catch (error) {
                console.log("error", error);
            }
        },
        initData() {
            this.getRouteMapMark();
            this.getRouteLine();
            this.getBusPos();
        },
        setView(mapInfo) {
            const { PositionLat, PositionLon } = mapInfo[0]?.StopPosition;
            this.$refs.map.drawMark(mapInfo);
            this.$refs.map.setView(PositionLat, PositionLon);
        },
    },
    mounted() {},
};
</script>

<style lang="postcss"></style>
