<template>
    <div class="md:fixed md:bottom-8 md:left-0">
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
        <div class="near-list bg-light mt-8 py-4 px-4 min-h" v-show="showList">
            <p class="text-sm text-left font-bold text-gray-500">最近站牌</p>
            <div class="flex items-center justify-between">
                <p class="font-bold text-lg">
                    {{ nearStop.StationName && nearStop.StationName.Zh_tw }}
                </p>
                <span
                    class="text-sm text-left font-bold text-gray-500"
                    v-show="timeList.length > 0"
                    >{{ second }}秒後更新
                    <img class="inline" src="images/Refresh.svg" alt=""
                /></span>
            </div>
            <ul class="overflow-y-scroll">
                <li
                    v-for="item in timeList"
                    :key="item.RouteUID"
                    class="
                        flex
                        items-center
                        justify-between
                        flex-wrap
                        h-16
                        border-b
                        px-2
                        border-line
                    "
                >
                    <p
                        :class="{ red: item.EstimateTime <= 90 }"
                        class="w-1/5 font-bold"
                        v-html="transStatus(item.EstimateTime)"
                    ></p>
                    <p class="font-bold text-black w-3/5">
                        {{ item.RouteName.Zh_tw }}
                        <span class="text-gray-400 text-sm block w-full">
                            {{ (item.head && `開往${item.head}`) || "--" }}
                        </span>
                    </p>
                    <img
                        class="w-6 block"
                        src="images/arrow/arrow-right-light.svg"
                        alt=""
                    />
                </li>
                <li
                    class="text-primary-500 text-md"
                    v-show="timeList.length === 0"
                >
                    附近無站牌
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { CITY_LIST } from "../global/constant";
import { getStopNear, getNearEstimated, getBusRoute } from "../utils/api";
import { getDistance, transBusStatus } from "../utils/common";
export default {
    data: function () {
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
        };
    },
    computed: {
        filterBusList() {
            const record = [];
            return this.stopList.filter((item) => {
                if (!record.includes(item.StationID)) {
                    record.push(item.StationID);
                    return item;
                }
            });
        },
    },
    methods: {
        transStatus(sec) {
            return transBusStatus(sec);
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
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const longitude = position.coords.longitude;
                        const latitude = position.coords.latitude;
                        console.log("longitude", longitude);
                        console.log("latitude", latitude);
                        this.showList = true;
                        this.getNearStop(latitude, longitude);
                    },
                    (event) => {
                        const { code, message } = event;
                        console.log("error", `code=${code}, msg=${message}`);
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
                console.log("this.lineInfo", this.stopList);

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
            console.log("xxxx", this.nearStop.StationPosition);
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
                console.warn("this.timeList", this.timeList);
            } catch (error) {
                console.log("error", error);
            }
        },
        async getBusInfo() {
            let temp = [...this.timeList];
            for (let i = 0; i < temp.length; i++) {
                const { RouteUID, Direction } = this.timeList[i];
                const cityCode = RouteUID.substr(0, 3);
                const { value: city } = CITY_LIST.find(
                    (item) => item.ISO === cityCode
                );

                const sendData = {
                    city,
                    $filter: `contains(RouteUID, '${RouteUID}')`,
                };
                try {
                    const result = await getBusRoute(sendData);
                    const { DepartureStopNameZh, DestinationStopNameZh } =
                        result[0];
                    let head =
                        Direction === 0
                            ? DestinationStopNameZh
                            : DepartureStopNameZh;
                    temp[i].head = head;
                    console.warn("head----", head);
                } catch (error) {
                    console.log("error", error);
                }
            }
            this.timeList = temp;
            this.nitFlag = true;
        },
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
};
</script>

<style lang="postcss">
.near-list {
    border-top-right-radius: 60px;
}
</style>
