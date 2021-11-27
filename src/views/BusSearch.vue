<template>
    <div>
        <Header />
        <map-searchs ref="mapSearch" :setClass="'for-web'" />
        <!-- <map-searchs :setClass="'for-web'" /> -->
        <div class="px-4 pt-10 side-block">
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
                    @input="test"
                    placeholder="請輸入公車路線"
                    v-model="routeName"
                />
                <img
                    class="w-6"
                    @click="reset"
                    src="images/search.svg"
                    alt=""
                />
            </div>
            <h2>{{ routeName }}</h2>
            <bus-search-list :pageData="pageData" />
            <transition name="slide-fade">
                <key-board
                    v-if="showKeyboard"
                    @setRouteName="setRouteName"
                    @reset="reset"
                    @deleteRouteName="deleteRouteName"
                />
            </transition>
            <bus-search-btn
                :showKeyboard="showKeyboard"
                @ctrlKeyboard="ctrlKeyboard"
            />
        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import BusSearchList from "../components/BusSearchList.vue";
import KeyBoard from "../components/KeyBoard.vue";
import BusSearchBtn from "../components/BusSearchBtn.vue";
import { CITY_LIST } from "../global/constant";
import { getBusRoute } from "../utils/api";
import MapSearchs from "../components/MapSearchs.vue";
export default {
    components: {
        KeyBoard,
        BusSearchList,
        BusSearchBtn,
        MapSearchs,
        Footer,
        Header,
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
            } catch (error) {
                console.log("error", error);
            }
            this.setView();
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
        test(event) {
            console.log("fefefe", event.target.value);
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
        setView() {
            const { pos } = CITY_LIST.find((vo) => vo.value === this.city);
            const { lat, lon } = pos;
            this.$refs.mapSearch.setView(lat, lon);
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
