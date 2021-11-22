<template>
    <div>
        <select v-model="city" @change="getRoute">
            <option v-for="item in CITY_LIST" :key="item.value" :value="item.value">
                {{ item.label }}
            </option>
        </select>
        <p>
            <!-- <input type="checkbox" id="" value=""> -->
            僅顯示提供無障礙的公車路線
        </p>
        <div class="input-box">
            <input type="text" placeholder="請輸入公車路線/起訖站名" v-model="routeName" />
            <img src="images/search.svg" alt="" />
        </div>
        <h2>{{ routeName }}</h2>
        <div v-if="showSearch">
            <h3>搜尋結果</h3>
            <ul>
                <template v-for="item in busList">
                    <BusListItem :itemData="item" :key="item.RouteUID" />
                </template>
                <li v-if="busList.length === 0">
                    <p>哎呀!查無結果</p>
                    <p>請重新搜尋關鍵字或切換縣市</p>
                </li>
            </ul>
        </div>
        <search-history v-else />
        <key-board v-if="showKeyboard" @setRouteName="setRouteName" @reset="reset" @deleteRouteName="deleteRouteName" />
        <keyboard-btn @ctrlKeyboard="ctrlKeyboard" />
    </div>
</template>

<script>
import BusListItem from "../components/BusListItem.vue";
import KeyBoard from "../components/KeyBoard.vue";
import KeyboardBtn from "../components/keyboardBtn.vue";
import SearchHistory from "../components/SearchHistory.vue";
import { CITY_LIST } from "../global/constant";
import { getBusRoute } from "../utils/api";
export default {
    components: {
        KeyBoard,
        BusListItem,
        SearchHistory,
        KeyboardBtn,
    },
    data() {
        return {
            CITY_LIST,
            routeName: "",
            city: CITY_LIST[0].value,
            busList: [],
            showKeyboard: false,
        };
    },
    computed: {
        liveBus() {
            return this.busList.filter((item) => item.PlateNumb);
        },
        showSearch() {
            return this.routeName.length > 0;
        },
    },
    methods: {
        async getRoute() {
            const sendData = {
                city: this.city,
                // routeName: this.routeName,
                $filter: this.routeName ? `contains(RouteName/Zh_tw, '${this.routeName}')` : "",
            };
            try {
                const result = await getBusRoute(sendData);
                this.busList = result;
                console.log("result", result);
            } catch (error) {
                console.log("error", error);
            }
        },
        setRouteName(word) {
            this.routeName += word;
            this.getRoute();
        },
        deleteRouteName() {
            this.routeName = this.routeName.substring(0, this.routeName.length - 1);
        },
        reset() {
            this.routeName = "";
        },
        ctrlKeyboard() {
            this.showKeyboard = !this.showKeyboard;
        },
    },
    mounted() {
        this.getRoute();
    },
};
</script>
