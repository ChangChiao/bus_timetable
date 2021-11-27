<template>
    <div>
        <!-- <table>
            <tbody>
                <tr>

                </tr>
            </tbody>
        </table> -->
        <!-- {{ stopList }} -->
        <ul>
            <li v-for="item in stopList" :key="item.TripID">
                <span>{{ item.StopTimes[0].ArrivalTime }}</span>
                <span>{{ item.StopTimes[0].DepartureTime }}</span>

                <span>{{ item.StopTimes[0].StopName.Zh_tw }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { getBusSchedule } from "../utils/api";
export default {
    data() {
        return {
            city: "Taipei",
            routeName: "225",
            stopList: [],
        };
    },
    methods: {
        async getStopInfomation() {
            const sendData = {
                city: this.city,
                routeName: this.routeName,
            };
            try {
                const result = await getBusSchedule(sendData);
                this.stopList = result[0]?.Timetables;
            } catch (error) {
                console.log("error", error);
            }
        },
    },
    mounted() {
        this.getStopInfomation();
    },
};
</script>

<style lang="postcss" scoped></style>
