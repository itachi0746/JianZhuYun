<template>
  <div class="handle">
    <Header @sendHeight="handleHeight" :headerName="headerName" :back="true"></Header>
    <div class="body" ref="body">
      <div v-if="resData">
        <ResumeItem :resData="resData" :workExperienceData="workExperienceData"></ResumeItem>
        <van-cell-group>
          <van-cell title="期望工作地点" :value="resData.RE23_WORK_PLACE" />
          <van-cell title="期望工作性质" :value="resData.RE23_WORK_PROP" />
          <van-cell title="期望职能" :value="resData.RE23_EXPECTED_FX" />
          <van-cell title="期望年薪" :value="resData.RE23_ANNUAL_SALARY_E" />
          <van-cell title="到岗时间" :value="resData.RE23_CAN_WORK_TIME" />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Header from '../../../component/Header.vue'
import UserHead from '../../../component/UserHead.vue'
import ResumeItem from '../../../component/ResumeItem.vue'

export default {
  data () {
    return {
      headerName: '人才详情',
      resData: null,
      workExperienceData: null
    }
  },

  components: {
    Header,
    UserHead,
    ResumeItem
  },

  computed: {},

  methods: {
    handleHeight (height) {
      this.headerHeight = height.headerHeight
      if (this.headerHeight) {
        const WH = myModule.getClientHeight()
        this.$refs.body.style.height = WH - this.headerHeight + 'px'
      }
    }
  },

  created () {
    const param = myModule.getUrlParams()
    postData('/EntService/PeopleDetail', {id: param.id}).then((res) => {
      console.log(res)
      if (myModule.isEmpty(res.ReturnData)) {
        console.log('暂无数据')
        this.$toast.fail({
          mask: false,
          message: '暂无数据',
            forbidClick: false // 禁用背景点击
        })
        return
      }
      this.resData = res.ReturnData
      this.resData.RE23_CAN_WORK_TIME = myModule.handleTime(this.resData.RE23_CAN_WORK_TIME)
    })
  },

  mounted () {},

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
    @include font-size(18px)
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

</style>
