<template>
  <div class="message">
    <Header @sendHeight="handleHeight" :headerName="headerName"></Header>

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" id="body" class="body" ref="body">
      <van-list
        v-model="loading"
        :finished="finished"
        :offset="100"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="message-list" v-if="resData">
          <ul>
            <li class="message-li" v-for="(item,index) in resData" :key="index" @click="clickLi(item.RE41_OBJ_ID,item.RE41_OBJ_CODE,item.RE41_MSG_ID)">
              <EPMSGItem :resData="item" :enterprise="true"></EPMSGItem>
            </li>
          </ul>
        </div>
      </van-list>
    </van-pull-refresh>
    <div v-if="infoNum!==null">
      <Footer @sendHeight="handleHeight" :active="activeNum" :infoNum="infoNum" :enterprise="true"></Footer>
    </div>
    <!--<Footer v-if="resData" @sendHeight="handleHeight" :active="activeNum" :infoNum="infoNum"></Footer>-->
  </div>
</template>

<script>
import myModule from '../../../common'
import {postData} from '../../../common/server'
import Footer from '../../../component/Footer.vue'
import Header from '../../../component/Header.vue'
import MSGItem from '../../../component/MSGItem.vue'
import EPMSGItem from '../../../component/EPMSGItem.vue'

export default {
  name: 'message',
  data () {
    return {
      headerName: '消息',
      activeNum: 2,
      infoNum: null, // 未读信息数量
      headerHeight: null,
      footerHeight: null,
      PageIndex: 1, // 记录当前第几页
      PageCount: null, // 总页数
      resData: null,
      loading: false,
      finished: false,
      isLoading: false,
      dataMap: { // todo 还有映射
        'RE34_RESUME_RCV': 'EPRecordDetail.html',
        'RE37_INTERVIEW_MSG': 'EPInterviewDetail.html',
        'RE32_OFFER_MSG': 'EPOfferDetail.html',
        'RE33_SIGN_CONTRACT': 'EPContractDetail.html'
      }
    }
  },
  components: {
    Footer,
    Header,
    MSGItem,
    EPMSGItem
  },
  mounted () {
    console.log(myModule)
  },
  created () {
//    const param = myModule.getUrlParams()
//    if (!param.enterprise) {
//      console.log(`没有enterprise参数: ${param}`)
//      return
//    }
//    this.enterprise = eval(param.enterprise)
    this.getData()
  },
  methods: {
    /**
     * 处理header,footer的高度
     */
    handleHeight (height) {
//      console.log(height)
      if (height.headerHeight) {
        this.headerHeight = height.headerHeight
      } else {
        this.footerHeight = height.footerHeight
      }
      if (this.headerHeight && this.footerHeight) {
        const WH = myModule.getClientHeight()
        let body = document.getElementById('body')
        body.style.height = WH - this.headerHeight - this.footerHeight + 'px'
      }
    },
    /**
     * 点击职位
     * @param linkId 链接 id
     * @param code
     * @param msgId 消息id
     */
    clickLi (linkId, code, msgId) {
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      const data = {
        id: msgId
      }
      postData('/EntService/UpdateMessageReadState', data).then((res) => {
        console.log(res)
        this.$toast.clear()
        const link = this.dataMap[code]
        // debugger
        if (!link) {
          this.$toast.fail('没有对应链接')
          return
        }
        GoToPage('', link, {id: linkId})
      })
//      this.updateMsg(msgId)
    },
    updateMsg (msgId) {

    },
    onLoad () {
      // 异步更新数据
      if (this.PageCount === this.PageIndex) { // 加载完全部了
        this.finished = true
        this.loading = false
        return
      }
      this.PageIndex++
      this.getData()
    },
    onRefresh () {
      this.PageIndex = 1
      this.PageCount = null
      this.resData = null
      this.getData()
    },
    getData () {
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      const data = {
        PageIndex: this.PageIndex
      }
      let link = '/EntService/MyMessages'
      postData(link, data).then((res) => {
        console.log(res)
        if (myModule.isEmpty(res.ReturnData)) {
          console.log('暂无数据')
          this.$toast.fail({
            mask: false,
            message: '暂无数据',
            forbidClick: false // 禁用背景点击
          })
          this.infoNum = res.UnReadCount
          return
        }
        this.$toast.clear()
        this.infoNum = res.UnReadCount
        this.PageCount = res.PageCount
        this.PageIndex = res.PageIndex
        this.loading = false
        this.isLoading = false
        this.resData = this.resData === null ? res.ReturnData : this.resData.concat(res.ReturnData)
        for (let obj of this.resData) {
          obj = myModule.formatObj(obj, true)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .body {
    background-color: #F5F9FA;
    overflow-y: auto;overflow-x: hidden;
    -webkit-overflow-scrolling: touch;/* 解决ios滑动不流畅问题 */
  }
  .message-li {
    /*display: flex;*/
    @include borderBox();
    padding: 15px 18px 0;
    @include font-size(15px);
    color: #999;
    background-color: #fff;
  }
  .msg-li-box {
    display: flex;
    padding-bottom: 13px;
  }
  .msg-head {
    margin-right: 16px;
    min-width: 47px;
    width: 47px;
    height: 47px;
    border-radius: 50%;
    background-color: #999;
  }
  .msg-data {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
  }
  .msg-data div:nth-child(1) {
    color: #333;
    @include font-size(18px);
  }
  .msg-time {
    max-width: 60px;
    @include font-size(14px);
  }
</style>
