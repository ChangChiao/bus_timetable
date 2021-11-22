<template>
    <div id="map" class="relative z-10 w-screen h-screen"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
let map = null;
let markLayer = null;
let stationLayer = null;
let stationMark = null;
let selfMark = null;
export default {
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
            markLayer = new L.MarkerClusterGroup().addTo(map);
            stationLayer = new L.MarkerClusterGroup().addTo(map);
            this.$emit("getNowPos");
        },
        cleanMarker() {
            markLayer.clearLayers();
            map.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });
        },
        cleanStation() {
            stationLayer.clearLayers();
        },
        setView(latitude, longitude) {
            console.log("latitude, longitude", latitude, longitude);
            map.setView([latitude, longitude], 16);
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
            selfMark = new L.Icon({
                iconUrl: "images/mark/TrackingSpot.svg",
                shadowUrl: "",
                iconSize: [40, 40],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                // shadowSize: [41, 41]
            });
        },
        drawSelfMark(latitude, longitude) {
            markLayer.addLayer(
                L.marker([latitude, longitude], {
                    icon: selfMark,
                })
            );
            map.addLayer(markLayer);
            this.setView(latitude, longitude);
        },
        drawStation(stopInfo) {
            this.cleanStation();
            stopInfo.forEach((item) => {
                let { PositionLat, PositionLon } = item.StationPosition;
                stationLayer.addLayer(
                    L.marker([PositionLat, PositionLon], { icon: stationMark })
                        .bindPopup(`
                            <h2 class="title">${item.StationName.Zh_tw}</h2>
                        `)
                );
            });
            map.addLayer(stationLayer);
        },
        createMarkerCluster() {
            return new L.markerClusterGroup({
                showCoverageOnHover: false,
                spiderfyOnMaxZoom: true,
                zoomToBoundsOnClick: true,
                argumentsspiderfyOnMaxZoom: false,
                maxClusterRadius: 120,
                iconCreateFunction: function (cluster) {
                    const markers = cluster.getAllChildMarkers();
                    const html = `
                            <div class="circle">
                                    ${markers.length}
                                    </div>
                            . `;
                    return L.divIcon({
                        html: html,
                        className: "clusterBikeIcon",
                        iconSize: L.point(49, 49),
                    });
                },
            });
        },
    },
    mounted() {
        this.createMark();
        this.createMap();
    },
    beforeDestroy() {
        map = null;
        markLayer = null;
        stationLayer = null;
    },
};
</script>
