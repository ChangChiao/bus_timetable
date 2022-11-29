<template>
    <div id="map"></div>
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
      this.$emit('getNowPos')
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
        // shadowSize: [41, 41]
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
    drawStation (stopInfo) {
      this.cleanStation()
      stopInfo.forEach((item, i) => {
        const { PositionLat, PositionLon } = item.StationPosition
        const customMarker = new L.DivIcon({
          className: 'bus-icon',
          iconAnchor: [12, 40],
          html: `
                    <div class="w-16 h-14 relative flex justify-center items-center">
                        <img class="absolute w-full block" src="images/mark/BusStop_blank.svg"/>
                        <span class="text-light font-bold text-base text-center relative z-10 pb-4">${
                            i + 1
                        }</span>
                    </div>
                    `
        })
        stationLayer.addLayer(
          L.marker([PositionLat, PositionLon], {
            icon: customMarker
          }).on('click', this.markerOnClick)
        )
      })
      map.addLayer(stationLayer)
    },
    markerOnClick (e) {
      const { lat, lng } = e.latlng
      this.$emit('setStop', { lat, lng })
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
