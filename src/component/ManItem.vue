<template>
  <div class="manItem">
    <div class="man-box" v-if="data">
      <div class="man-head">
        <UserHead :theUrl="data.RE23_PIC_URL"></UserHead>
        <!--<img :src="data.RE23_PIC_URL" alt="">-->
      </div>
      <div class="man-data">
        <div class="man-name">
          {{data.RE23_NAME}}
        </div>
        <div class="man-tag1-box">
          <div class="man-tag1 van-hairline--right">{{data.RE23_WORK_PLACE}}</div>
          <div class="man-tag1 van-hairline--right">{{data.RE23_WORK_YEARS}}</div>
          <div class="man-tag1 van-hairline--right">{{data.RE23_EDUCATION}}</div>
          <div class="man-tag1 van-hairline--right">{{data.RE23_SALARY_E1}}</div>
        </div>
        <div class="man-tag1-box">
          <div class="man-tag1 van-hairline--right">{{data.RE23_EXPECTED_POSITION}}</div>
          <!--<div class="man-tag1 van-hairline&#45;&#45;right">全城科技有限公司</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserHead from './UserHead.vue'
export default {
  data () {
    return {}
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },

  components: {
    UserHead
  },

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
    /*background-color: #969799;*/
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
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
    @include font-size(18px);
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
