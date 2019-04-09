<template>
  <div>
    <div class="data-head" v-if="theUrl">
      <img :src="theUrl" alt="">
    </div>
    <div class="data-head" v-else>
      <img src="./assets/default_head_pr.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    theUrl: {
      type: String,
      default: ''
    }
  },
  components: {},

  computed: {},

  methods: {},

  created () {},

  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .data-head {
    width: 100%;
    height: 100%;
    /*background-color: #999999;*/
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
