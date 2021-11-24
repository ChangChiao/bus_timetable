<template>
    <div
        class="
            pt-2
            rounded-tl-3xl
            px-4
            h-72
            w-screen
            rounded-rl-3xl
            bg-light
            fixed
            z-20
            bottom-0
            overflow-y-scroll
        "
    >
        <ul>
            <template v-for="item in busData">
                <bus-near-estimate-item :key="item.StopUID" :itemData="item" />
            </template>
        </ul>
        <div class="line"></div>
    </div>
</template>

<script>
import { getStationEstimated } from "../utils/api";
import BusNearEstimateItem from "./BusNearEstimateItem.vue";
export default {
    components: { BusNearEstimateItem },
    props: {
        stationId: {
            type: String,
            default: "",
        },
        city: {
            type: String,
            default: "",
        },
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
    },
    data() {
        return {
            timer: null,
            listType: 0,
            second: 60,
            busData: [],
        };
    },
    methods: {
        getDataByTimer() {
            this.timer = setInterval(() => {
                this.second -= 1;
                if (this.second <= 0) {
                    this.second = 60;
                    // this.getBusArrive();
                }
            }, 1000);
        },
        async getBusArrive() {
            try {
                const sendData = {
                    city: this.city,
                    stationId: this.stationId,
                };
                const result = await getStationEstimated(sendData);
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
