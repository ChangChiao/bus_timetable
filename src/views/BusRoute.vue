<template>
    <div>
        <map-route ref="mapRoute" @initData="initData" :mapInfo="mapInfo" />
        <div
            class="panel"
            :style="{ transform: 'translateY(' + this.moveY + 'vh)' }"
        >
            <div class="h-10 md:hidden" @click="ctrlPanel">
                <div class="w-10 h-0.5 bg-gray-400 m-auto"></div>
            </div>
            <bus-route-info
                :destination="destination"
                :city="city"
                :routeUID="routeUID"
                :routeName="routeName"
            />
        </div>
    </div>
</template>

<script>
import BusRouteInfo from "../components/BusRouteInfo.vue";
import MapRoute from "../components/MapRoute.vue";
import { getBusStop, getBusLine, getBusPosition } from "../utils/api";

export default {
    components: {
        BusRouteInfo,
        MapRoute,
        // Map,
    },
    data() {
        return {
            moveY: 60,
            routeName: "",
            routeUID: "",
            city: "",
            mapInfo: [],
            destination: {
                to: "",
                back: "",
            },
        };
    },
    methods: {
        async getRouteMapMark() {
            const sendData = { routeName: this.routeName, city: this.city };
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
                this.$refs.mapRoute.drawLine(lineInfo);
            } catch (error) {
                console.log("error", error);
            }
        },
        async getBusPos() {
            const sendData = { routeName: this.routeName, city: this.city };
            try {
                const result = await getBusPosition(sendData);
                let busInfo = result;
                this.$refs.mapRoute.drawBus(busInfo);
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
            this.$refs.mapRoute.drawMark(mapInfo);
            this.$refs.mapRoute.setView(PositionLat, PositionLon);
        },
        ctrlPanel() {
            this.moveY = this.moveY === 60 ? 0 : 60;
        },
    },
    mounted() {
        this.routeName = this.$route.query.routeName;
        this.routeUID = this.$route.query.routeUID;
        this.city = this.$route.query.city;
        let to = this.$route.query.to;
        let back = this.$route.query.back;
        this.destination = { to: to, back: back };
        this.$refs.mapRoute.initMap();
    },
};
</script>
