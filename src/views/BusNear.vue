<template>
    <div>
        <map-near ref="mapNear" @getNowPos="getNowPos" />
        <div
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
        </div>
        <bus-near-list :stopList="stopList" />
        <bus-near-estimate-time />
    </div>
</template>

<script>
import { getStopNear, getNearEstimated, getStationRoute } from "../utils/api";
import BusNearList from "../components/BusNearList.vue";
import MapNear from "../components/MapNear.vue";
import BusNearEstimateTime from "../components/BusNearEstimateTime.vue";
export default {
    components: { BusNearList, MapNear, BusNearEstimateTime },
    data: function () {
        return { stopList: [], timeList: [], routeList: [] };
    },
    computed: {
        stationIDList() {
            return this.stopList.map((vo) => vo.StationID);
        },
        filterReapeatList() {
            const record = [];
            return this.routeList.filter((item) => {
                if (!record.includes(item.StationID)) {
                    record.push(item.StationID);
                    return item;
                }
            });
        },
    },
    methods: {
        getNowPos() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const longitude = position.coords.longitude;
                        const latitude = position.coords.latitude;
                        console.log("longitude", longitude);
                        console.log("latitude", latitude);
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
                $spatialFilter: `nearby(${latitude},${longitude},200)`,
            };
            try {
                const result = await getStopNear(sendData);
                this.stopList = result;
                this.$refs.mapNear.drawStation(result);
                result.length > 0 && this.getStationRouteInfo();
                console.log("this.lineInfo", this.lineInfo); // result.length > 0 && this.calcDistance(latitude, longitude);
                console.log("this.lineInfo", this.lineInfo); // result.length > 0 && this.calcDistance(latitude, longitude);
            } catch (error) {
                console.log("error", error);
            }
        },
        async getStationRouteInfo() {
            for (let i = 0; i < this.stationIDList.length; i++) {
                const sendData = {
                    StationID: this.stationIDList[i],
                };
                try {
                    const result = await getStationRoute(sendData);
                    let temp = [...this.routeList];
                    temp[i].routeList = result;
                    this.routeList = temp;
                    console.log("this.routeList", result);
                } catch (error) {
                    console.log("error", error);
                }
            }
        },
        async getNearEstimated(latitude, longitude) {
            const sendData = {
                $spatialFilter: `nearby(${latitude},${longitude},200)`,
            };
            try {
                const result = await getNearEstimated(sendData);
                this.timeList = result;
                console.log("this.timeList", this.timeList);
            } catch (error) {
                console.log("error", error);
            }
        },
    },
};
</script>
