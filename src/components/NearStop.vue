<template>
    <div class="near-stop side-block">
        <div class="pos-btn px-4" v-show="!showList">
            <p class="text-center text-md font-bold block text-black pt-6">
                開啟裝置定位功能，以便為您提供更好的服務。
            </p>
            <p class="text-center text-sm text-primary-700 pb-2">
                我們將用在提供您所在位置附近的交通等資訊。
            </p>
            <button
                class="
                    border-2
                    w-full
                    h-12
                    text-primary-500
                    border-primary-500
                    rounded-3xl
                "
                @click="getNowPos"
            >
                開啟定位功能
            </button>
        </div>
        <div
            class="near-list bg-light mt-8 py-4 px-4 pb-16 min-h"
            v-show="showList"
        >
            <p class="text-sm text-left py-2 font-bold text-gray-500">
                最近站牌
            </p>
            <div class="flex items-center justify-between">
                <p class="font-bold text-lg">
                    {{ nearStop.StationName && nearStop.StationName.Zh_tw }}
                </p>
                <span
                    class="text-sm text-left font-bold text-gray-500"
                    v-show="timeList.length > 0"
                    >將於{{ second }}秒後更新
                    <img
                        @click="refresh"
                        class="inline"
                        src="images/Refresh.svg"
                        alt=""
                /></span>
            </div>
            <ul class="overflow-y-scroll md:h-96">
                <template v-for="item in timeList">
                    <bus-near-estimate-item
                        :key="item.StopUID"
                        :itemData="item"
                    />
                </template>
                <li class="no-data" v-show="timeList.length === 0">
                    附近無站牌
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { CITY_LIST } from "../global/constant";
import { getStopNear, getNearEstimated, getBusRoute } from "../utils/api";
import { getDistance, transBusStatus } from "../utils/common";
import BusNearEstimateItem from "./BusNearEstimateItem.vue";

export default {
    components: { BusNearEstimateItem },
    data() {
        return {
            showList: false,
            timer: null,
            second: 60,
            nearPos: {
                latitude: "",
                longitude: "",
            },
            stopList: [],
            nearStop: {},
            timeList: [],
            initFlag: false,
            isPendding: false,
        };
    },
    computed: {
        ...mapState(["terminalList"]),
    },
    methods: {
        transStatus(obj) {
            return transBusStatus(obj);
        },
        refresh() {
            this.second = 60;
            this.getNearEstimated();
            this.getDataByTimer();
        },
        getDataByTimer() {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.second -= 1;
                if (this.second <= 0) {
                    this.second = 60;
                    this.getNearEstimated();
                }
            }, 1000);
        },
        getNowPos() {
            if (navigator.geolocation) {
                this.$bus.$emit("setLoading", true);
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const longitude = position.coords.longitude;
                        const latitude = position.coords.latitude;
                        this.showList = true;
                        this.getNearStop(latitude, longitude);
                        this.setNowPos({ latitude, longitude });
                        this.$bus.$emit("setLoading", false);
                    },
                    (event) => {
                        const { code, message } = event;
                        console.log("error", `code=${code}, msg=${message}`);
                        this.$bus.$emit("setLoading", false);
                    }
                );
            }
        },
        setNowPos(obj) {
            this.$emit("setNowPos", obj);
        },
        filterBusList(result) {
            const record = [];
            return result.filter((item) => {
                if (!record.includes(item.StationID)) {
                    record.push(item.StationID);
                    return item;
                }
            });
        },
        async getNearStop(latitude, longitude) {
            const sendData = {
                $spatialFilter: `nearby(${latitude},${longitude},200)`,
            };
            try {
                const result = await getStopNear(sendData);
                this.stopList = this.filterBusList(result);
                result.length > 0 && this.calcDistance(latitude, longitude);
            } catch (error) {
                console.log("error", error);
            }
        },
        calcDistance(latitude, longitude) {
            if (this.stopList.length === 1) {
                this.nearStop = this.stopList[0];
                return;
            }
            const newArr = this.stopList.map((vo) => {
                return [
                    vo.StationPosition?.PositionLat,
                    vo.StationPosition?.PositionLon,
                ];
            });
            const compare = newArr.map((item) => {
                const [stopLat, stopLon] = item;
                return getDistance(latitude, longitude, stopLat, stopLon);
            });
            const minIndex = compare.indexOf(Math.min(...compare));
            this.nearStop = this.stopList[minIndex];
            const { PositionLat, PositionLon } = this.nearStop.StationPosition;
            this.nearPos = {
                latitude: PositionLat,
                longitude: PositionLon,
            };
            this.$emit("drawStation", { PositionLat, PositionLon });
            this.getNearEstimated();
        },
        async getNearEstimated() {
            const { latitude, longitude } = this.nearPos;
            const sendData = {
                $spatialFilter: `nearby(${latitude},${longitude}, 30)`,
            };
            try {
                const result = await getNearEstimated(sendData);
                this.timeList = result;
                if (this.timeList.length > 0) {
                    this.getDataByTimer();
                }
                !this.initFlag && this.getBusInfo();
            } catch (error) {
                console.log("error", error);
            }
        },
        async getBusInfo() {
            let temp = [...this.timeList];
            for (let i = 0; i < temp.length; i++) {
                const { RouteUID } = this.timeList[i];
                const cityCode = RouteUID.substr(0, 3);
                const { value: city } = CITY_LIST.find(
                    (item) => item.ISO === cityCode
                );
                if (this.terminalList[RouteUID]) return;
                const sendData = {
                    city,
                    $filter: `contains(RouteUID, '${RouteUID}')`,
                };
                try {
                    const result = await getBusRoute(sendData);
                    const {
                        DepartureStopNameZh,
                        DestinationStopNameZh,
                        City,
                        RouteName,
                    } = result[0];
                    this.$store.commit("updateTerminalList", {
                        RouteName: RouteName.Zh_tw,
                        RouteUID,
                        DestinationStopNameZh,
                        DepartureStopNameZh,
                        City,
                    });
                } catch (error) {
                    console.log("error", error);
                }
            }
            this.initFlag = true;
        },
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
};
</script>

<style lang="css" scoped>
.near-list {
    border-top-right-radius: 60px;
}
@media screen and (max-width: 768px) {
}
</style>
