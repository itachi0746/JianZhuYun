<template>
  <div class="profile">
    <Header :back="true" @sendHeight="handleHeight" :headerName="headerName"></Header>
    <div class="body" ref="body" id="body">
      <div class="company-list" v-if="resData">
        <ul>
          <li class="myOffer-li" v-for="(item, index) in resData" :key="index" @click="clickRecord(item.RE34_RCV_ID)">
            <div class="myOffer-li-box van-hairline--bottom">
              <!--<div class="myOffer-head"></div>-->
              <div class="myOffer-data">
                <div>{{item.RE34_POSITION}}</div>
                <div>{{item.RE34_SEND_DATE}}</div>
              </div>
              <div class="myOffer-time">
                <div class="myOffer-status">{{item.ReferenceValues.RE34_STATUS}}</div>
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
  name: 'profile',
  data () {
    return {
      headerName: '申请记录',
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
    postData('/ReService/MySends', {}).then((res) => {
      console.log(res)
      if (myModule.isEmpty(res.ReturnData)) {
        console.log('暂无数据')
        this.$toast.fail({
          mask: false,
          message: '暂无数据',

          forbidClick: true // 禁用背景点击
        })
        return
      }
      this.resData = res.ReturnData
      if (myModule.isEmpty(this.resData)) {
        console.log('暂无数据')
        return
      }
      //      if (!res.ReturnData || !this.resData.length) {
      //        console.log('暂无数据')
      //        return
      //      }
      for (let item of this.resData) {
        if (!item.RE34_SEND_DATE) {
          console.log('发送日期为空')
          continue
        }
        item.RE34_SEND_DATE = myModule.handleTime(item.RE34_SEND_DATE)
      }
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
      let body = document.getElementById('body')
      body.style.height = WH - this.headerHeight + 'px'
    },
    /**
     * 点击记录
     * @param id
     */
    clickRecord (id) {
      GoToPage('', 'recordDetail.html', {id: id})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .body {
    background-color: #F5F9FA;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch; /* 解决ios滑动不流畅问题 */
  }

  .filter {
    width: 100%;
    background-color: #fff;
  }

  .filter-cell-box {
    @include font-size(14px);
    padding: 10px 0;
    position: relative;
  }

  .filter-cell {
    text-align: center;
    color: #666;
  }

  .filter-icon {
    position: absolute;
    right: 10px;
    top: 2px;
    color: #666;
  }

  .normal-icon {
    transform: rotate(90deg);
  }

  .active-icon {
    transform: rotate(-90deg);
  }

  .company-list {
    .company-list-li {
      padding: 15px 18px;
      /*display: flex;*/
      background-color: #fff;
      margin-bottom: 10px;
      @include font-size(16px);
    }
    .li-line {
      display: flex;
    }
    .c-head {
      min-width: 46px;
      height: 46px;
      border-radius: 5px;
      background-color: #999999;
      margin-right: 10px;
    }
    .c-data {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .c-name {
      @include font-size(18px);
      font-weight: bold;
      color: #000;
      max-width: 100%;
      word-break: break-all; /* 允许单词在任何地方被打破（这里所说的打破是强行折断换行） */
    }
    .c-remarks {
      color: #666;
      @include font-size(16px);
      overflow: hidden;
    }
    .c-remarks-li {
      float: left;
      margin-right: 5px;
    }
    .c-tag {
      overflow: hidden;
      padding: 15px 0;
      li {
        float: left;
        margin-right: 10px;
      }
    }
    .c-msg {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 15px;
      @include font-size(14px);
      color: #999;
    }
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
