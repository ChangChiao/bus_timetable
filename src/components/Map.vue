<template>
    <div id="map" class="w-screen h-screen"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
let map = null;
let markLayer = null;
let markSelf = null;
let markNoAvailable = null;
let markAvailable = null;
export default {
    props: {
        singlePageList: {
            type: Array,
            default: () => [],
        },
        isSearchExist: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {};
    },
    methods: {
        createMap() {
            let mapToken = process.env.VUE_MAP_TOKEN;
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
            markLayer = new L.MarkerClusterGroup().addTo(map);
            this.isSearchExist && this.getNowPos();
        },
        getNowPos() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const longitude = position.coords.longitude;
                        const latitude = position.coords.latitude;
                        console.log("longitude", longitude);
                        console.log("latitude", latitude);
                        this.drawSelfMark(latitude, longitude);
                        this.$emit("getData", { longitude, latitude });
                    },
                    (event) => {
                        const { code, message } = event;
                        console.log("error", `code=${code}, msg=${message}`);
                    }
                );
            }
        },
        cleanMarker() {
            markLayer.clearLayers();
            map.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });
        },
        drawSelfMark(latitude, longitude) {
            map.setView([latitude, longitude], 18);
            L.marker([latitude, longitude], { icon: markSelf })
                .addTo(map)
                .bindPopup("你在這～")
                .openPopup();
        },
        setView(latitude, longitude) {
            map.setView([latitude, longitude], 18);
        },
        createMark() {
            markNoAvailable = new L.Icon({
                iconUrl: "./images/mark/no-rent.png",
                shadowUrl: "",
                iconSize: [40, 40],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                // shadowSize: [41, 41]
            });
            markAvailable = new L.Icon({
                iconUrl: "./images/mark/bike.png",
                shadowUrl: "",
                iconSize: [40, 40],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                // shadowSize: [41, 41]
            });
            markSelf = new L.Icon({
                iconUrl: "./images/mark/currentLocation.png",
                shadowUrl: "",
                iconSize: [40, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                // shadowSize: [41, 41]
            });
        },
        drawMark() {
            this.singlePageList.forEach((item) => {
                let { PositionLat, PositionLon } = item.StationPosition;
                let {
                    AvailableRentBikes,
                    AvailableReturnBikes,
                    UpdateTime,
                    StationName,
                    StationAddress,
                } = item;
                const mark =
                    AvailableRentBikes > 0 ? markAvailable : markNoAvailable;
                markLayer.addLayer(
                    L.marker([PositionLat, PositionLon], { icon: mark })
                        .bindPopup(`
                <h2 class="title">${StationName.Zh_tw}</h2>
                <h4>更新時間:${UpdateTime}</h4>
                <h4>地址:${StationAddress.Zh_tw}</h4>
                <h4>可借單車:${AvailableRentBikes}</h4>
                <h4>可停車位:${AvailableReturnBikes}</h4>
                <a target="_blank" href='https://www.google.com/maps/search/?api=1&query=${PositionLat},${PositionLon}'>在google map上查看</a>`)
                );
            });
            map.addLayer(markLayer);
        },
    },
    mounted() {
        this.createMark();
        this.createMap();
    },
    beforeDestroy() {
        map = null;
        markLayer = null;
    },
};
</script>
