<template>
  <div class="box">
    <!--<div class="un-read-num" v-if="theNum">{{theNum}}</div>-->
    <div class="un-read-num" v-if="theNum"></div>

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
      url: '', // 最终地址
      theNum: null

    }
  },
  props: {
    theUrl: {
      type: String,
      default: ''
    },
    theId: {
      type: [String, Number],
      default: ''
    },
    isRead: {
      type: [String, Number],
      default: null
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
    if (this.isRead !== null) {
      this.theNum = this.isRead ? 0 : 1
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
    /*overflow: hidden;*/
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .box {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .un-read-num {
    width: 7px;
    height: 7px;
    position: absolute;
    right: 4px;
    top: -4px;
    color: #fff;
    font-size: 0.24rem;
    font-weight: 500;
    font-family: PingFang SC,Helvetica Neue,Arial,sans-serif;
    text-align: center;
    box-sizing: border-box;
    padding: 0 0.06rem;
    /*min-width: 0.32rem;*/
    line-height: 0.28rem;
    border: 0.02rem solid #f44;
    border-radius: 50%;
    background-color: #f44;
    -webkit-transform: translateX(50%);
    transform: translateX(50%);
    -webkit-transform-origin: 100%;
    transform-origin: 100%;
  }
</style>
