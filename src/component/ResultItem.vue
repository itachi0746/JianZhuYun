<template>
  <div>
    <div class="result" v-if="statusCode===acceptCode">
      <div class="result-logo">
        <img src="./assets/accept.png" alt="">
      </div>
      <div class="result-msg">{{status}}</div>
      <div class="result-data">{{theTime}}</div>
    </div>
    <div class="result" v-if="statusCode===refuseCode">
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
      acceptCode: 'BD0904', // 同意的code
      refuseCode: 'BD0909' // 拒绝的code
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
    },
    isInterview: {
      type: Boolean,
      default: null
    }
  },

  components: {},

  computed: {},

  methods: {},

  created () {},

  mounted () {
    if (this.isInterview) {
      this.acceptCode = 'BD0905'
      this.refuseCode = 'BD0906'
    }
  },

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .result {
    @include font-size(16px);
    color: #666;
    margin-top: 20px;
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
