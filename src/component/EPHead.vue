<template>
  <div>
    <div class="data-head" v-if="theUrl">
      <img :src="url" alt="">
    </div>
    <div class="data-head" v-else>
      <img src="./assets/default_head_ep.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      baseUrl: '/EntService/Logo?id=',
      url: ''
    }
  },
  props: {
    theUrl: {
      type: [String, Number],
      default: ''
    },
    theId: {
      type: [String, Number],
      default: ''
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
    /*background-color: #999999;*/
    border-radius: 5px;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
