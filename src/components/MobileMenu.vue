<template>
    <div class="w-screen overflow-hidden md:hidden">
        <div class="fixed w-screen h-screen top-0 left-0 z-50" v-if="active">
            <div class="mask"></div>
            <nav
                class="menu overflow-hidden fixed right-0 top-0 w-60 gradients-dark z-30"
            >
                <ul
                    class="menu-list absolute pt-16 pr-48 top-16 rounded-full gradients"
                >
                    <li
                        v-for="item in menuList"
                        class="text-white pr-40 py-4 text-right text-lg"
                        @click="goPath(item.path)"
                        :key="item.path"
                    >
                        {{ item.name }}
                    </li>
                </ul>
            </nav>
        </div>
        <div
            :class="['mobile-menu-btn', { active: active }]"
            @click="ctrlMenu"
            v-if="showHam"
        >
            <div class="hamburger">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </div>
            <img
                class="absolute h-8 w-8 top-12 left-0"
                :src="`images/header/HeadMenu-quarter-${
                    active ? 'W' : 'P'
                }_mobile.svg`"
                alt=""
            />
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      menuList: [
        { name: '回首頁', path: '/' },
        { name: '公車快找', path: '/bussearch' },
        { name: '查詢公車', path: '/busnear' },
        { name: '我的最愛', path: '/favorite' }
      ],
      active: false,
      showHam: true
    }
  },
  methods: {
    ctrlMenu () {
      this.active = !this.active
    },
    goPath (path) {
      this.$router.push(path)
      this.active = false
    }
  },
  mounted () {
    this.showHam = this.$route.path !== '/'
  }
}
</script>

<style lang="postcss" scoped>
.menu {
    border-bottom-left-radius: 160px;
    height: 475px;
    transition: 0.5s;
}

.menu-list {
    height: 500px;
    width: 500px;
}

.mobile-menu-btn {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background: linear-gradient(60.96deg, #493289 2.55%, #6a45c5 100%);
    overflow: hidden;
    position: fixed;
    z-index: 100;
    right: -57px;
    top: -50px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
}

.mobile-menu-btn.active {
    background: linear-gradient(228.69deg, #eeeff1 0%, #d5d6d8 100%);
}

.mobile-menu-btn.active .line {
    background-color: #7550cc;
}

.hamburger {
    width: 30px;
    height: 30px;
    display: flex;
    position: absolute;
    top: 64px;
    left: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.line {
    width: 20px;
    height: 3px;
    background-color: #fff;
    display: block;
    margin: 2px 0;
    transition: all 0.2s ease-in-out;
}

.mobile-menu-btn.active .line:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}

.mobile-menu-btn.active .line:nth-child(2) {
    opacity: 0;
}

.mobile-menu-btn.active .line:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
}
</style>
