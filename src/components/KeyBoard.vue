<template>
    <ul>
        <li v-for="item in keyList" :key="item" @click="setKeyword">
            {{ item }}
        </li>
        <li @click="deleteKeyword">
            <i></i>
        </li>
    </ul>
</template>

<script>
// @ is an alias to /src

export default {
    name: "Home",
    components: {},
    data() {
        return {
            keyword: "",
            keyList: [
                "紅",
                "藍",
                "1",
                "2",
                "3",
                "綠",
                "棕",
                "4",
                "5",
                "6",
                "橘",
                "小",
                "7",
                "8",
                "9",
            ],
        };
    },
    setKeyword(word) {
        this.keyword += word;
    },
    deleteKeyword() {
        this.keyword = this.keyword.substring(0, this.keyword - 1);
    },
};
</script>
