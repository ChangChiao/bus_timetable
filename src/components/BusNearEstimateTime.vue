<template>
    <div class="">
        <ul v-for="item in liveBusList" :key="item.StopUID">
            <li class="w-full border p-2">
                <span>{{ item.StopName.Zh_tw }}</span>
                <span :class="{ red: item.EstimateTime <= 1 }">
                    {{ transStatus(item.EstimateTime) }}
                </span>
                <!-- <span>{{ item.StopUID }}</span> -->
                <span
                    :class="{ 'bg-primary-500': item.EstimateTime === 0 }"
                    class="border border-gray-400 w-4 h-4 rounded-full"
                ></span>
                <span>{{ item.PlateNumb }}</span>
            </li>
        </ul>
        <div class="line"></div>
    </div>
</template>

<script>
import transStatus from "../utils/common";
import { getStationEstimated } from "../utils/api";
export default {
    props: {
        routeName: {
            type: String,
            default: "",
        },
        city: {
            type: String,
            default: "",
        },
        destination: {
            type: Object,
            default: () => {},
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
        liveBus() {
            return this.busData.filter((item) => item.StopStatus === 0);
            // return this.busData.filter((item) => item.PlateNumb);
        },
    },
    data() {
        return {
            timer: null,
            listType: 0,
            second: 60,
            busData: [],
            busPos: [],
        };
    },
    methods: {
        transStatus(sec) {
            return transStatus(sec);
        },
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
                const result = await getStationEstimated(sendData);
                this.$bus.$emit("setLoading", false);

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
