<template>
    <div id="map" class="for-web"></div>
</template>

<script>
import { createMarkerCluster } from '../utils/common'
import L from 'leaflet'
let map = null
let markLayer = null
let stationLayer = null
let selfMark = null
export default {
  data () {
    return {}
  },
  methods: {
    createMap () {
      const mapToken = process.env.VUE_APP_MAP_TOKEN
      map = L.map('map')

      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
        {
          attribution:
                        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: mapToken
        }
      ).addTo(map)
      const customCluster = createMarkerCluster()
      markLayer = new L.MarkerClusterGroup().addTo(map)
      stationLayer = customCluster.addTo(map)
      this.setView(25.033876641528444, 121.56456344001262)
    },
    cleanMarker () {
      markLayer.clearLayers()
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer)
        }
      })
    },
    cleanStation () {
      stationLayer.clearLayers()
    },
    setView (latitude, longitude, scale = 16) {
      map.setView([latitude, longitude], scale)
    },
    createMark () {
      selfMark = new L.Icon({
        iconUrl: 'images/mark/TrackingSpot.svg',
        shadowUrl: '',
        iconSize: [40, 40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      })
    },
    drawSelfMark (latitude, longitude) {
      markLayer.addLayer(
        L.marker([latitude, longitude], {
          icon: selfMark
        })
      )
      map.addLayer(markLayer)
      this.setView(latitude, longitude)
    },
    drawStation (PositionLat, PositionLon, StationName) {
      this.cleanStation()
      stationLayer.addLayer(
        L.marker([PositionLat, PositionLon], {
          icon: new L.DivIcon({
            className: 'bus-icon',
            iconAnchor: [12, 40],
            html: `
                        <div class="w-24 h-14 relative">
                            <p class="text-light font-bold text-sm text-center relative z-10 p-2 bg-primary-700 rounded-lg m-auto">
                                ${StationName.Zh_tw}
                            </p>
                            <img class="w-9 m-auto" src="images/mark/BusStop.svg"/>
                        </div>`
          })
        }).on('click', this.markerOnClick)
      )
      map.addLayer(stationLayer)
    }
  },
  mounted () {
    this.createMark()
    this.createMap()
  },
  beforeDestroy () {
    map = null
    markLayer = null
    stationLayer = null
  }
}
</script>

<style lang="postcss" scoped></style>
