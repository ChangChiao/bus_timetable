<template>
    <div id="map" :class="setClass"></div>
</template>

<script>
import L from "leaflet";
import * as Wkt from "wicket";
import { createMarkerCluster } from "../utils/common";
let map = null;
let markLayer = null;
let routeLayer = null;
let busLayer = null;
let stationMark = null;
let busMark = null;
let startMark = null;
let endMark = null;
export default {
    props: {
        mapInfo: {
            type: Array,
            default: () => [],
        },
        setClass: {
            type: String,
            default: "",
        },
    },
    data() {
        return {};
    },
    methods: {
        createMap() {
            let mapToken = process.env.VUE_APP_MAP_TOKEN;
            map = L.map("map");

            L.tileLayer(
                "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
                {
                    attribution:
                        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: "mapbox/streets-v11",
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: mapToken,
                }
            ).addTo(map);
            console.log("init!!!!");
            markLayer = createMarkerCluster().addTo(map);
            busLayer = new L.MarkerClusterGroup().addTo(map);
            this.$emit("initData");
        },
        cleanMarker() {
            markLayer.clearLayers();
            map.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });
        },
        cleanBus() {
            busLayer.clearLayers();
        },
        setView(latitude, longitude) {
            console.log("latitude, longitude", latitude, longitude);
            map.setView([latitude, longitude], 14);
        },
        createMark() {
            stationMark = new L.Icon({
                iconUrl: "images/mark/BusStop.svg",
                shadowUrl: "",
                iconSize: [40, 40],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                // shadowSize: [41, 41]
            });
            console.log("stationMark", stationMark);
            busMark = new L.Icon({
                iconUrl: "images/mark/bus.svg",
                shadowUrl: "",
                iconSize: [40, 40],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                // shadowSize: [41, 41]
            });
            startMark = new L.Icon({
                iconUrl: "images/mark/BusStop-start.svg",
                shadowUrl: "",
                iconSize: [40, 40],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                // shadowSize: [41, 41]
            });
            endMark = new L.Icon({
                iconUrl: "images/mark/BusStop-end.svg",
                shadowUrl: "",
                iconSize: [40, 40],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                // shadowSize: [41, 41]
            });
        },
        drawMark(mapInfo) {
            const temp = [...mapInfo];
            let start = temp.shift();
            let end = temp.pop();
            console.log("drawMark");

            markLayer.addLayer(
                L.marker(
                    [
                        start?.StopPosition?.PositionLat,
                        start?.StopPosition?.PositionLon,
                    ],
                    {
                        icon: startMark,
                    }
                ).bindPopup(` <h2 class="title">${start.StopName.Zh_tw}</h2>`)
            );

            markLayer.addLayer(
                L.marker(
                    [
                        end?.StopPosition?.PositionLat,
                        end?.StopPosition?.PositionLon,
                    ],
                    {
                        icon: endMark,
                    }
                ).bindPopup(` <h2 class="title">${end.StopName.Zh_tw}</h2>`)
            );

            temp.forEach((item, i) => {
                let { PositionLat, PositionLon } = item.StopPosition;
                markLayer.addLayer(
                    L.marker([PositionLat, PositionLon], {
                        icon: new L.DivIcon({
                            className: "bus-icon",
                            html: `
                            <div class="w-16 h-14 relative flex justify-center items-center">
                                <img class="absolute w-full block" src="images/mark/BusStop_blank.svg"/>
                                <span class="text-light font-bold text-base text-center relative z-10 pb-2">${
                                    i + 1
                                }</span>
                            </div>`,
                        }),
                    })
                );
            });
            map.addLayer(markLayer);
        },
        drawBus(busInfo) {
            this.cleanBus();
            busInfo.forEach((item) => {
                let { PositionLat, PositionLon } = item.BusPosition;
                let { PlateNumb } = item;
                busLayer.addLayer(
                    L.marker([PositionLat, PositionLon], { icon: busMark })
                        .bindPopup(`
                            <h2 class="title">${PlateNumb}</h2>
                        `)
                );
            });
            map.addLayer(busLayer);
        },
        drawLine(Geometry) {
            console.log("Geometry", Geometry);
            // Create a new Wicket instance
            const wicket = new Wkt.Wkt();
            //Read in any kind of WKT string
            wicket.read(Geometry);
            const geojsonFeature = wicket.toJson();
            const lineStyle = { color: "#7550cc", weight: 3 };
            routeLayer = L.geoJSON(geojsonFeature, { style: lineStyle }).addTo(
                map
            );
            routeLayer.addData(geojsonFeature);
            map.fitBounds(routeLayer.getBounds());
            map.addLayer(routeLayer);
            // this.drawMark(Geometry);
        },
        initMap() {
            this.createMark();
            this.createMap();
        },
    },
    mounted() {},
    beforeDestroy() {
        map = null;
        markLayer = null;
        routeLayer = null;
        busLayer = null;
    },
};
</script>

<style lang="postcss" scoped></style>
