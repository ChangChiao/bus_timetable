<template>
    <div>
        <Header />
        <map-near ref="mapNear" @getNowPos="getNowPos" />
        <!-- <div
            class="
                rounded-full
                touch-ball
                fixed
                bg-light
                w-16
                h-16
                flex
                justify-center
                items-center
                shadow-lg
            "
        >
            <img src="images/cursor.svg" alt="" />
        </div> -->
        <div
            class="panel side-block"
            :style="{ transform: 'translateY(' + this.moveY + 'vh)' }"
        >
            <div class="h-10 md:hidden" @click="ctrlPanel">
                <div class="w-10 h-0.5 bg-gray-400 m-auto"></div>
            </div>
            <bus-near-list
                v-if="showNearStation"
                @selectStop="selectStop"
                :stopList="stopList"
            />
            <bus-near-estimate v-else :stopInfo="stopInfo" />
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
        isMobile(val) {
            if (!val) {
                this.moveY = 0;
            }
        },
    },
    methods: {
        getNowPos() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const longitude = position.coords.longitude;
                        const latitude = position.coords.latitude;
                        this.getNearStop(latitude, longitude);
                        this.$refs.mapNear.drawSelfMark(latitude, longitude);
                    },
                    (event) => {
                        const { code, message } = event;
                        this.getNearStop(25.047675, 121.517055);
                        console.log(
                            "error",
                            `code=${code},
                            msg=${message}`
                        );
                    }
                );
            }
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
    },
};
</script>
