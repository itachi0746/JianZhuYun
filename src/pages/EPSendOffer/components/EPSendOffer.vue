<template>
  <div class="handle">
    <Header @sendHeight="handleHeight" :headerName="headerName" :back="true"></Header>
    <div class="body" ref="body">
      <div v-if="resData">
        <div class="header van-hairline--bottom">
          <van-row>
            <van-col span="19">
              <div class="data-box">
                <div class="data-name">{{resData.RE32_CANDIDATE_NAME}}</div>
                <!--<div class="data-line">申请职位 建筑电工</div>-->
              </div>
            </van-col>
            <van-col span="5">
              <div class="data-box-r">
                <UserHead :theUrl="resData.RE32_PIC_URL"></UserHead>
                <!--<div class="data-head">-->
                  <!--<img src="../../../component/assets/default_head_pr.png" alt="">-->
                <!--</div>-->
                <!--<van-button class="btnStyle" plain type="primary" @click="clickBtn">查看简历</van-button>-->
              </div>
            </van-col>
          </van-row>
        </div>
        <div class="main">
          <!--<div class="main-title">-->
            <!--自荐信-->
          <!--</div>-->
          <div class="main-field">
            <van-field type="textarea" v-model="value" placeholder="请编辑您的offer邀请内容(最少10字)" />
          </div>
        </div>
        <div class="result" v-if="isSend">
          <div class="result-logo">
            <img src="../assets/accept.png" alt="">
          </div>
          <div class="result-msg">已发送</div>
          <div class="result-data">{{changeTime}}</div>
        </div>
        <div class="action-box" v-else>
          <van-row class="theRow">
            <van-col span="12">
              <div class="btn-box">
                <van-button :disabled="value.length<=10" class="btnClass" type="info" @click.native="clickSend">发送</van-button>
              </div>
            </van-col>
            <van-col span="12">
              <div class="btn-box">
                <van-button class="btnClass" type="info" @click.native="clickBack">返回</van-button>
              </div>
            </van-col>
          </van-row>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Header from '../../../component/Header.vue'
import UserHead from '../../../component/UserHead.vue'

export default {
  data () {
    return {
      headerName: '发送offer',
      value: '',
      id: null,
      resData: null,
      isSend: false,
      pageId: 2,
      changeTime: null
    }
  },

  components: {
    Header,
    UserHead
  },

  computed: {},

  methods: {
    handleHeight () {
    },
    clickSend () {
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      const data = {
        id: this.id,
        note: this.value
      }
      postData('/EntService/SendOffer', data).then((res) => {
        console.log(res)
        this.$toast.success('提交成功')
        this.isSend = true
        this.changeTime = myModule.handleTime(res.ReturnData.RE32_CHG_TIME)
        setTimeout(() => {
          GoToPage('', 'EPPeopleDB.html', {pageid: this.pageId})
        }, 1000)
      })
    },
    clickBack () {
      window.history.back()
//      GoToPage('', 'EPPeopleDB.html', {pageid: this.pageId})
    }
  },

  created () {
    const param = myModule.getUrlParams()
    this.id = param.id
//    this.id = this.$route.params.id
    postData('/EntService/OfferDetials', {id: this.id}).then((res) => {
      console.log(res)
      if (myModule.isEmpty(res.ReturnData)) {
        console.log('暂无数据')
        this.$toast.fail({
          mask: false,
          message: '暂无数据',
          forbidClick: false // 禁用背景点击
        })
        setTimeout(() => {
          GoToPage('', 'EPPeopleDB.html', {pageid: this.pageId})
        }, 2000)
        return
      }
      this.resData = res.ReturnData
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
    @include font-size(22px);
    color: #323233;
    margin-top: 17px;
    margin-bottom: 5px;
    font-weight: bold;
  }
  .data-line {
    @include font-size(14px);
    margin: 5px 0;
  }
  .data-head {
    width: 53px;
    height: 53px;
    background-color: #999999;
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
    /*padding: 15px;*/
    background-color: #F5F9FA;
    border-radius: 10px;
    height: 273px;
    overflow-y: auto;
    @include borderBox();
    @include font-size(19px);
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
    margin-top: 20px;
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
  .van-cell {
    background-color: #F5F9FA;
    height: 100%;
  }
  .van-field__body {
    height: 100%;
  }
  .van-field--min-height .van-field__control {
    height: 100%;
  }
</style>
