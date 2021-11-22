<template>
    <div>
        <bus-near-list />
        <div
            class="
                rounded-full
                touch-ball
                fixed
                bg-light
                w-16
                h-16
                flex
                justify-center
                items-center
                shadow-lg
            "
        >
            <img src="images/cursor.svg" alt="" />
        </div>
    </div>
</template>

<script>
import BusNearList from "../components/BusNearList.vue";
export default {
    components: { BusNearList },
};
</script>
