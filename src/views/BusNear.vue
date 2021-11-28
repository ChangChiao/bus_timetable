<template>
    <div>
        <Header />
        <map-near ref="mapNear" @setStop="setStop" @getNowPos="getNowPos" />
        <div
            class="touch-ball z-50 right-0 top-72 md:left-0 md:top-48"
            @click="focusSelf"
        >
            <img src="images/cursor.svg" alt="" />
        </div>
        <div
            class="panel side-block"
            :style="{
                transform: 'translateY(' + this.moveY + 'vh)',
                'transition-duration': '0.3s',
            }"
        >
            <div class="h-10 md:hidden" @click="ctrlPanel">
                <div class="w-10 h-0.5 bg-gray-400 m-auto"></div>
            </div>
            <bus-near-list
                v-if="showNearStation"
                @selectStop="selectStop"
                :stopList="stopList"
                :direction="direction"
            />
            <bus-near-estimate
                v-else
                @goBack="goBack"
                :direction="direction"
                :stopInfo="stopInfo"
            />
        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
// import Panel from "../components/Panel";
import { getStopNear } from "../utils/api";
import BusNearList from "../components/BusNearList.vue";
import MapNear from "../components/MapNear.vue";
import BusNearEstimate from "../components/BusNearEstimate.vue";
export default {
    inject: ["appData"],
    components: {
        BusNearList,
        MapNear,
        BusNearEstimate,
        // Panel,
        Footer,
        Header,
    },
    data: function () {
        return {
            moveY: 60,
            stopList: [],
            timeList: [],
            routeList: [],
            stopInfo: {},
            showNearStation: true,
            selfPos: {},
            direction: {
                E: "東行",
                W: "西行",
                S: "南行",
                N: "北行",
                SE: "東南行",
                NE: "東北行",
                SW: "西南行",
                NW: "西北行",
            },
        };
    },
    computed: {
        stationIDList() {
            return this.stopList.map((vo) => vo.StationID);
        },
        isMobile() {
            return this.appData?.windowSize < 780;
        },
    },
    watch: {
        isMobile: {
            immediate: true,
            handler(val) {
                if (!val) {
                    this.moveY = 0;
                }
            },
        },
    },
    methods: {
        getNowPos() {
            if (navigator.geolocation) {
                this.$bus.$emit("setLoading", true);
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const longitude = position.coords.longitude;
                        const latitude = position.coords.latitude;
                        this.selfPos = { latitude, longitude };
                        this.getNearStop(latitude, longitude);
                        this.$refs.mapNear.drawSelfMark(latitude, longitude);
                        this.$bus.$emit("setLoading", false);
                    },
                    (event) => {
                        const { code, message } = event;
                        this.getNearStop(25.047675, 121.517055);
                        this.$bus.$emit("setLoading", false);
                        console.log(
                            "error",
                            `code=${code},
                            msg=${message}`
                        );
                    }
                );
            }
        },
        focusSelf() {
            const { latitude, longitude } = this.selfPos;
            this.$refs.mapNear.setView(latitude, longitude);
        },
        async getNearStop(latitude, longitude) {
            const sendData = {
                $spatialFilter: `nearby(${latitude},${longitude}, 500)`,
            };
            try {
                const result = await getStopNear(sendData);
                this.stopList = this.filterReapeatList(result);
                this.$refs.mapNear.drawStation(this.stopList);
            } catch (error) {
                console.log("error", error);
            }
        },
        filterReapeatList(result) {
            const record = [];
            return result.filter((item) => {
                if (!record.includes(item.StationID)) {
                    record.push(item.StationID);
                    return item;
                }
            });
        },
        selectStop(obj) {
            const { PositionLat, PositionLon } = obj.StationPosition;
            this.stopInfo = obj;
            this.showNearStation = false;
            this.$refs.mapNear.setView(PositionLat, PositionLon, 18);
        },
        ctrlPanel() {
            this.moveY = this.moveY === 60 ? 0 : 60;
        },
        goBack() {
            this.showNearStation = true;
            this.focusSelf();
        },
        setStop(pos) {
            const { lat, lng } = pos;
            const target = this.stopList.find((vo) => {
                const { PositionLat, PositionLon } = vo.StationPosition;
                return PositionLat === lat && PositionLon === lng;
            });
            this.stopInfo = target;
            this.showNearStation = false;
            this.$refs.mapNear.setView(lat, lng, 18);
        },
    },
};
</script>
