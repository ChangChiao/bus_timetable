<template>
    <div>
        <map-route />
        <bus-route-info
            :destination="destination"
            :city="city"
            :routeName="routeName"
        />
    </div>
</template>

<script>
import BusRouteInfo from "../components/BusRouteInfo.vue";
import MapRoute from "../components/MapRoute.vue";

export default {
    components: {
        BusRouteInfo,
        MapRoute,
        // Map,
    },
    data() {
        return {
            routeName: "",
            city: "",
            destination: {
                to: "",
                back: "",
            },
        };
    },
    mounted() {
        this.routeName = this.$route.query.routeName;
        this.city = this.$route.query.city;
        let to = this.$route.query.to;
        let back = this.$route.query.back;
        this.destination = { to: to, back: back };
    },
};
</script>
