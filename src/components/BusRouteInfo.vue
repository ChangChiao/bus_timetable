<template>
    <div class="">
        <p class="text-gray-500 text-sm">
            將於{{ second }}秒後更新
            <img
                @click="refresh"
                class="inline"
                src="images/Refresh.svg"
                alt=""
            />
        </p>
        <h1 class="text-3xl font-bold pb-4">{{ routeName }}</h1>
        <ul
            class="
                flex
                justify-between
                items-center
                border-b border-gray-300
                relative
                z-30
            "
        >
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
        <ul>
            <li
                class="w-full border-b p-4 border-line relative"
                v-for="item in typeBusList"
                :key="item.StopUID"
            >
                <span :class="{ red: item.EstimateTime <= 90 }">
                    {{ transStatus(item.EstimateTime) }}
                </span>
                <span>{{ item.StopName.Zh_tw }}</span>
                <span
                    :class="{ 'bg-primary-500': item.EstimateTime <= 30 }"
                    class="
                        border
                        absolute
                        right-2
                        top-6
                        border-gray-400
                        w-3
                        h-3
                        rounded-full
                    "
                ></span>
                <!-- <span>{{ item.PlateNumb }}</span> -->
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
        sortedBusData() {
            const copy = [...this.busData];
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
            return transBusStatus(sec);
        },
        refresh() {
            this.second = 60;
            this.getBusArrive();
            this.getDataByTimer();
        },
        getDataByTimer() {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.second -= 1;
                if (this.second <= 0) {
                    this.second = 60;
                    this.getBusArrive();
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
            } catch (error) {
                console.log("error", error);
            }
        },
        async getBusPos() {
            const sendData = { city: this.city, routeName: this.routeName };
            try {
                const result = await getBusPosition(sendData);
                this.busPos = result;
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
