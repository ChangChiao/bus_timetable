<template>
    <div
        @click="ctrlKeyboard"
        class="touch-ball fixed md:absolute right-2 top-32"
    >
        <img
            :src="`images/${showKeyboard ? 'keyboard' : 'command'}.svg`"
            alt=""
            v-if="inView"
        />
        <p class="text-gray-500" v-else>TOP</p>
    </div>
</template>

<script>
export default {
  props: {
    showKeyboard: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      inView: true,
      scrollContainer: null
    }
  },
  methods: {
    ctrlKeyboard () {
      this.inView && this.$emit('ctrlKeyboard')
      if (!this.inView) {
        this.scrollContainer.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }
    },
    scrollEvent () {
      this.inView =
                this.scrollContainer.scrollTop <=
                this.scrollContainer.offsetHeight
    }
  },
  mounted () {
    this.scrollContainer = document.querySelector('.scroll-list')
    this.scrollContainer.addEventListener('scroll', this.scrollEvent)
  },
  beforeDestroy () {
    this.scrollContainer.removeEventListener('scroll', this.scrollEvent)
  }
}
</script>

<style lang="postcss" scoped></style>
