<template>
  <div class="profile">
    <Header @sendHeight="handleHeight" :headerName="headerName" :search="true"></Header>
    <!--<div class="body" ref="body">-->
      <!--<div class="job-list">-->
        <!--<ul>-->
          <!--<li class="job-li">-->
            <!--<div class="manItem">-->
              <!--<div class="man-box">-->
                <!--<div class="man-head">-->
                <!--</div>-->
                <!--<div class="man-data">-->
                  <!--<div class="man-name">-->
                    <!--蔡明宏-->
                  <!--</div>-->
                  <!--<div class="man-tag1-box">-->
                    <!--<div class="man-tag1">申请建筑电工</div>-->
                  <!--</div>-->
                  <!--<div class="man-tag1-box">-->
                    <!--<div class="man-tag1">2019-3-27 08:30</div>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="action-box">-->
                  <!--<div class="status">未接受</div>-->
                  <!--<div class="action-btn">-->
                    <!--<van-button class="btnSize" type="info" @click="clickHandle">处理</van-button>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
    <!--</div>-->
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
                    <div class="status">{{item.ReferenceValues.RE34_STATUS}}</div>
                    <div class="action-btn" v-if="item.RE34_STATUS==='BD0902'">
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
    <Footer @sendHeight="handleHeight" :active="activeNum" :enterprise="true"></Footer>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Footer from '../../../component/Footer.vue'
import Header from '../../../component/Header.vue'

export default {
  name: 'profile',
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
      isLoading: false
    }
  },
  components: {
    Footer,
    Header
  },
  mounted () {
    console.log(myModule)
  },
  created () {
    postData('/EntService/MyApplys', {}).then((res) => {
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
      this.resData.RE34_SEND_DATE = myModule.handleTime(this.resData.RE34_SEND_DATE)
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
      this.$router.push({name: 'Handle', params: {id: id}})
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
      const data = {
        PageIndex: this.PageIndex
      }
      //      postData('/ReService/SearchPosition', data).then((res) => {
      //        console.log(res)
      //        this.resData = this.resData.concat(res.ReturnData)
      //        this.PageCount = res.PageCount
      //        this.PageIndex = res.PageIndex
      //        this.loading = false
      //      })
    },
    onRefresh () {
      //      setTimeout(() => {
      //        this.$toast('刷新成功')
      //        this.isLoading = false
      //      }, 500)
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
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background-color: #969799;
    margin-right: 10px;
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
      margin-top: 10px;
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
  }

  .man-tag1 {
    margin-right: 5px;
    padding-right: 5px;
  }
  .btnSize {
    height: 25px;
    line-height: 0;
    padding: 5px 13px;
    @include theBtnColor
  }

</style>
