<template>
    <div class="near-list bg-light mt-8 pt-4">
        <p class="text-lg text-gray-500">最近站牌</p>
        <ul>
            <li v-for="item in stopList" :key="item.StopUID">
                <p>{{ item.StopName.Zh_tw }}</p>
                <p>{{ item.StopName.StopAddress }}</p>
            </li>
            <li v-show="stopList.length === 0">暫無資料</li>
        </ul>
    </div>
</template>

<script>
import { getStopNear, getNearEstimated } from "../utils/api";
import { getDistance } from "../utils/common";
export default {
    data: function () {
        return {
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
        async getNearStop(latitude, longitude) {
            const sendData = {
                $spatialFilter: `nearby(${latitude},${longitude},170)`,
            };
            try {
                const result = await getStopNear(sendData);
                this.stopList = result;
                console.log("this.lineInfo", this.lineInfo);

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
                    vo.StopPosition?.PositionLat,
                    vo.StopPosition?.PositionLon,
                ];
            });
            console.log("newArr", newArr);
            const compare = newArr.map((item) => {
                const [stopLat, stopLon] = item;
                return getDistance(latitude, longitude, stopLat, stopLon);
            });
            console.log("compare", compare);

            const minIndex = compare.indexOf(Math.min(...compare));
            console.log("minIndex", minIndex);
            this.nearStop = this.stopList[minIndex];
            const { PositionLat, PositionLon } = this.nearStop.StopPosition;
            console.log("98098890", PositionLat, PositionLon);
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
    border-top-right-radius: 30px;
}
</style>
