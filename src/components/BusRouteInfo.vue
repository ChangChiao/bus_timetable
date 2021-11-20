<template>
    <div class="flex">
        <ul>
            <li>
                <span>{{}}</span>
                <span>{{}}</span>
            </li>
        </ul>
        <ul>
            <li>
                <span>{{}}</span>
                <span></span>
            </li>
        </ul>
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
        goBus() {
            return [].filter((item) => item.Direction === 0);
        },
        backBus() {
            return [].filter((item) => item.Direction === 1);
        },
    },
    data() {
        return {};
    },
    methods: {
        transStatus(time) {
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
    },
};
</script>
