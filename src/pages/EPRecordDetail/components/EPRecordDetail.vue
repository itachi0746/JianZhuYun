<template>
  <div class="handle">
    <Header @sendHeight="handleHeight" :headerName="headerName" :back="true"></Header>
    <div class="body" ref="body">
      <div v-if="resData">
        <div class="header van-hairline--bottom">
          <van-row>
            <van-col span="19">
              <div class="data-box">
                <div class="data-name">{{resData.RE34_NAME}}</div>
                <div class="data-line">申请职位 {{resData.RE34_POSITION}}</div>
                <div class="data-line2">{{resData.RE34_SEND_DATE}}</div>
              </div>
            </van-col>
            <van-col span="5">
              <div class="data-box-r">
                <div class="data-head">
                  <UserHead :theUrl="resData.RE34_PIC_URL"></UserHead>
                  <!--<img src="../../../component/assets/default_head_pr.png" alt="">-->
                </div>
                <van-button class="btnStyle" plain type="primary" @click="clickCheck">查看简历</van-button>
              </div>
            </van-col>
          </van-row>
        </div>
        <div class="main" v-if="resData.RE34_LETTER">
          <div class="main-title">
            自荐信
          </div>
          <div class="main-field">
            {{resData.RE34_LETTER}}
          </div>
        </div>
        <div class="action-box" v-if="resData.RE34_STATUS!=='BD0904' && resData.RE34_STATUS!=='BD0909'">
          <van-row class="theRow">
            <van-col span="8">
              <div class="btn-box">
                <van-button class="btnClass" type="info" @click.native="clickRefuse">拒绝</van-button>
              </div>
            </van-col>
            <van-col span="8">
              <div class="btn-box">
                <van-button class="btnClass" type="info" @click.native="clickAccept">同意</van-button>
              </div>
            </van-col>
            <van-col span="8">
              <div class="btn-box">
                <van-button class="btnClass" type="info" @click.native="clickWait">待定</van-button>
              </div>
            </van-col>
          </van-row>
        </div>
        <ResultItem
          :statusCode="resData.RE34_STATUS"
          :status="resData.ReferenceValues.RE34_STATUS"
          :theTime="resData.RE34_CHG_TIME"
        ></ResultItem>
      </div>
    </div>

  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Header from '../../../component/Header.vue'
import UserHead from '../../../component/UserHead.vue'
import ResultItem from '../../../component/ResultItem.vue'

export default {
  data () {
    return {
      headerName: '申请处理',
      value: '',
      id: null,
      resData: null
    }
  },

  components: {
    Header,
    UserHead,
    ResultItem
  },

  computed: {},

  methods: {
    handleHeight () {
    },
    clickRefuse () {
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      const data = {
        id: this.id,
        type: 'BD0909',
        note: ''
      }
      postData('/EntService/UpdateApplyStatus', data).then((res) => {
        console.log(res)
        this.$toast.success('提交成功')
        this.resData.RE34_STATUS = res.ReturnData.RE34_STATUS
        this.resData.ReferenceValues.RE34_STATUS = res.ReturnData.ReferenceValues.RE34_STATUS
        this.resData.RE34_CHG_TIME = myModule.handleTime(res.ReturnData.RE34_CHG_TIME)
      })
    },
    clickAccept () {
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      const data = {
        id: this.id,
        type: 'BD0904',
        note: ''
      }
      postData('/EntService/UpdateApplyStatus', data).then((res) => {
        console.log(res)
        this.$toast.success('操作成功, 请到人才库查看记录')
        this.resData.RE34_STATUS = res.ReturnData.RE34_STATUS
        this.resData.ReferenceValues.RE34_STATUS = res.ReturnData.ReferenceValues.RE34_STATUS
        this.resData.RE34_CHG_TIME = myModule.handleTime(res.ReturnData.RE34_CHG_TIME)
      })
    },
    clickWait () {
      this.$router.go(-1)
    },
    clickCheck () {
//      this.$router.push({name: 'ResumeDetail', params: {id: this.resData.RE34_CANDIDATE_ID}})
//      GoToPage('', 'resumeDetail.html', {id: this.resData.RE34_CANDIDATE_ID})
      GoToPage('', 'EPResumeDetail.html', {id: this.resData.RE34_RCV_ID, FromType: 'RE34_RESUME_RCV'})
    }
  },

  created () {
    const param = myModule.getUrlParams()
    this.id = param.id
    postData('/EntService/ApplyDetials', {id: this.id}).then((res) => {
      console.log(res)
      if (myModule.isEmpty(res.ReturnData)) {
        console.log('暂无数据')
        this.$toast.fail({
          mask: false,
          message: '暂无数据, 正在为您跳转',
          forbidClick: true // 禁用背景点击
        })
        setTimeout(() => {
          this.$router.replace({name: 'EPRecord', params: {}})
        }, 1000)
        return
      }
      this.resData = res.ReturnData
      this.resData.RE34_SEND_DATE = myModule.handleTime(this.resData.RE34_SEND_DATE)
      this.resData.RE34_CHG_TIME = myModule.handleTime(res.ReturnData.RE34_CHG_TIME)
    })
  },

  mounted () {
    console.log(myModule)
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
  }
  .data-box {
    display: flex;
    flex-direction: column;
  }
  .data-name {
    @include font-size(25px);
    color: #323233;
    margin-top: 17px;
    margin-bottom: 5px;
    font-weight: bold;
  }
  .data-line {
    @include font-size(15px);
    margin: 5px 0;
  }
  .data-line2 {
    @include font-size(15px);
  }
  .data-head {
    width: 53px;
    height: 53px;
    /*background-color: #999999;*/
    border-radius: 50%;
    margin-bottom: 10px;
  }
  .data-box-r {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .btnStyle {
    color: $mainColor;
    border-color: $mainColor;
    padding: 0;
    width: 73px;
    height: 25px;
    line-height: 0;
  }
  .header {
    padding-bottom: 20px;
  }
  .main {
    padding: 20px 0;
  }
  .main-title {
    color: #323233;
    margin-bottom: 10px;
  }
  .main-field {
    @include borderBox();
    background-color: #F5F9FA;
    border-radius: 5px;
    height: 273px;
    padding: 10px;
    @include font-size(22px);
    overflow-y: auto;
  }
  .action-box {
    margin-top: 25px;
    display: flex;
    justify-content: space-between;
  }
  .btnClass {
    @include theBtnColor;
    padding: 0 20px;
  }
  .theRow {
    width: 100%;
  }
  .btn-box {
    display: flex;
    justify-content: center;
    width: 100%;
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
