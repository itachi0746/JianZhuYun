<template>
  <div id="common-header" ref="common-header" class="common-header">
    <div style="position: relative;">
      <div class="header-name">
        <van-icon v-show="back" class="header-icon2" name="arrow-left" @click="clickBack" />
        {{headerName}}
        <!--<van-icon v-if="search" class="header-icon" name="search" @click="clickSearch" />-->
        <div class="icon-box">
          <img v-if="search" src="./assets/search.png" alt="" @click="clickSearch">
          <img v-if="config" src="./assets/config.png" alt="" @click="clickConfig">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgUrl: ''
    }
  },

  components: {},

  props: {
    headerName: {
      type: String,
      default: ''
    },
    back: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    config: {
      type: Boolean,
      default: false
    }
  },

  computed: {},

  methods: {
    handleHeight () {
      setTimeout(() => {
        const headerHeight = this.$refs['common-header'].offsetHeight
        this.$emit('sendHeight', {'headerHeight': headerHeight})
      }, 300)
    },
    clickSearch () {
      this.$router.push({name: 'Search', params: {}})
    },
    clickConfig () {
      this.$router.push({name: 'Config', params: {}})
    },
    clickBack () {
      console.log('back')
      this.$router.go(-1)
    }
  },

  created () {},

  mounted () {
    this.handleHeight()
  },

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .common-header {
    height: 50px;
    background-color: $mainColor;
    width: 100%;
    padding: 15px 18px;
    @include borderBox();
    @include font-size(16px);
    text-align: center;
    color: #ffffff;
    position: relative;
  }
  .header-icon {
    position: absolute;
    right: 0;
    top: 0;
    @include font-size(20px)
  }
  .header-icon2 {
    position: absolute;
    left: 0;
    top: 0;
    @include font-size(20px)
  }
  .icon-box {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 0;
    top: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
