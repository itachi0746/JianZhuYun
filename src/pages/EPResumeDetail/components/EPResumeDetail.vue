<template>
  <div class="handle">
    <Header @sendHeight="handleHeight" :headerName="headerName" :back="true"></Header>
    <div class="body" ref="body">
      <div v-if="resData">
        <EPResumeItem :resData="resData" :workExperienceData="workExperienceData"></EPResumeItem>
        <!--<van-cell-group>-->
          <!--<van-cell title="期望工作地点" :value="resData.RE23_WORK_PLACE" />-->
          <!--<van-cell title="期望工作性质" :value="resData.RE23_WORK_PROP" />-->
          <!--<van-cell title="期望职能" :value="resData.RE23_EXPECTED_FX" />-->
          <!--<van-cell title="期望年薪" :value="resData.RE23_ANNUAL_SALARY_E" />-->
          <!--<van-cell title="到岗时间" :value="resData.RE23_CAN_WORK_TIME" />-->
        <!--</van-cell-group>-->
      </div>
      <div class="action-box">
        <div class="p10">
          <van-button class="btnClass" type="info" size="large" @click.native="moveTo">移动到</van-button>
        </div>
      </div>
    </div>
    <PopRadio v-if="showPop" :theRadioData="theRadioData" @closePop="closePop" :showPop="showPop"></PopRadio>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Header from '../../../component/Header.vue'
import EPResumeItem from '../../../component/EPResumeItem.vue'
import PopRadio from '../../../component/PopRadio.vue'

export default {
  data () {
    return {
      headerName: '简历详情',
      id: null,
      resData: null,
      workExperienceData: null, // 工作经历
      showPop: false, // 弹窗开关
      theRadioData: [
        {id: 'RE0201', Value: '人才库'},
        {id: 'RE0202', Value: '面试库'},
        {id: 'RE0203', Value: '录用库'},
        {id: 'RE0204', Value: '签约库'},
        {id: 'RE0205', Value: '备用人才库'},
        {id: 'RE0206', Value: '历史库'}
      ] // 弹窗的数据
    }
  },

  components: {
    Header,
    EPResumeItem,
    PopRadio
  },

  computed: {},

  methods: {
    handleHeight (height) {
      this.headerHeight = height.headerHeight
      if (this.headerHeight) {
        const WH = myModule.getClientHeight()
        this.$refs.body.style.height = WH - this.headerHeight + 'px'
      }
    },
    /**
     *  移动到其他库
     */
    moveTo () {
      this.showPop = true
//      postData('/EntService/UpdateResumeFolder', data).then((res) => {
//        console.log(res)
//        this.$toast.success('提交成功')
//        this.isSend = true
//        this.resData.RE01_CHG_TIME = myModule.handleTime(res.ReturnData.RE01_CHG_TIME)
//      })
    },
    /**
     * 监听弹窗关闭
     */
    closePop (obj) {
      if (!obj.value.id) {
        console.log('没有返回值')
        this.showPop = false
        return
      }
      this.showPop = false
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      const data = {
        id: this.id,
        folder: obj.value.id
      }
      postData('/EntService/UpdateResumeFolder', data).then((res) => {
        console.log(res)
        this.$toast.success('提交成功')
        this.isSend = true
      })
    }
  },

  created () {
    this.$toast.loading({
      mask: false,
      message: '加载中...',
      duration: 0,
      forbidClick: true // 禁用背景点击
    })
    const param = myModule.getUrlParams()
    this.id = param.id
    postData('/EntService/ResumeDetails', {id: this.id}).then((res) => {
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
      this.$toast.clear()
      this.resData = res.ReturnData
      this.resData.RE23_CAN_WORK_TIME = myModule.handleTime(this.resData.RE23_CAN_WORK_TIME, false)
    })
//    postData('/EntService/MyWorkExperience', {id: this.id}).then((res) => {
//      console.log(res)
//      if (myModule.isEmpty(res.ReturnData)) {
//        console.log('暂无数据')
//        this.$toast.fail({
//          mask: false,
//          message: '暂无数据',
//          forbidClick: true // 禁用背景点击
//        })
//        return
//      }
//      this.workExperienceData = res.ReturnData
//      this.workExperienceData.RE02_BEGIN_DATE = myModule.handleTime(this.workExperienceData.RE02_BEGIN_DATE)
//      this.workExperienceData.RE02_END_DATE = myModule.handleTime(this.workExperienceData.RE02_END_DATE)
//    })
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
  .action-box {
    padding-top: 20px;
    padding-bottom: 20px;
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
  .p10 {
    width: 100%;
  }
  .action-box {
    @include defaultFlex;
    margin: 40px 0 50px;
    button {
      background-color: $mainColor;
      border-color: $mainColor;
      /*width: 98px;*/
      /*height: 43px;*/
    }
  }
  .btnClass {
    @include theBtnColor;
    padding: 0 20px;
  }
</style>
