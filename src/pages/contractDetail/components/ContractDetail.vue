<template>
  <div class="contractDetail">
    <Header @sendHeight="handleHeight" :headerName="headerName" :back="true"></Header>
    <div class="body" ref="body">
      <div v-if="resData">
        <div>
          <ContractItem :resData="resData" :enterprise="false"></ContractItem>
        </div>
        <div class="action-box" v-if="resData.RE33_STATUS==='BD0903' || resData.RE33_STATUS==='BD0902'">
          <van-button type="info" @click.native="clickAccept">接受</van-button>
          <van-button type="info" @click.native="clickRefuse">拒绝</van-button>
        </div>
        <div class="action-box" v-if="resData.RE33_STATUS==='BD0904'">
          <van-button type="info" @click.native="goToSign">去签署</van-button>
          <van-button type="info" @click.native="clickRefuse">拒绝</van-button>
        </div>
        <div v-if="resData.RE33_STATUS==='BD0909'">
          <ResultItem
            :statusCode="resData.RE33_STATUS"
            :status="resData.ReferenceValues.RE33_STATUS"
            :theTime="resData.RE33_CHG_TIME"
          ></ResultItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myModule from '../../../common'
import {postData} from '../../../common/server'
import Header from '../../../component/Header.vue'
import ContractItem from '../../../component/ContractItem.vue'
import ResultItem from '../../../component/ResultItem.vue'

export default {
  data () {
    return {
      headerName: '合同签约',
      headerHeight: null,
      id: null,
      resData: null
    }
  },
  components: {
    Header,
    ContractItem,
    ResultItem
  },
  mounted () {
    console.log(myModule)
  },
  created () {
    const param = myModule.getUrlParams()
    this.id = param.id
    postData('/ReService/ContractDetails', {id: this.id}).then((res) => {
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
//      let theTS = myModule.formatDate(this.resData.RE33_CRT_TIME)
//      this.resData.RE33_CRT_TIME = myModule.formatTime(theTS)
      this.resData = myModule.formatObj(this.resData)
    })
  },
  methods: {
    /**
     * 处理header,footer的高度
     */
    handleHeight (height) {
      this.headerHeight = height.headerHeight
      if (this.headerHeight) {
        const WH = myModule.getClientHeight()
        this.$refs.body.style.height = WH - this.headerHeight + 'px'
      }
    },
    // 拒绝
    clickRefuse () {
      window.history.back()
//      this.resData.RE33_STATUS = 'BD0909'
//      this.resData.ReferenceValues.RE33_STATUS = '已拒绝'
//      this.resData.RE33_CHG_TIME = myModule.formatTime(new Date())
    },
    /**
     * 接受 跳转法大大
     */
    clickAccept () {
      this.resData.RE33_STATUS = 'BD0904'
    },
    /**
     * 去签署
     */
    goToSign () {
      postData('/ReService/GotoSign', {id: this.id}).then((res) => {
        console.log(res)
        if (res.Result) {
          window.location.href = res.Result
        } else {
          console.log('没有链接地址')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .contractDetail {
    @include font-size(16px)
  }
  .body {
    background-color: #F5F9FA;
    overflow-y: auto;overflow-x: hidden;
    -webkit-overflow-scrolling: touch;/* 解决ios滑动不流畅问题 */
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
  .tac {
    text-align: center;
  }
  .title {
    text-align: center;
    @include font-size(16px);
    padding: 10px 15px 0;
    color: $mainColor;
  }
  .title-box {
    padding-bottom: 15px;
    font-weight: bold;
  }
  .value-class {
    flex: 3;
    text-align: left;
    color: #333;
  }
  .title-class {
    color: #666;
  }
  .title-class2 {
    color: #333;
    font-weight: bold;
    @include font-size(17px);
  }
  .mb-box {
    margin-bottom: 15px;
  }
  .action-box {
    padding: 0 70px;
    @include defaultFlex;
    justify-content: space-between;
    margin: 40px 0 50px;
    button {
      background-color: $mainColor;
      border-color: $mainColor;
      width: 98px;
      height: 43px;
    }
  }

</style>
