<template>
    <ul>
        <li v-for="item in favoriteList" :key="item"></li>
        <bus-route-schedule />
    </ul>
</template>

<script>
import { mapState } from "vuex";
import BusRouteSchedule from "../components/BusRouteSchedule.vue";
export default {
    components: { BusRouteSchedule },
    computed: {
        ...mapState(["favoriteList"]),
    },
};
</script>
