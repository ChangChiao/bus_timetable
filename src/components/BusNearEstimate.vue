<template>
    <div>
        <ul>
            <template v-for="(item, i) in timeList">
                <bus-near-estimate-item
                    :key="item.RouteUID"
                    :order="i + 1"
                    :itemData="item"
                />
            </template>
        </ul>
        <div class="line"></div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { CITY_LIST } from "../global/constant";
import { getNearEstimated, getBusRoute } from "../utils/api";
import BusNearEstimateItem from "./BusNearEstimateItem.vue";
export default {
    components: { BusNearEstimateItem },
    props: {
        stopInfo: {
            type: Object,
            default: () => {},
        },
    },
    computed: { ...mapState(["terminalList"]) },

    data() {
        return {
            timer: null,
            listType: 0,
            second: 60,
            timeList: [],
            initFlag: false,
        };
    },
    methods: {
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
        async getNearEstimated() {
            console.warn("this.stopInfo", this.stopInfo);
            const { PositionLat, PositionLon } = this.stopInfo.StationPosition;
            const sendData = {
                $spatialFilter: `nearby(${PositionLat},${PositionLon}, 30)`,
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
                    $filter: `contains(RouteUID,
                            '${RouteUID}')`,
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
    mounted() {
        this.getNearEstimated();
        this.getDataByTimer();
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
};
</script>
