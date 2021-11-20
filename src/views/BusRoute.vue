<template>
    <div>
        <ul>
            <li>往{{}}</li>
            <li>往{{}}</li>
        </ul>
        <p>於{{}}前更新</p>
        <BusRouteInfo />
        <Map />
    </div>
</template>

<script>
import Map from "../components/Map.vue";
import BusRouteInfo from "../components/BusRouteInfo.vue";
export default {
    components: {
        BusRouteInfo,
        Map,
    },
    data() {
        return {
            timer: null,
        };
    },
    methods: {
        getDataByTimer() {
            this.timer = setInterval(() => {}, 30000);
        },
    },
    mounted() {
        this.getDataByTimer();
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
};
</script>
