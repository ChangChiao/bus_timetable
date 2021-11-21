<template>
    <ul class="flex flex-wrap">
        <li
            class="keyboard-item"
            v-for="item in keyList"
            :key="item.value"
            :style="{
                color: item.style ? item.style : '#37206D',
            }"
            @click="item.fn ? item.fn : setRouteName(item)"
        >
            {{ item.value }}
        </li>
        <li @click="deleteKeyword">
            <i>delete</i>
        </li>
    </ul>
</template>

<script>
// @ is an alias to /src

export default {
    name: "Home",
    components: {},
    props: {
        keyword: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            keyList: [
                { value: "紅", style: "#FB5B44", fn: "" },
                { value: "藍", style: "#448DFB", fn: "" },
                { value: "1", style: "", fn: "" },
                { value: "2", style: "", fn: "" },
                { value: "3", style: "", fn: "" },
                { value: "綠", style: "#59DD86", fn: "" },
                { value: "棕", style: "#D4A274", fn: "" },
                { value: "4", style: "", fn: "" },
                { value: "5", style: "", fn: "" },
                { value: "6", style: "", fn: "" },
                { value: "橘", style: "#FB9232", fn: "" },
                { value: "黃", style: "#ECC94C", fn: "" },
                { value: "7", style: "", fn: "" },
                { value: "8", style: "", fn: "" },
                { value: "9", style: "", fn: "" },
                { value: "更多", style: "#6F7585", fn: "ctrlKeyboard" },
                { value: "幹線", style: "", fn: "" },
                { value: "0", style: "", fn: "" },
                { value: "重設", style: "#6F7585", fn: "reset" },
            ],
            keyList2: [
                { value: "市民", style: "", fn: "" },
                { value: "捷運", style: "", fn: "" },
                { value: "貓空", style: "", fn: "" },
                { value: "A", style: "", fn: "" },
                { value: "F", style: "", fn: "" },
                { value: "內科", style: "", fn: "" },
                { value: "高鐵", style: "", fn: "" },
                { value: "跳蛙", style: "", fn: "" },
                { value: "L", style: "", fn: "" },
                { value: "R", style: "", fn: "" },
                { value: "南軟", style: "", fn: "" },
                { value: "快線", style: "", fn: "" },
                { value: "JOY", style: "", fn: "" },
                { value: "E", style: "", fn: "" },
                { value: "T", style: "", fn: "" },
                { value: "返回", style: "gray", fn: "ctrlKeyboard" },
                { value: "", style: "", fn: "" },
                { value: "", style: "", fn: "" },
                { value: "", style: "", fn: "" },
            ],
        };
    },
    methods: {
        setRouteName(word) {
            this.$emit("setRouteName", word);
        },
        deleteKeyword() {
            this.$emit("deleteKeyword");
        },
        reset() {
            this.$emit("reset");
        },
    },
};
</script>

<style lang="postcss" scoped>
.keyboard-item {
    @apply w-1/5 border flex justify-center items-center rounded-md h-10 cursor-pointer border-line;
}
</style>
