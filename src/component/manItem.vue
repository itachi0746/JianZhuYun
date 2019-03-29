<template>
  <div class="manItem">
    <div class="man-box">
      <div class="man-head">
      </div>
      <div class="man-data">
        <div class="man-name">
          蔡明宏
        </div>
        <div class="man-tag1-box">
          <div class="man-tag1 van-hairline--right">本科</div>
          <div class="man-tag1 van-hairline--right">本科</div>
        </div>
        <div class="man-tag1-box">
          <div class="man-tag1 van-hairline--right">Web前端开发工程师</div>
          <div class="man-tag1 van-hairline--right">全城科技有限公司</div>
        </div>
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

  computed: {},

  methods: {},

  created () {},

  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .manItem {
    color: #666;
    @include font-size(16px)
  }
  .man-box {
    display: flex;
  }

  .man-head {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background-color: #969799;
    margin-right: 10px;
  }

  .man-data {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .man-data>div {
    margin-bottom: 5px;
  }

  .man-name {
    @include font-size(20px);
    color: #333;
  }

  .man-tag1-box {
    display: flex;
    @include font-size(14px);
  }

  .man-tag1 {
    margin-right: 5px;
    padding-right: 5px;
  }
</style>
