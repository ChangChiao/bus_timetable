<template>
    <div>
        <h3 class="text-left pt-4 text-gray-500">搜尋結果</h3>
        <ul class="scroll-list">
            <template v-for="item in pageData">
                <bus-search-list-item :item="item" :key="item.RouteUID" />
            </template>
            <li class="no-data" v-if="pageData.length === 0">
                <p>哎呀!查無結果</p>
                <p>請重新搜尋關鍵字或切換縣市</p>
            </li>
        </ul>
    </div>
</template>

<script>
import BusSearchListItem from './BusSearchListItem.vue'
export default {
  components: { BusSearchListItem },
  props: {
    pageData: {
      type: Array,
      default: () => []
    }
  }
}
</script>
