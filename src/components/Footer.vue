<template>
  <footer
    v-if="!isMobile || (isMobile && isIndex)"
    class="bg-primary-700 h-9 fixed bottom-0 flex justify-center items-center text-white z-50 md:right-0"
  >
    Taiwan Bus © {{ new Date().getFullYear() }}
  </footer>
</template>

<script>
export default {
  inject: ["appData"],
  computed: {
    isMobile() {
      return this.appData?.windowSize < 780;
    },
  },
  data() {
    return {
      isIndex: false,
    };
  },
  mounted() {
    if (this.$route.path === "/") {
      this.isIndex = true;
    }
  },
};
</script>

<style lang="postcss">
footer {
  border-top-left-radius: 100px;
  width: calc(100vw - 384px);
}
@media screen and (max-width: 768px) {
  footer {
    width: 100vw;
  }
}
</style>
