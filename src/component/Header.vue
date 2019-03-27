<template>
  <div id="common-header" ref="common-header" class="common-header">
    <div style="position: relative;">
      <div class="header-name">
        {{headerName}}
        <van-icon class="header-icon" name="search" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },

  components: {},

  props: {
    headerName: {
      type: String,
      default: ''
    }
  },

  computed: {},

  methods: {
    handleHeight () {
      setTimeout(() => {
        const headerHeight = this.$refs['common-header'].offsetHeight
        this.$emit('sendHeight', {'headerHeight': headerHeight})
      }, 300)
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
</style>
