<template>
  <div class="handle">
    <Header @sendHeight="handleHeight" :headerName="headerName" :back="true"></Header>
    <div class="body" ref="body">
      <div v-if="resData">
        <!--<EPResumeItem :resData="resData" :workExperienceData="workExperienceData"></EPResumeItem>-->
        <ResumeItem2 :resData="resData" :isEdit="false" :isEnt="true"></ResumeItem2>
        <ResultItem
          :statusCode="resData.RE01.RE01_STATUS"
          :status="resData.RE01.ReferenceValues.RE01_STATUS"
          :theTime="resData.RE01.RE01_CHG_TIME"
          :isInterview="true"
        ></ResultItem>

      </div>
    </div>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Header from '../../../component/Header.vue'
import EPResumeItem from '../../../component/EPResumeItem.vue'
import ResultItem from '../../../component/ResultItem.vue'
import ResumeItem2 from '../../../component/ResumeItem2.vue'

export default {
  data () {
    return {
      headerName: '面试结果',
      id: null,
      resData: null,
      workExperienceData: null,
      pageId: 1
    }
  },

  components: {
    Header,
    EPResumeItem,
    ResultItem,
    ResumeItem2
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
    this.id = param.id
    postData('/EntService/InverviewResult', {id: this.id}).then((res) => {
      console.log(res)
      if (myModule.isEmpty(res.ReturnData)) {
        console.log('暂无数据')
        this.$toast.fail({
          mask: false,
          message: '暂无数据',
          forbidClick: false // 禁用背景点击
        })
        setTimeout(() => {
//          GoToPage('', 'EPPeopleDB.html', {pageid: this.pageId})
        }, 2000)
        return
      }
      this.resData = res.ReturnData
      this.resData.RE01_CHG_TIME = myModule.handleTime(this.resData.RE01_CHG_TIME)
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
    padding: 15px 10px;
    @include borderBox();
    position: relative;
  }
  .header {
    padding-bottom: 20px;
  }
  .item-box {
    padding: 20px 5px;
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
  .btnSize2 {
    height: 25px;
    line-height: 0;
    padding: 5px 5px;
    margin-top: 10px;
  }
  .right-box {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    button {
      color: $mainColor;
      border-color: $mainColor;
    }
  }
  .action-box {
    padding: 25px 20px;
    display: flex;
    justify-content: space-between;
  }
  .btn-box {
    display: flex;
    justify-content: center;
    button {
      background-color: $mainColor;
      border-color: $mainColor;
    }
  }
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
