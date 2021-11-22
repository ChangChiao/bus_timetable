<template>
    <div>
        <div class="pos-btn px-4" v-show="!showList">
            <p class="text-md font-bold block text-black pt-6">
                開啟裝置定位功能，以便為您提供更好的服務。
            </p>
            <p class="text-sm text-primary-700 pb-2">
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
        <div class="near-list bg-light mt-8 py-4 px-4" v-show="showList">
            <p class="text-lg text-left font-bold text-gray-500">最近站牌</p>
            <ul>
                <li v-for="item in stopList" :key="item.StopUID">
                    <p class="font-bold text-black">
                        {{ item.StopName.Zh_tw }}
                    </p>
                    <p class="text-gray-600">{{ item.StopName.StopAddress }}</p>
                </li>
                <li
                    class="text-primary-500 text-md"
                    v-show="stopList.length === 0"
                >
                    附近無站牌
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getStopNear, getNearEstimated } from "../utils/api";
import { getDistance } from "../utils/common";
export default {
    data: function () {
        return {
            showList: false,
            stopList: [],
            nearStop: {},
            timeList: [],
        };
    },
    computed: {
        filterBusList() {
            const temp = this.stopList.filter((vo, i, arr) => {
                i ===
                    arr.findIndex((item) => {
                        return item.StopName.Zh_tw === vo.StopName.Zh_tw;
                    });
            });
            return temp;
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
                console.log("this.lineInfo", this.lineInfo);

                // result.length > 0 && this.calcDistance(latitude, longitude);
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
                    vo.StopPosition?.PositionLat,
                    vo.StopPosition?.PositionLon,
                ];
            });
            const compare = newArr.map((item) => {
                const [stopLat, stopLon] = item;
                return getDistance(latitude, longitude, stopLat, stopLon);
            });
            const minIndex = compare.indexOf(Math.min(...compare));
            this.nearStop = this.stopList[minIndex];
            const { PositionLat, PositionLon } = this.nearStop.StopPosition;
            this.getNearEstimated(PositionLat, PositionLon);
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
    },
};
</script>

<style lang="postcss">
.near-list {
    border-top-right-radius: 60px;
}
</style>
