<template>
    <ul>
        <template v-for="item in favoriteList">
            <BusListItem :key="item" />
        </template>
    </ul>
</template>

<script>
import { mapState } from "vuex";
import BusListItem from "../components/BusListItem.vue";
export default {
    components: {
        BusListItem,
    },
    computed: {
        ...mapState(["favoriteList"]),
    },
};
</script>
