<template>
    <div>
        <h3>歷史搜尋</h3>
        <ul>
            <li
                v-for="item in historyList"
                :key="item.bus"
                class="border-gray-400 border-b"
            >
                <img src="images/time.svg" alt="" />
                {{ item.bus }}
                <img src="images/arrow.svg" />
            </li>
            <li v-if="historyList.length === 0">無</li>
        </ul>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["historyList"]),
    },
};
</script>

<style lang="postcss" scoped></style>
