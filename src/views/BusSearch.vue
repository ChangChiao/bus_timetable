<template>
    <div class="px-4 pt-10">
        <select v-model="city" @change="getRoute">
            <option
                v-for="item in CITY_LIST"
                :key="item.value"
                :value="item.value"
            >
                {{ item.label }}
            </option>
        </select>
        <p>
            <!-- <input type="checkbox" id="" value=""> -->
            <!-- 僅顯示提供無障礙的公車路線 -->
        </p>
        <div class="input-box">
            <input
                type="text"
                placeholder="請輸入公車路線/起訖站名"
                v-model="routeName"
            />
            <img class="" @click="reset" src="images/search.svg" alt="" />
        </div>
        <h2>{{ routeName }}</h2>
        <bus-search-list :pageData="pageData" />
        <!-- <search-history v-else /> -->
        <transition name="slide-fade">
            <key-board
                v-if="showKeyboard"
                @setRouteName="setRouteName"
                @reset="reset"
                @deleteRouteName="deleteRouteName"
            />
        </transition>
        <bus-search-btn @ctrlKeyboard="ctrlKeyboard" />
    </div>
</template>

<script>
import BusSearchList from "../components/BusSearchList.vue";
import KeyBoard from "../components/KeyBoard.vue";
import BusSearchBtn from "../components/BusSearchBtn.vue";
// import SearchHistory from "../components/SearchHistory.vue";
import { CITY_LIST } from "../global/constant";
import { getBusRoute } from "../utils/api";
export default {
    components: {
        KeyBoard,
        BusSearchList,
        BusSearchBtn,
    },
    data() {
        return {
            CITY_LIST,
            city: CITY_LIST[0].value,
            routeName: "",
            busList: [],
            showKeyboard: false,
            pageData: [],
            endFlag: false,
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
                $filter: this.routeName
                    ? `contains(RouteName/Zh_tw, '${this.routeName}')`
                    : "",
            };
            try {
                const result = await getBusRoute(sendData);
                this.busList = result;
                this.splitData();
                console.log("result", result);
            } catch (error) {
                console.log("error", error);
            }
        },
        splitData() {
            if (this.busList.length === 0) this.endFlag = true;
            const temp = this.busList.splice(0, 30);
            this.pageData = this.pageData.concat(temp);
        },
        setRouteName(word) {
            this.routeName += word;
            this.getRoute();
        },
        deleteRouteName() {
            this.routeName = this.routeName.substring(
                0,
                this.routeName.length - 1
            );
        },
        reset() {
            this.routeName = "";
        },
        ctrlKeyboard() {
            this.showKeyboard = !this.showKeyboard;
        },
        scrollEvent() {
            if (this.endFlag) return;
            if (
                window.innerHeight + window.pageYOffset >=
                document.body.offsetHeight
            ) {
                this.splitData();
            }
        },
    },
    mounted() {
        this.getRoute();
        window.addEventListener("scroll", this.scrollEvent);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.scrollEvent);
    },
};
</script>

<style lang="postcss">
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(50px);
    opacity: 0;
}
</style>
