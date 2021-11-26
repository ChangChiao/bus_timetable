<template>
    <div>
        <map-route ref="mapRoute" @initData="initData" :mapInfo="mapInfo" />
        <Panel>
            <bus-route-info
                :destination="destination"
                :city="city"
                :routeName="routeName"
            />
        </Panel>
    </div>
</template>

<script>
import Panel from "../components/Panel"
import BusRouteInfo from "../components/BusRouteInfo.vue";
import MapRoute from "../components/MapRoute.vue";
import { getBusStop, getBusLine, getBusPosition } from "../utils/api";

export default {
    components: {
        BusRouteInfo,
        MapRoute,
        Panel
        // Map,
    },
    data() {
        return {
            routeName: "",
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
                console.log("result", result);
                let mapInfo = result[0].Stops;
                console.log("this.mapInfo", mapInfo);
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
                console.log("this.lineInfo", this.lineInfo);
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
                console.log("this.busInfo", busInfo);
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
    },
    mounted() {
        this.routeName = this.$route.query.routeName;
        this.city = this.$route.query.city;
        let to = this.$route.query.to;
        let back = this.$route.query.back;
        this.destination = { to: to, back: back };
        this.$refs.mapRoute.initMap();
    },
};
</script>
