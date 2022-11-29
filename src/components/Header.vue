<template>
    <header
        v-if="!isMobile || (isMobile && isIndex)"
        :class="setClass"
        class="gradients-deep flex flex-wrap justify-center items-center relative h-24 w-full text-white md:h-20 md:justify-between"
    >
        <h1 class="w-full text-2xl text-left pl-24 md:w-2/5">
            機智公車族
            <p class="text-base">全台公車動態時刻查詢應用服務</p>
        </h1>
        <ul
            class="hidden md:flex md:justify-end justify-center items-center pr-12 w-2/5"
        >
            <li
                v-for="item in menuList"
                class="text-white cursor-pointer text-lg md:mr-3 hover:text-purple-200"
                @click="goPath(item.path)"
                :key="item.path"
            >
                {{ item.name }}
            </li>
        </ul>
        <img
            @click="goPath('/')"
            class="absolute top-1 left-1 md:h-16 md:left-3"
            src="images/Index-header-logo.svg"
            alt=""
        />
        <img
            class="absolute bottom-0 right-0"
            src="images/Index-header-quarter.svg"
            alt=""
        />
    </header>
</template>

<script>
export default {
  inject: ['appData'],
  props: {
    setClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      menuList: [
        { name: '公車快找', path: '/bussearch' },
        { name: '查詢公車', path: '/busnear' },
        { name: '我的最愛', path: '/favorite' }
      ],
      showHeader: false,
      isIndex: false
    }
  },
  computed: {
    isMobile () {
      return this.appData?.windowSize < 780
    }
  },
  methods: {
    goPath (path) {
      this.$router.push(path)
    }
  },
  mounted () {
    if (this.$route.path === '/') {
      this.isIndex = true
    }
  }
}
</script>

<style lang="postcss">
header {
    border-bottom-left-radius: 50px;
}
</style>
