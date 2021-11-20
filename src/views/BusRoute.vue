<template>
    <div>
        <ul>
            <li @click="setTab(0)">往{{}}</li>
            <li @click="setTab(1)">往{{}}</li>
        </ul>
        <p>於{{}}前更新</p>
        <BusRouteInfo :busInfo="listType === 0 ? goBus : backBus" />
        <!-- <Map /> -->
    </div>
</template>

<script>
// import Map from "../components/Map.vue";
import BusRouteInfo from "../components/BusRouteInfo.vue";
import { getEstimatedTime } from "../utils/api";
import { CITY_LIST } from "../global/constant";

export default {
    components: {
        BusRouteInfo,
        // Map,
    },
    data() {
        return {
            CITY_LIST,
            timer: null,
            routeName: "225",
            city: CITY_LIST[0].value,
            busData: [],
            listType: 0,
            second:60,
        };
    },
    computed: {
        goBus() {
            return this.busData.filter((item) => item.Direction === 0);
        },
        backBus() {
            return this.busData.filter((item) => item.Direction === 1);
        },
    },
    methods: {
        getDataByTimer() {
            this.timer =
                (() => {
                    this.getBusArrive();
                },
                60000);
        },
        async getBusArrive() {
            try {
                const sendData = {
                    city: this.city,
                    routeName: this.routeName,
                };
                const result = await getEstimatedTime(sendData);
                this.busData = result;
                console.log("result");
            } catch (error) {
                console.log("error", error);
            }
        },
        setTab(type) {
            this.listType = type;
        },
    },
    mounted() {
        this.getBusArrive();
        this.getDataByTimer();
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
};
</script>
