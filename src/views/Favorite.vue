<template>
    <div>
        <Header />
        <map-searchs ref="mapSearch" :setClass="'for-web'" />
        <div class="side-block pt-10 px-4">
            <h2 class="py-4 text-gray-500 text-left">我的最愛</h2>
            <ul class="scroll-list">
                <template v-for="item in favoriteList">
                    <bus-search-list-item :item="item" :key="item.RouteUID" />
                </template>
            </ul>
        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import MapSearchs from '../components/MapSearchs.vue'
import { mapState } from 'vuex'
import BusSearchListItem from '../components/BusSearchListItem.vue'
export default {
  components: {
    BusSearchListItem,
    MapSearchs,
    Footer,
    Header
  },
  computed: {
    ...mapState(['favoriteList'])
  }
}
</script>
