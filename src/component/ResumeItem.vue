<template>
  <div>
    <div v-if="resData" class="header van-hairline--bottom">
      <van-row>
        <van-col span="20">
          <div class="data-name">{{resData.RE23_NAME}}</div>
          <div class="data-item-box">
            <div class="data-item" v-for="(item, index) in detailData" :key="index">
              <div class="data-item-label">{{item.key}}</div>
              <van-tag class="theTag" plain text-color="#333333">{{item.value}}</van-tag>
            </div>
          </div>
        </van-col>
        <van-col span="4">
          <div style="width: 50px;height: 50px;">
            <useHead :theUrl="resData.RE23_PIC_URL"></useHead>
          </div>
        </van-col>
      </van-row>
      <van-cell-group>
        <van-cell title="期望工作地点" :value="resData.RE23_WORK_PLACE" />
        <van-cell title="期望工作性质" :value="resData.RE23_WORK_PROP" />
        <van-cell title="期望职能" :value="resData.RE23_EXPECTED_FX" />
        <van-cell title="期望年薪" :value="resData.RE23_ANNUAL_SALARY_E" />
        <van-cell title="到岗时间" :value="resData.RE23_CAN_WORK_TIME" />
      </van-cell-group>
    </div>
    <div v-if="workExperienceData" class="item-box van-hairline--bottom">
      <div class="title">
        工作经历
        <i class="blue-point"></i>
      </div>
      <div class="item-line item-line1">
        <span>{{workExperienceData.RE02_COMPANY_NAME}}</span>
        <span>{{workExperienceData.RE02_BEGIN_DATE}}-{{workExperienceData.RE02_END_DATE}}</span>
      </div>
      <div class="item-line item-line2">
        <span>{{workExperienceData.RE02_POSITION}}·{{workExperienceData.RE02_DEPT_NAME}}</span>
      </div>
      <div class="item-line item-line3">
        <span>{{workExperienceData.RE02_WORK_DESC}}</span>
      </div>
    </div>
    <!--<div class="action-box">-->
      <!--<van-button type="info">移动到</van-button>-->
    <!--</div>-->
  </div>
</template>

<script>
import useHead from './UserHead.vue'
import myModule from '../common'

export default {
  data () {
    return {
      dataMap: {
        RE23_AGE: '年龄',
        RE23_SEX: '性别',
//        RE23_BORN_IN: '籍贯',
        RE23_MOBILE_PHONE: '手机',
//        RE23_IDENTIY_CARD_NO: '身份证'
      },
      detailData: []
    }
  },
  props: {
    resData: {
      type: Object,
      default: null
    },
    workExperienceData: {
      type: Object,
      default: null
    }
  },

  components: {
    useHead
  },

  computed: {},

  methods: {},

  created () {
  },

  mounted () {
    this.resData.RE23_CAN_WORK_TIME = myModule.handleTime(this.resData.RE23_CAN_WORK_TIME)
    this.detailData = myModule.handleMapData(this.dataMap, this.resData)
  },

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .handle {
    @include font-size(16px);
    color: #666;
  }
  .body {
    padding: 15px 18px;
    @include borderBox()
  }
  .header {
    padding-bottom: 20px;
  }
  .item-box {
    padding-top: 20px;
    padding-bottom: 20px;
    .title {
      color: #323233;
      padding: 5px 0;
      position: relative;
    }
    .blue-point {
      width: 6px;
      height: 6px;
      background-color: $mainColor;
      position: absolute;
      top: 12px;
      left: -10px;
      border-radius: 50%;
    }
  }
  .item-line {
    padding: 5px 0;
    @include font-size(14px);
    color: #666;
  }
  .item-line1 {
    display: flex;
    justify-content: space-between;
    span:nth-child(1) {
      font-weight: bold;
      @include font-size(18px)
    }
  }
  .item-line2 {
    @include font-size(16px)
  }
  .item-line3 {
    line-height: 22px;
  }
  .data-head {
    width: 53px;
    height: 53px;
    background-color: #999999;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .data-name {
    color: #323233;
    font-weight: bold;
    @include font-size(22px)
  }
  .data-item-box {
    display: flex;
    margin-top: 5px;
    flex-wrap: wrap
  }
  .data-item-label {
    @include defaultFlex;
    margin-right: 5px;
  }
  .data-item {
    display: flex;
    @include font-size(14px);
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .theTag {
    @include font-size(14px);
    padding: 4px 20px;
  }
  .van-tag::after {
    border-color: #666;
  }
  .action-box {
    @include defaultFlex;
    margin: 40px 0 50px;
    button {
      background-color: $mainColor;
      border-color: $mainColor;
      width: 98px;
      height: 43px;
    }
  }
</style>
