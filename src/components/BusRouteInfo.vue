<template>
    <div class="">
        <ul v-for="item in liveBusList" :key="item.StopUID">
            <li class="w-full border p-2">
                <span>{{ item.StopName.Zh_tw }}</span>
                <span>{{ transStatus(item.EstimateTime) }}</span>
                <span>{{}}</span>
            </li>
        </ul>
        <!-- <ul>
            <li>
                <span>{{}}</span>
                <span></span>
            </li>
        </ul> -->
        <div class="line"></div>
    </div>
</template>

<script>
export default {
    props: {
        busInfo: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        liveBusList() {
            return this.busInfo.filter((item) => item.EstimateTime);
        },
    },
    data() {
        return {};
    },
    methods: {
        transStatus(sec) {
            const time = this.transMinute(sec);
            let text = "";
            switch (true) {
                case time === 0:
                    text = "進站中";
                    break;
                case time <= 1 && 0 < time:
                    text = "即將到站";
                    break;
                case !time:
                    text = "--";
                    break;
                default:
                    text = time + "分鐘";
                    break;
            }
            return text;
        },
        transMinute(sec) {
            return Math.floor(sec / 60);
        },
    },
};
</script>
