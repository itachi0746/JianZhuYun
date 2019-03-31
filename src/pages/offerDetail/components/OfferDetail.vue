<template>
  <div v-if="resData">
    <Header @sendHeight="handleHeight" :headerName="headerName"></Header>
    <div class="body" ref="body">
      <div>
        <div class="header">
          <div>{{resData.RE32_SEND_ENT_NAME}}</div>
          <div>{{resData.RE32_CRT_TIME}}</div>
        </div>
        <div class="main">
          {{resData.RE32_OFFER_CONTENT}}
        </div>
        <div class="btn-box" v-if="resData.RE32_STATUS==='BD0902'">
          <van-button type="default" @click="clickRefuse">拒绝</van-button>
          <van-button type="info" @click="clickAccept">接受</van-button>
        </div>
      </div>
    </div>
    <div class="result" v-if="resData.RE32_STATUS==='BD0903'">
      <div class="result-logo">
        <img src="../assets/accept.png" alt="">
      </div>
      <div class="result-msg">入职邀请已接受</div>
      <div class="result-data">{{resData.RE32_CRT_TIME}}</div>
    </div>
    <div class="result" v-if="resData.RE32_STATUS==='BD0904'">
      <div class="result-logo">
        <img src="../assets/refuse.png" alt="">
      </div>
      <div class="result-msg">入职邀请拒绝</div>
      <div class="result-data">{{resData.RE32_CRT_TIME}}</div>
    </div>
    <van-dialog
      v-model="showDialog"
      show-cancel-button
      :before-close="beforeClose"
    >
      <div class="reason-box">
        <div class="reason-title">理由</div>
        <textarea class="reason" name="reason" id="reason" cols="" rows=""></textarea>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Header from '../../../component/Header.vue'

export default {
  name: 'message',
  data () {
    return {
      headerName: 'offer详情',
      headerHeight: null,
      showDialog: false,
      id: null,
      resData: null
    }
  },
  components: {
    Header
  },
  mounted () {
    console.log(myModule)
  },
  created () {
    const params = myModule.getUrlParams()
    this.id = params.id
    postData('/ReService/OfferDetials', {id: this.id}).then((res) => {
      console.log(res)
      this.resData = res.ReturnData
      let theTS = myModule.formatDate(this.resData.RE32_CRT_TIME)
      this.resData.RE32_CRT_TIME = myModule.formatTime(theTS)
    })
  },
  methods: {
    /**
     * 处理header,footer的高度
     */
    handleHeight (height) {
      //      this.headerHeight = height.headerHeight
      //      if (this.headerHeight) {
      //        const WH = myModule.getClientHeight()
      //        this.$refs.body.style.height = WH - this.headerHeight + 'px'
      //      }
    },
    /**
     * 点击拒绝
     */
    clickRefuse () {
      this.showDialog = true
      this.resData.RE32_STATUS = 'BD0904'
    },
    clickAccept () {
      this.resData.RE32_STATUS = 'BD0903'
    },
    beforeClose () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .body {
    padding: 20px 18px;
    @include font-size(16px);
    color: #666;
    /*background-color: #F5F9FA;*/
    /*overflow-y: auto;*/
    /*-webkit-overflow-scrolling: touch;!* 解决ios滑动不流畅问题 *!*/
  }

  .header {
    @include font-size(15px);
  }

  .header div:nth-child(1) {
    color: #000;
    font-weight: bold;
    @include font-size(18px);
  }

  .main {
    height: 225px;
    padding: 15px;
    @include borderBox();
    margin-top: 10px;
    margin-bottom: 50px;
    width: 100%;
    background-color: #F5F9FA;
    border-radius: 10px;
  }

  .btn-box {
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
