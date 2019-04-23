<template>
  <div class="box">
    <div class="data-head" v-if="theUrl">
      <img :src="url" alt="">
    </div>
    <div class="data-head" v-else>
      <img src="./assets/default_head_pr.png" alt="">
      <!--<img src="./assets/default_head_ep.png" alt="">-->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      baseUrl: '/ReService/Logo?id=',
      url: '' // 最终地址
    }
  },
  props: {
    theUrl: {
      type: String,
      default: ''
    },
    theId: {
      type: String,
      default: ''
    }
  },
  watch: {
    theUrl () {
      this.url = this.theUrl
    }
  },
  components: {},

  computed: {
//    url () { // 最终地址
//      return this.baseUrl + this.theUrl
//    }
  },

  methods: {},

  created () {},

  mounted () {
    if (this.theUrl) {
      this.url = this.theUrl
    } else {
      this.url = this.baseUrl + this.theId
    }
  },

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .data-head {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .box {
    width: 100%;
    height: 100%;
  }
</style>
