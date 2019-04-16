<template>
  <div>
    <div class="result" v-if="statusCode==='BD0904'">
      <div class="result-logo">
        <img src="./assets/accept.png" alt="">
      </div>
      <div class="result-msg">{{status}}</div>
      <div class="result-data">{{theTime}}</div>
    </div>
    <div class="result" v-if="statusCode==='BD0909'">
      <div class="result-logo">
        <img src="./assets/refuse.png" alt="">
      </div>
      <div class="result-msg">{{status}}</div>
      <div class="result-data">{{theTime}}</div>
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
    statusCode: {
      type: String,
      default: null
    },
    status: {
      type: String,
      default: null
    },
    theTime: {
      type: String,
      default: null
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
  .result {
    @include font-size(16px);
    color: #666;
  }

  .result-logo {
    width: 100%;
    @include defaultFlex;
    margin-bottom: 10px;
    img {
      width: 25px;
      height: 25px;
    }
  }

  .result-data {
    @include font-size(14px);
    text-align: center;
  }

  .result-msg {
    text-align: center;
  }

</style>
