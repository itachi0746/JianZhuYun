<template>
  <div class="profile">
    <Header @sendHeight="handleHeight" :headerName="headerName" :search="false" :back="true"></Header>
    <van-pull-refresh v-model="isLoading" disabled @refresh="onRefresh" id="body" class="body" ref="body">
      <van-list
        v-model="loading"
        :finished="finished"
        :offset="100"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="job-list" v-if="resData">
          <ul>
            <li class="job-li" v-for="(item, index) in resData" :key="index">
              <div class="manItem">
                <div class="man-box">
                  <div class="man-head">
                    <!--<img src="../../../component/assets/default_head_pr.png" alt="">-->
                    <UserHead :theUrl="item.RE34_PIC_URL"></UserHead>
                  </div>
                  <div class="man-data">
                    <div class="man-name">
                      {{item.RE34_NAME}}
                    </div>
                    <div class="man-tag1-box">
                      <div class="man-tag1">申请{{item.RE34_POSITION}}</div>
                    </div>
                    <div class="man-tag1-box">
                      <div class="man-tag1">{{item.RE34_SEND_DATE}}</div>
                    </div>
                  </div>
                  <div class="action-box">
                    <div class="status" :style="{color: colorMap[item.RE34_STATUS]}">{{item.ReferenceValues.RE34_STATUS}}</div>
                    <div class="action-btn" v-if="item.RE34_STATUS==='BD0902' || item.RE34_STATUS==='BD0903'">
                      <van-button class="btnSize" type="info" @click="clickHandle(item.RE34_RCV_ID)">处理</van-button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </van-list>
    </van-pull-refresh>
    <!--<Footer @sendHeight="handleHeight" :active="activeNum" :enterprise="true"></Footer>-->
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Footer from '../../../component/Footer.vue'
import Header from '../../../component/Header.vue'
import UserHead from '../../../component/UserHead.vue'

export default {
  data () {
    return {
      headerName: '申请记录',
      activeNum: 1,
      headerHeight: null,
      footerHeight: null,
      PageIndex: 1, // 记录当前第几页
      PageCount: null, // 总页数
      resData: null,
      loading: false,
      finished: false,
      isLoading: false,
      colorMap: {
        BD0909: '#999',
        BD0904: '#01C0CC',
        BD0903: '#F9514E',
        BD0902: '#F9514E',
        BD0901: '#F9514E'
      }
    }
  },
  components: {
    Footer,
    Header,
    UserHead
  },
  mounted () {
    console.log(myModule)
  },
  created () {
    this.getData()
  },
  methods: {
    /**
     * 处理header,footer的高度
     */
    handleHeight (height) {
      console.log(height)
      if (height.headerHeight) {
        this.headerHeight = height.headerHeight
      } else {
        this.footerHeight = height.footerHeight
      }
      if (this.headerHeight && this.footerHeight) {
        const WH = myModule.getClientHeight()
        let body = document.getElementById('body')
        body.style.height = WH - this.headerHeight - this.footerHeight + 'px'
//        this.$refs.body.style.height = WH - this.headerHeight - this.footerHeight + 'px'
      }
    },
    clickHandle (id) {
      GoToPage('', 'EPRecordDetail.html', {id: id})
//      this.$router.push({name: 'Handle', params: {id: id}})
    },
    onLoad () {
      this.loading = false // 测试

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
      postData('/EntService/MyApplys', data).then((res) => {
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
        this.PageCount = res.PageCount
        this.PageIndex = res.PageIndex
        this.loading = false
        this.resData = this.resData === null ? res.ReturnData : this.resData.concat(res.ReturnData)
        for (let obj of this.resData) {
          obj.RE34_SEND_DATE = myModule.handleTime(obj.RE34_SEND_DATE, true)
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
  .job-list {
    .job-li {
      width: 100%;
      /*height: 140px;*/
      background-color: #fff;
      margin-bottom: 8px;
      padding: 19px 23px;
      @include borderBox();
      color: #666;
      @include font-size(16px)
    }
  }
  .manItem {
    color: #666;
    @include font-size(16px)
  }
  .man-box {
    display: flex;
  }

  .man-head {
    min-width: 46px;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    /*background-color: #969799;*/
    margin-right: 10px;
    display: flex;
    align-items: center;
  }

  .man-data {
    flex: 3;
    display: flex;
    flex-direction: column;
  }
  .man-data>div {
    margin-bottom: 5px;
  }
  .action-box {
    flex: 1;
    /*display: flex;*/
    /*justify-content: flex-end;*/
    /*flex-direction: column;*/
    .status {
      @include font-size(14px);
      color: #F9514E;
      text-align: right;
    }
    .action-btn {
      margin-top: 15px;
      display: flex;
      justify-content: flex-end;
      /*width: 50px;*/
      @include font-size(14px);

    }
  }

  .man-name {
    @include font-size(18px);
    color: #333;
  }

  .man-tag1-box {
    display: flex;
    @include font-size(14px);
    word-break: break-all;
    overflow-wrap: break-word;
  }

  .man-tag1 {
    margin-right: 5px;
    padding-right: 5px;
  }
  .btnSize {
    height: 33px;
    line-height: 33px;
    /*padding: 3px 14px;*/
//    @include btnSize;
    @include theBtnColor
  }

</style>
