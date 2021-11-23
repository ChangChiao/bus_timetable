<template>
    <div
        class="
            fixed
            bg-light
            overflow-y-scroll
            bottom-0
            left-0
            h-3/4
            w-screen
            z-20
            p-4
        "
    >
        <p class="text-gray-500 text-sm">於{{ second }}秒前更新</p>
        <h1 class="text-3xl pb-4">{{ routeName }}</h1>
        <ul class="flex justify-between items-center border-b border-gray-300">
            <li
                :class="['tab-item', { active: listType === 0 }]"
                @click="setTab(0)"
            >
                往{{ destination.to }}
            </li>
            <li
                :class="['tab-item', { active: listType === 1 }]"
                @click="setTab(1)"
            >
                往{{ destination.back }}
            </li>
        </ul>
        <ul v-for="item in typeBusList" :key="item.StopUID">
            <li class="w-full border-b p-4 border-line">
                <span :class="{ red: item.EstimateTime <= 90 }">
                    {{ transStatus(item.EstimateTime) }}
                </span>
                <span>{{ item.StopName.Zh_tw }}</span>
                <!-- <span>{{ item.StopUID }}</span> -->
                <!-- <span
                    :class="{ 'bg-primary-500': item.EstimateTime === 0 }"
                    class="border border-gray-400 w-4 h-4 rounded-full"
                ></span>
                <span>{{ item.PlateNumb }}</span> -->
            </li>
        </ul>
        <div class="line"></div>
    </div>
</template>

<script>
import { transBusStatus } from "../utils/common";
import { getEstimatedTime, getBusPosition } from "../utils/api";
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
    watch: {
        routeName: {
            immediate: true,
            handler() {
                if (!this.routeName) return;
                this.getBusArrive();
                this.getDataByTimer();
            },
        },
    },

    computed: {
        filterRepeat() {
            // const record = [];
            // return this.routeList.filter((item) => {
            //     if (!record.includes(item.StationID)) {
            //         record.push(item.StationID);
            //         return item;
            //     }
            // });
            return [];
        },
        liveBus() {
            return this.busData;
            // return this.busData.filter((item) => item.StopStatus === 0);
        },
        sortedBusData() {
            const copy = [...this.liveBus];
            return copy.sort((a, b) => Number(a.StopID) - Number(b.StopID));
        },
        goBus() {
            return this.sortedBusData.filter((item) => item.Direction === 0);
        },
        backBus() {
            return this.sortedBusData.filter((item) => item.Direction === 1);
        },
        typeBusList() {
            return this.listType === 0 ? this.goBus : this.backBus;
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
            console.warn("sec", sec);
            return transBusStatus(sec);
        },
        getDataByTimer() {
            clearInterval(this.timer);
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
    mounted() {},
    beforeDestroy() {
        clearInterval(this.timer);
    },
};
</script>

<style lang="postcss" scoped>
.tab-item {
    @apply text-center w-1/2 pb-2  border-primary-500;
}

.tab-item.active {
    border-bottom: 4px solid #7550cc;
}
</style>
