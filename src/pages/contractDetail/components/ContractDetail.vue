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
        <div class="action-box2" v-if="resData.RE33_STATUS==='BD0904'">
          <van-button type="info" @click.native="goToSign">去签署</van-button>
          <!--<van-button type="info" @click.native="clickReturn">返回</van-button>-->
        </div>
        <div class="action-box2" v-if="resData.RE33_STATUS==='BD0907'">
          <!--<van-button type="info" @click.native="clickDownload">下载合同</van-button>-->
          <van-button type="info" @click.native="clickView">查看合同</van-button>
        </div>
        <!--BD0909 是拒绝-->
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
      headerName: '合同详情',
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
      this.$dialog.confirm({
        title: '温馨提示',
        message: '确定要拒绝签约吗?'
      }).then(() => {
        // on confirm
        this.$toast.loading({
          mask: false,
          message: '正在加载...',
          duration: 0,
          forbidClick: true // 禁用背景点击
        })
        const data = {
          id: this.id,
          note: ''
        }
        postData('/ReService/RejectContract', data).then((res) => {
          console.log(res)
          this.$toast.success({
            mask: false,
            message: '操作成功, 正在为您刷新页面',
            forbidClick: true, // 禁用背景点击
            duration: 1000 // 持续展示 toast
          })
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        })
      }).catch(() => {
        // on cancel
      })
    },
    /**
     * 接受 显示去签署按钮
     */
    clickAccept () {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '确定要接受签约吗?'
      }).then(() => {
        // on confirm
        this.$toast.loading({
          mask: false,
          message: '正在加载...',
          duration: 0,
          forbidClick: true // 禁用背景点击
        })
        const data = {
          id: this.id,
          note: ''
        }
        postData('/ReService/AcceptContract', data).then((res) => {
          console.log(res)
          this.$toast.success({
            mask: false,
            message: '操作成功, 正在为您刷新页面',
            forbidClick: true, // 禁用背景点击
            duration: 1000 // 持续展示 toast
          })
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        })
      }).catch(() => {
        // on cancel
      })
    },
    // 点击 返回按钮
    clickReturn () {
      this.resData.RE33_STATUS = 'BD0903'
    },
    // 下载合同
    clickDownload () {
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      const data = {id: this.id}
      postData('/ReService/DownloadContract', data).then((res) => {
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
      })
    },
    // 查看合同
    clickView () {
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      const data = {id: this.id}
      postData('/ReService/ViewContract', data).then((res) => {
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
      })
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
  .action-box2 {
    padding: 0 70px;
    @include defaultFlex;
    /*justify-content: space-between;*/
    margin: 40px 0 50px;
    button {
      background-color: $mainColor;
      border-color: $mainColor;
      width: 98px;
      height: 43px;
    }
  }

</style>
