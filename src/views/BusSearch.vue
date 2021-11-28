<template>
    <div>
        <Header />
        <map-searchs ref="mapSearch" :setClass="'for-web'" />
        <div class="px-4 pt-10 side-block">
            <select class="mb-2" v-model="city" @change="getRoute">
                <option
                    v-for="item in CITY_LIST"
                    :key="item.value"
                    :value="item.value"
                >
                    {{ item.label }}
                </option>
            </select>
            <div class="input-box">
                <input
                    type="text"
                    ref="inputRouteName"
                    @input="keyIn"
                    placeholder="請輸入公車路線"
                    v-model="routeName"
                />
                <img
                    v-if="routeName"
                    class="w-6 cursor-pointer"
                    @click="reset"
                    src="images/close-style2.svg"
                    alt=""
                />
            </div>
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
                this.pageData = [];
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
            if (!this.routeName) {
                this.getRoute();
            }
        },
        keyIn(event) {
            this.routeName = event.target.value;
            this.getRoute();
        },
        reset() {
            this.routeName = "";
            this.getRoute();
        },
        ctrlKeyboard() {
            this.showKeyboard = !this.showKeyboard;
            if (!this.showKeyboard) {
                this.$refs.inputRouteName.focus();
            }
        },
        scrollEvent() {
            if (this.endFlag) return;
            const target = document.querySelector(".scroll-list");
            if (
                target.scrollTop ===
                target.scrollHeight - target.offsetHeight
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
        const target = document.querySelector(".scroll-list");
        target.addEventListener("scroll", this.scrollEvent);
    },
    beforeDestroy() {
        const target = document.querySelector(".scroll-list");
        target.removeEventListener("scroll", this.scrollEvent);
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
