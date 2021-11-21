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
        <h2>{{ routeName }}</h2>
        <KeyBoard
            @setRouteName="setRouteName"
            @reset="reset"
            @deleterouteName="deleterouteName"
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
            routeName: "",
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
                // routeName: this.routeName,
                $filter: this.routeName
                    ? `contains(RouteName/Zh_tw, '${this.routeName}')`
                    : "",
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
        deleterouteName() {
            this.routeName = this.routeName.substring(0, this.routeName - 1);
        },
        reset() {
            this.routeName = "";
        },
    },
    mounted() {
        this.getRoute();
    },
};
</script>
