<template>
  <div class="">
    <Header :back="true" @sendHeight="handleHeight" :headerName="headerName"></Header>
    <div class="body" ref="body">
      <div v-if="resData">
        <div class="job-header">
          <van-row type="flex" align="center">
            <van-col span="16">
              <div class="job-name">{{resData.RE37_SEND_ENT_NAME}}</div>
            </van-col>
            <van-col span="8">
              <!--<div class="job-pay">{{resData.ReferenceValues.RE37_STATUS}}</div>-->
            </van-col>
          </van-row>
          <div class="send-time">
            发送时间: {{resData.RE37_SEND_TIME}}
          </div>
        </div>
        <div class="main">
          {{resData.RE37_OFFER_CONTENT}}
        </div>
        <div class="btn-box" v-if="resData.RE37_STATUS==='BD0903' || resData.RE37_STATUS==='BD0902'">
          <van-button type="default" @click="clickRefuse">拒绝</van-button>
          <van-button type="info" @click="clickAccept">接受</van-button>
        </div>
        <ResultItem
          :statusCode="resData.RE37_STATUS"
          :status="resData.ReferenceValues.RE37_STATUS"
          :theTime="resData.RE37_CHG_TIME"
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
import ResultItem from '../../../component/ResultItem.vue'

export default {
  name: '',
  data () {
    return {
      headerName: '面试详情',
      headerHeight: null,
      resData: null,
      id: null,
      dataMap: {
        RE13_EDU_DEGREE: '学历要求',
        RE13_POSITION_TYPE: '职位类别',
        RE13_SALARY_REQUIRED: '薪资要求',
        RE13_STATUS: '状态',
        RE13_WORK_PLACE: '工作地点',
        RE13_WORK_PROP: '工作性质',
        RE13_WORK_YEAR: '工作年限'
      },
      detailData: []
    }
  },
  components: {
    Header,
    ResultItem
  },
  mounted () {
    console.log(myModule)
  },
  created () {
    const params = myModule.getUrlParams()
    this.id = params.id
    postData('/ReService/InverviewDetials', {id: this.id}).then((res) => {
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
      this.resData = myModule.formatObj(this.resData)
    })
  },
  methods: {
    /**
     * 处理header,footer的高度
     */
    handleHeight (height) {
      console.log(height)
      if (height.headerHeight) {
        this.headerHeight = height.headerHeight
      }
      const WH = myModule.getClientHeight()
      this.$refs.body.style.height = WH - this.headerHeight + 'px'
    },
    /**
     * 把描述发在detailData
     * @param dataObj
     */
    handleDetail (dataObj) {
      let me = this
      for (let key in dataObj) {
//        console.log(key)
        const obj = {
          key: me.dataMap[key],
          value: dataObj[key]
        }
        this.detailData.push(obj)
      }
    },
    /**
     * 点击拒绝
     */
    clickRefuse () {
      this.$toast.loading({
        mask: true,
        message: '加载中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续展示 toast
      })
      const data = {
        id: this.id,
        note: ''
      }
      postData('/ReService/RejectInverview', data).then((res) => {
        console.log(res)
        this.actionCB()
      })
    },
    clickAccept () {
      this.$toast.loading({
        mask: true,
        message: '加载中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续展示 toast
      })
      const data = {
        id: this.id,
        note: ''
      }
      postData('/ReService/AcceptInverview', data).then((res) => {
        console.log(res)
        this.actionCB()
      })
    },
    actionCB () {
      this.$toast.success({
        mask: false,
        message: '提交成功',
        forbidClick: true, // 禁用背景点击
        duration: 2000 // 持续展示 toast
      })
      setTimeout(() => {
        window.history.back()
      }, 2000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .body {
    background-color: #fff;
    overflow-y: auto;overflow-x: hidden;
    -webkit-overflow-scrolling: touch; /* 解决ios滑动不流畅问题 */
    padding: 0 18px;
  }

  .btn {
    @include theBtnColor;
  }

  footer {
    @include font-size(16px);
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px;
    width: 100%;
    @include borderBox()
  }

  .job-desc {
  }

  .job-desc-title {
    @include font-size(16px);
    color: #333;
    font-weight: bold;
    padding: 10px 0;
  }

  .job-desc-main {
    color: #666;
    @include font-size(16px);
    padding: 10px;
  }

  .desc-name {
    @include font-size(18px);
    color: $mainColor;
    margin-bottom: 5px;
  }

  .desc-value {
    text-indent: 2em;
    @include font-size(16px);
  }

  .job-header {
    @include font-size(16px);
    padding: 15px 0;
  }

  .job-pay {
    color: $mainColor;
    text-align: right;
  }

  .desc-item {
    margin-top: 10px;
  }
  .btn-box {
    /*margin-top: 15px;*/
    padding: 0 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      width: 98px;
      height: 43px;
      border-color: $mainColor;
      @include font-size(17px)
    }
    button:nth-child(2) {
      background-color: $mainColor;
    }
  }

  .reason-box {
    padding: 10px;
  }

  .reason-title {
    /*padding: 10px;*/
    @include font-size(16px);
    margin-bottom: 5px;
  }

  .reason {
    /*padding: 10px;*/
    background-color: #F5F9FA;
    width: 100%;
    height: 130px;
    border: none;
    padding: 15px 11px;
    color: #999;
    @include font-size(15px);
    @include borderBox();
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
  .main {
    height: 352px;
    padding: 15px;
    @include borderBox();
    margin-top: 10px;
    margin-bottom: 35px;
    width: 100%;
    background-color: #F5F9FA;
    border-radius: 10px;
    @include font-size(19px);
    overflow-y: auto;
  }
  .send-time {
    /*@include font-size(16px);*/
    @include font-size(14px);
    color: #666;
  }
  .job-name {
    @include font-size(22px);
    color: #333;
    font-weight: bold;
  }
</style>
