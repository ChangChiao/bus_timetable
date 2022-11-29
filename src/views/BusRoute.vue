<template>
    <div>
        <Header />
        <map-route ref="mapRoute" @initData="initData" :mapInfo="mapInfo" />
        <div
            class="panel side-block"
            :style="{
                transform: 'translateY(' + this.moveY + 'vh)',
                'transition-duration': '0.3s',
            }"
        >
            <div class="h-8 md:hidden" @click="ctrlPanel">
                <div class="w-10 h-0.5 bg-gray-400 m-auto"></div>
            </div>
            <bus-route-info
                @clickStop="clickStop"
                :stopInfo="stopInfo"
                :destination="destination"
                :city="city"
                :routeUID="routeUID"
                :routeName="routeName"
            />
        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import BusRouteInfo from '../components/BusRouteInfo.vue'
import MapRoute from '../components/MapRoute.vue'
import { getBusStop, getBusLine, getBusPosition } from '../utils/api'
export default {
  inject: ['appData'],
  components: {
    BusRouteInfo,
    MapRoute,
    Footer,
    Header
  },
  computed: {
    isMobile () {
      return this.appData?.windowSize < 780
    }
  },
  watch: {
    isMobile: {
      immediate: true,
      handler (val) {
        if (!val) {
          this.moveY = 0
        }
      }
    }
  },
  data () {
    return {
      moveY: 60,
      routeName: '',
      routeUID: '',
      city: '',
      mapInfo: [],
      stopInfo: [],
      destination: {
        to: '',
        back: ''
      }
    }
  },
  methods: {
    async getRouteMapMark () {
      const sendData = {
        city: this.city,
        $filter: `contains(RouteUID,'${this.routeUID}')`,
        $select: 'Direction, Stops'
      }

      try {
        const result = await getBusStop(sendData)
        this.mapInfo = result[0].Stops
        this.stopInfo = result
        this.setView(this.mapInfo)
      } catch (error) {
        console.log('error', error)
      }
    },
    async getRouteLine () {
      const sendData = {
        city: this.city,
        $filter: `contains(RouteUID,'${this.routeUID}')`
      }

      try {
        const result = await getBusLine(sendData)
        const lineInfo = result[0].Geometry
        this.$refs.mapRoute.drawLine(lineInfo)
      } catch (error) {
        console.log('error', error)
      }
    },
    async getBusPos () {
      const sendData = {
        city: this.city,
        $filter: `contains(RouteUID,'${this.routeUID}')`
      }

      try {
        const result = await getBusPosition(sendData)
        const busInfo = result
        this.$refs.mapRoute.drawBus(busInfo)
      } catch (error) {
        console.log('error', error)
      }
    },
    initData () {
      this.getRouteMapMark()
      this.getRouteLine()
      this.getBusPos()
    },
    setView (mapInfo) {
      const { PositionLat, PositionLon } = mapInfo?.[0]?.StopPosition
      this.$refs.mapRoute.drawMark(mapInfo)
      this.$refs.mapRoute.setView(PositionLat, PositionLon, 12)
    },
    ctrlPanel () {
      this.moveY = this.moveY === 60 ? 10 : 60
    },
    clickStop (obj) {
      console.log('obj====', obj)
      const { StopUID } = obj
      const target = this.mapInfo.find((vo) => vo.StopUID === StopUID)
      const { PositionLat, PositionLon } = target?.StopPosition
      this.$refs.mapRoute.setView(PositionLat, PositionLon, 18)
    }
  },
  mounted () {
    this.routeName = this.$route.query.routeName
    this.routeUID = this.$route.query.routeUID
    this.city = this.$route.query.city
    const to = this.$route.query.to
    const back = this.$route.query.back
    this.destination = { to: to, back: back }
    this.$refs.mapRoute.initMap()
  }
}
</script>
