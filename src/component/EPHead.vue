<template>
  <div class="data-head">
    <div class="un-read-num" v-if="theNum"></div>
    <!--<div class="un-read-num" v-if="theNum">{{theNum}}</div>-->
    <div>
      <img :src="url" alt="">
    </div>
    <!--<div v-else>-->
      <!--<img src="./assets/default_head_ep.png" alt="">-->
    <!--</div>-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      baseUrl: '/EntService/Logo?id=',
      url: '',
      theNum: null
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
    },
    isRead: {
      type: [String, Number],
      default: null
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
    border-radius: 5px;
    position: relative;
    /*overflow: hidden;*/
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .box {
    width: 100%;
    height: 100%;
  }
  .un-read-num {
    width: 7px;
    height: 7px;
    position: absolute;
    right: 0;
    top: -0.16rem;
    color: #fff;
    font-size: 0.24rem;
    font-weight: 500;
    font-family: PingFang SC,Helvetica Neue,Arial,sans-serif;
    text-align: center;
    box-sizing: border-box;
    /*padding: 0 0.06rem;*/
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
