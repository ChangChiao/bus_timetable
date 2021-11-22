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
    </div>
</template>

<script>
import { getStopNear, getNearEstimated } from "../utils/api";
import BusNearList from "../components/BusNearList.vue";
import MapNear from "../components/MapNear.vue";
export default {
    components: { BusNearList, MapNear },
    data: function () {
        return { stopList: [], timeList: [] };
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
                $spatialFilter: `nearby(${latitude},${longitude},170)`,
            };
            try {
                const result = await getStopNear(sendData);
                this.stopList = result;
                this.$refs.mapNear.drawStation(result);
                console.log("this.lineInfo", this.lineInfo); // result.length > 0 && this.calcDistance(latitude, longitude);
            } catch (error) {
                console.log("error", error);
            }
        },
    },
    async getNearEstimated(latitude, longitude) {
        const sendData = {
            $spatialFilter: `nearby(${latitude},${longitude},30)`,
        };
        try {
            const result = await getNearEstimated(sendData);
            this.timeList = result;
            console.log("this.timeList", this.timeList);
        } catch (error) {
            console.log("error", error);
        }
    },
};
</script>
