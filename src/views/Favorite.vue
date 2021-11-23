<template>
    <ul>
        <li v-for="item in favoriteList" :key="item"></li>
    </ul>
</template>

<script>
import { mapState } from "vuex";
export default {
    components: {},
    computed: {
        ...mapState(["favoriteList"]),
    },
};
</script>
