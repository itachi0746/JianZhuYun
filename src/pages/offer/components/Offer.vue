<template>
  <div>
    <Header :back="true" @sendHeight="handleHeight" :headerName="headerName"></Header>
    <div class="body" ref="body">
      <div class="myOffer-list" v-if="resData">
        <ul>
          <li class="myOffer-li" v-for="(item, index) in resData" :key="index" @click="clickOffer(item.RE32_OFFER_ID)">
            <div class="myOffer-li-box van-hairline--bottom">
              <div class="myOffer-head"></div>
              <div class="myOffer-data">
                <div>{{item.RE32_SEND_ENT_NAME}}</div>
                <div>{{item.RE32_CRT_TIME}}</div>
              </div>
              <div class="myOffer-time">
                <div class="myOffer-status">{{item.ReferenceValues.RE32_STATUS}}</div>
                <van-icon class="" name="arrow"/>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
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
      headerName: '我的 offer',
      headerHeight: null,
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
    postData('/ReService/MyOffers', {}).then((res) => {
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
      for (let obj of this.resData) {
        obj.RE32_CRT_TIME = myModule.handleTime(obj.RE32_CRT_TIME)
      }
    })
  },
  methods: {
    /**
     * 处理header,footer的高度
     */
    handleHeight (height) {
      //      console.log(height)
      this.headerHeight = height.headerHeight
      if (this.headerHeight) {
        const WH = myModule.getClientHeight()
        this.$refs.body.style.height = WH - this.headerHeight + 'px'
      }
    },
    /**
     * 点击offer
     * @param id
     */
    clickOffer (id) {
      GoToPage('', 'offerDetail.html', {id: id})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .body {
    background-color: #F5F9FA;
    overflow-y: auto;overflow-x: hidden;
    -webkit-overflow-scrolling: touch; /* 解决ios滑动不流畅问题 */
  }

  .myOffer-li {
    /*display: flex;*/
    @include borderBox();
    padding: 15px 18px 0;
    @include font-size(15px);
    color: #999;
    background-color: #fff;
  }

  .myOffer-li-box {
    display: flex;
    padding-bottom: 13px;
  }

  .myOffer-head {
    margin-right: 16px;
    min-width: 47px;
    height: 47px;
    border-radius: 5px;
    background-color: #999;
  }

  .myOffer-data {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
  }

  .myOffer-data div:nth-child(1) {
    color: #333;
    @include font-size(18px);
  }

  .myOffer-time {
    max-width: 90px;
    @include font-size(14px);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .myOffer-status {
    color: #F9514E;
    margin-right: 15px;
  }
</style>
