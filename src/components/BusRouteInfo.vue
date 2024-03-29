<template>
    <div class="relative">
        <img
            class="py-2 cursor-pointer"
            src="images/arrow/back.svg"
            @click="goBack"
            alt=""
        />

        <p class="py-2 text-sm text-gray-500">
            將於{{ second }}秒後更新
            <img
                @click="refresh"
                class="inline cursor-pointer"
                src="images/Refresh.svg"
                alt=""
            />
        </p>
        <h1 class="pb-4 text-3xl font-bold">
            {{ routeName }}
            <font-awesome-icon
                class="text-2xl text-gray-400 cursor-pointer"
                :class="{ 'text-status-error': isExistFavorite }"
                @click="setFavorite"
                icon="heart"
            />
        </h1>
        <ul
            class="relative z-30 flex items-center justify-between border-b border-gray-300"
        >
            <li
                :class="['tab-item', { active: listType === 0 }]"
                @click="setTab(0)"
            >
                往{{ destination.back }}
            </li>
            <li
                :class="['tab-item', { active: listType === 1 }]"
                @click="setTab(1)"
            >
                往{{ destination.to }}
            </li>
        </ul>
        <ul class="scroll-list">
            <li
                class="relative flex items-center w-full py-4 border-b cursor-pointer border-line hover:bg-gray-200"
                v-for="(item, i) in typeBusList"
                :key="item.StopUID"
                @click="clickStop(item)"
            >
                <span class="w-24" v-html="transStatus(item)"> </span>
                <span>
                    <strong>{{ i + 1 }}.</strong>
                    {{ item.StopName.Zh_tw }}
                </span>
                <span
                    class="absolute top-0 w-px h-full bg-gray-300 line"
                ></span>
                <span
                    class="border absolute right-1.5 top-6 border-gray-400 w-3 h-3 rounded-full"
                    :class="item.PlateNumb ? 'bg-primary-500' : 'bg-light'"
                ></span>
                <span
                    v-if="item.PlateNumb"
                    class="absolute flex items-center justify-center w-20 h-5 text-sm text-center right-6 top-5 gradients-deep text-light rounded-2xl"
                    >{{ item.PlateNumb }}</span
                >
            </li>
        </ul>
        <div class="line"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { transBusStatus } from '../utils/common'
import { getBusArrival, getBusRealTime } from '../utils/api'
export default {
  props: {
    routeName: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default: ''
    },
    routeUID: {
      type: String,
      default: ''
    },
    destination: {
      type: Object,
      default: () => {}
    },
    stopInfo: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    routeName: {
      immediate: true,
      handler () {
        if (!this.routeName) return
        this.getBusArrive()
        this.getDataByTimer()
      }
    }
  },
  computed: {
    ...mapState(['favoriteList']),
    goBus () {
      const list = this.busData.filter((item) => item.Direction === 0)
      return this.sortData(list, 0)
    },
    backBus () {
      const list = this.busData.filter((item) => item.Direction === 1)
      return this.sortData(list, 1)
    },
    typeBusList () {
      return this.listType === 0 ? this.goBus : this.backBus
    },
    isExistFavorite () {
      return this.favoriteList.some(
        (vo) => vo.RouteUID === this.routeUID
      )
    }
  },
  data () {
    return {
      timer: null,
      listType: 0,
      second: 60,
      busData: [],
      busPos: []
    }
  },
  methods: {
    transStatus (obj) {
      return transBusStatus(obj)
    },
    refresh () {
      this.second = 60
      this.getBusArrive()
      this.getDataByTimer()
    },
    getDataByTimer () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.second -= 1
        if (this.second <= 0) {
          this.second = 60
          this.getBusArrive()
        }
      }, 1000)
    },
    async getBusArrive () {
      try {
        const sendData = {
          city: this.city,
          $filter: `contains(RouteUID,'${this.routeUID}')`
        }
        this.$bus.$emit('setLoading', true)
        const result = await getBusArrival(sendData)
        this.$bus.$emit('setLoading', false)
        this.busData = result
        this.getBusRealInfo()
      } catch (error) {
        console.log('error', error)
      }
    },
    async getBusRealInfo () {
      try {
        const sendData = {
          city: this.city,
          $filter: `contains(RouteUID,'${this.routeUID}')`
        }
        const result = await getBusRealTime(sendData)
        this.combineData(result)
      } catch (error) {
        console.log('error', error)
      }
    },
    combineData (bus) {
      const temp = [...this.busData]
      bus.forEach((element) => {
        console.log('combineData')
        const index = this.busData.findIndex(
          (vo) => vo.StopUID === element.StopUID
        )
        temp[index].PlateNumb = element.PlateNumb
      })
      this.busData = temp
    },
    setTab (type) {
      this.listType = type
    },
    goBack () {
      this.$router.go(-1)
    },
    clickStop (obj) {
      this.$emit('clickStop', obj)
    },
    setFavorite () {
      const obj = {
        RouteName: {
          Zh_tw: this.routeName
        },
        City: this.city,
        RouteUID: this.routeUID,
        DepartureStopNameZh: this.destination.to,
        DestinationStopNameZh: this.destination.back
      }
      this.$store.commit('updateFavoriteList', obj)
    },
    sortData (arr = [], order) {
      const temp = []
      console.warn('arr', arr)
      console.warn('this.stopInfo~~~', this.stopInfo)
      this.stopInfo?.[order]?.Stops.forEach((vo) => {
        if (arr.length > 0) {
          const target = arr.find(
            (item) => item?.StopUID === vo?.StopUID
          )
          temp.push(target)
        }
      })
      return temp
    }
  },
  mounted () {},
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="postcss" scoped>
.tab-item {
    @apply text-center w-1/2 pb-2  border-primary-500 cursor-pointer;
}

.tab-item.active {
    border-bottom: 4px solid #7550cc;
}

.line {
    right: 11px;
}
</style>
