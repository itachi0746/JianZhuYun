<template>
  <div class="manItem">
    <div class="man-box" v-if="resData">
      <div class="man-head">
        <UserHead :theUrl="resData.RE23_PIC_URL"></UserHead>
      </div>
      <div class="man-data">
        <div class="man-name">
          {{resData.RE23_NAME}}
        </div>
        <div class="man-tag1-box">
          <div v-for="(item,index) in detailData" :key="index" :class="['man-tag1', {'van-hairline--right': index!==detailData.length-1}]">
            {{item.value}}
          </div>
        </div>
        <div class="man-tag1-box">
          <div class="man-tag1">{{resData.RE23_JOB_INTENSION}}</div>
          <!--<div class="man-tag1 van-hairline&#45;&#45;right">全城科技有限公司</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserHead from './UserHead.vue'
import myModule from '../common'

export default {
  data () {
    return {
      dataMap: {
        RE23_WORK_PLACE: '期望工作地点',
        RE23_WORK_YEARS: '工作经验',
        RE23_EDUCATION: '学历',
        RE23_ANNUAL_SALARY_E: '期待年薪'
      },
      detailData: []
    }
  },
  props: {
    resData: {
      type: Object,
      default: null
    }
  },

  components: {
    UserHead
  },

  computed: {},

  methods: {
  },

  created () {},

  mounted () {
    this.detailData = myModule.handleMapData(this.dataMap, this.resData)
  },

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
