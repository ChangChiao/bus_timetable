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
        <Panel>
            <bus-near-list
                v-if="showNearStation"
                @selectRoute="selectRoute"
                :stopList="stopList"
            />
            <bus-near-estimate v-else :stationId="stationId" :city="city" />
        </Panel>
    </div>
</template>

<script>
import Panel from "../components/Panel";
import { CITY_LIST } from "../global/constant";
import { getStopNear } from "../utils/api";
import BusNearList from "../components/BusNearList.vue";
import MapNear from "../components/MapNear.vue";
import BusNearEstimate from "../components/BusNearEstimate.vue";
export default {
    components: { BusNearList, MapNear, BusNearEstimate, Panel },
    data: function () {
        return {
            stopList: [],
            timeList: [],
            routeList: [],
            stationId: "",
            city: "",
            showNearStation: true,
        };
    },
    computed: {
        stationIDList() {
            return this.stopList.map((vo) => vo.StationID);
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
                $spatialFilter: `nearby(${latitude},${longitude},200)`,
            };
            try {
                const result = await getStopNear(sendData);
                this.stopList = this.filterReapeatList(result);
                this.$refs.mapNear.drawStation(result);
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
        selectRoute(obj) {
            const { LocationCityCode, StationID } = obj;
            const { value } = CITY_LIST.find(
                (item) => item.ISO === LocationCityCode
            );
            this.stationId = StationID;
            this.city = value;
            this.showNearStation = false;
        },
    },
};
</script>
