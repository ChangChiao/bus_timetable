<template>
    <div>
        <select v-model="city" @change="getRoute">
            <option
                v-for="item in CITY_LIST"
                :key="item.value"
                :value="item.value"
            >
                {{ item.label }}
            </option>
        </select>
        <h2>{{ keyword }}</h2>
        <KeyBoard
            @setKeyword="setKeyword"
            @reset="reset"
            @deleteKeyword="deleteKeyword"
        />
        <ul>
            <template v-for="item in busList">
                <BusListItem :itemData="item" :key="item.RouteUID" />
            </template>
        </ul>
    </div>
</template>

<script>
import BusListItem from "../components/BusListItem.vue";
import KeyBoard from "../components/KeyBoard.vue";
import { CITY_LIST } from "../global/constant";
import { getBusRoute } from "../utils/api";
export default {
    components: {
        KeyBoard,
        BusListItem,
    },
    data() {
        return {
            CITY_LIST,
            keyword: "",
            city: CITY_LIST[0].value,
            busList: [],
        };
    },
    computed: {
        liveBus() {
            return this.busList.filter((item) => item.PlateNumb);
        },
    },
    methods: {
        async getRoute() {
            const sendData = {
                city: this.city,
                routeName: this.keyword,
            };
            try {
                const result = await getBusRoute(sendData);
                this.busList = result;
                console.log("result", result);
            } catch (error) {
                console.log("error", error);
            }
        },
        setKeyword(word) {
            this.keyword += word;
            this.getRoute();
        },
        deleteKeyword() {
            this.keyword = this.keyword.substring(0, this.keyword - 1);
        },
        reset() {
            this.keyword = "";
        },
    },
    mounted() {
        this.getRoute();
    },
};
</script>
