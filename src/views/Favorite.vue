<template>
    <ul>
        <template v-for="item in searchList">
            <BusListItem :key="item" />
        </template>
    </ul>
</template>

<script>
import BusListItem from "../components/BusListItem.vue";
export default {
    components: {
        BusListItem,
    },
};
</script>
