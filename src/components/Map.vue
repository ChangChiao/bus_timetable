<template>
    <div id="map" class="w-screen h-screen"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import * as Wkt from "wicket";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
let map = null;
let markLayer = null;
let routeLayer = null;
let mark = null;
export default {
    props: {
        mapInfo: {
            type: Array,
            default: () => [],
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
            markLayer = new L.MarkerClusterGroup().addTo(map);
            this.$emit("getRouteMap");
        },
        cleanMarker() {
            markLayer.clearLayers();
            map.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });
        },
        setView(latitude, longitude) {
            console.log("latitude, longitude", latitude, longitude);
            map.setView([latitude, longitude], 16);
        },
        createMark() {
            mark = new L.Icon({
                iconUrl: "./images/mark.png",
                shadowUrl: "",
                iconSize: [40, 40],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                // shadowSize: [41, 41]
            });
        },
        drawMark() {
            this.mapInfo.forEach((item) => {
                let { PositionLat, PositionLon } = item.StopPosition;
                let { StopName } = item;
                markLayer.addLayer(
                    L.marker([PositionLat, PositionLon], {
                        icon: mark,
                    }).bindPopup(` <h2 class="title">${StopName.Zh_tw}</h2>`)
                );
            });
            map.addLayer(markLayer);
        },
        drawLine(Geometry) {
            console.log("Geometry", Geometry);
            this.cleanMarker(); // Create a new Wicket instance
            const wicket = new Wkt.Wkt();
            //Read in any kind of WKT string wicket.read(Geometry);
            const geojsonFeature = wicket.toJson();
            const lineStyle = { color: "#C50047", weight: 5 };
            routeLayer = L.geoJSON(geojsonFeature, { style: lineStyle }).addTo(
                map
            );
            routeLayer.addData(geojsonFeature);
            map.fitBounds(routeLayer.getBounds());
            map.addLayer(routeLayer);
            // this.drawMark(Geometry);
        },
    },
    mounted() {
        this.createMark();
        this.createMap();
    },
    beforeDestroy() {
        map = null;
        markLayer = null;
        routeLayer = null;
    },
};
</script>
