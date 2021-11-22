<template>
    <div>
        <ul>
            <li @click="setTab(0)">往{{}}</li>
            <li @click="setTab(1)">往{{}}</li>
        </ul>
        <p>於{{ second }}秒前更新</p>
        <BusRouteInfo :busPos="busPos" :busInfo="listType === 0 ? goBus : backBus" />
    </div>
</template>

<script>
import BusRouteInfo from "../components/BusRouteInfo.vue";
import { getEstimatedTime, getBusPosition } from "../utils/api";
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
            second: 60,
            busPos: [],
        };
    },
    computed: {
        goBus() {
            return this.sortedBusData.filter((item) => item.Direction === 0);
        },
        backBus() {
            return this.sortedBusData.filter((item) => item.Direction === 1);
        },
        sortedBusData() {
            const copy = [...this.liveBus];
            return copy.sort((a, b) => a.StopUID.localeCompare(b.StopUID));
        },
        liveBus() {
            return this.busData.filter((item) => item.StopStatus === 0);
            // return this.busData.filter((item) => item.PlateNumb);
        },
    },
    watch: {
        goBus(val) {
            console.warn("gobus", val);
        },
        busData(val) {
            console.error("busData", val);
        },
    },
    methods: {
        getDataByTimer() {
            this.timer = setInterval(() => {
                this.second -= 1;
                if (this.second <= 0) {
                    this.second = 60;
                    this.getBusArrive();
                    // this.getBusPos();
                }
            }, 1000);
        },
        async getBusArrive() {
            try {
                const sendData = {
                    city: this.city,
                    routeName: this.routeName,
                };
                this.$bus.$emit("setLoading", true);
                const result = await getEstimatedTime(sendData);
                this.$bus.$emit("setLoading", false);

                this.busData = result;
                console.log("result");
            } catch (error) {
                console.log("error", error);
            }
        },
        async getBusPos() {
            const sendData = { city: this.city, routeName: this.routeName };
            try {
                const result = await getBusPosition(sendData);
                this.busPos = result;
                console.log("this.busPos", this.busPos);
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
        // this.getBusPos();
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
};
</script>
