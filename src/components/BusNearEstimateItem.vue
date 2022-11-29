<template>
    <li
        @click="goRouteDetail"
        class="flex flex-wrap items-center justify-between h-16 px-2 border-b cursor-pointer border-line"
    >
        <p
            :class="{ red: itemData.EstimateTime <= 90 }"
            class="w-24 font-bold"
            v-html="transStatus(itemData)"
        ></p>

        <p class="w-3/5 text-black">
            <span
                ><strong v-if="!isIndex">{{ order }}.</strong>
                {{ itemData.RouteName.Zh_tw }}</span
            >
            <span class="block w-full text-sm text-gray-400">
                {{ (head && `開往${head}`) || "--" }}
            </span>
        </p>
        <img
            class="block w-6"
            src="images/arrow/arrow-right-light.svg"
            alt=""
        />
    </li>
</template>

<script>
import { mapState } from 'vuex'
import { transBusStatus } from '../utils/common'
export default {
  props: {
    itemData: {
      type: Object,
      default: () => {}
    },
    order: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState(['terminalList']),
    target () {
      return this.terminalList[this.itemData.RouteUID]
    },
    head () {
      return this.itemData.Direction === 0
        ? this.target?.DestinationStopNameZh
        : this.target?.DepartureStopNameZh
    },
    isIndex () {
      return this.$route.path === '/'
    }
  },
  methods: {
    transStatus (obj) {
      return transBusStatus(obj)
    },
    goRouteDetail () {
      const { RouteName, RouteUID } = this.itemData
      const { DepartureStopNameZh, DestinationStopNameZh, City } =
                this.target

      this.$router.push({
        path: '/busroute',
        query: {
          routeUID: RouteUID,
          routeName: RouteName.Zh_tw,
          city: City,
          to: DepartureStopNameZh,
          back: DestinationStopNameZh
        }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.scroll-list {
    height: calc(100vh - 100px);
}
</style>
