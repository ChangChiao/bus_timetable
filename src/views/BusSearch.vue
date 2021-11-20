<template>
    <div>
        <ul>
            <template v-for="item in searchList">
                <BusListItem :key="item" />
            </template>
        </ul>
        <KeyBoard />
    </div>
</template>

<script>
import BusListItem from "../components/BusListItem.vue";
import KeyBoard from "../components/KeyBoard.vue";
export default {
    components: {
        KeyBoard,
        BusListItem,
    },
    data() {
        return {
            searchList: [],
        };
    },
};
</script>
