<template>
    <ul class="flex flex-wrap">
        <li
            class="
                w-1/5
                border
                flex
                justify-center
                items-center
                rounded-md
                h-10
                cursor-pointer
            "
            v-for="item in keyList"
            :key="item"
            @click="setRouteName(item)"
        >
            {{ item }}
        </li>
        <li @click="deleteKeyword">
            <i>delete</i>
        </li>
        <li @click="reset">
            <i>reset</i>
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
