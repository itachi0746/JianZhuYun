<template>
  <div class="profile">
    <Header @sendHeight="handleHeight" :headerName="headerName" :search="true"></Header>
    <div class="filter van-hairline--bottom" v-show="false">
      <van-row>
        <van-col :span="24/filterItems.length" v-for="(item, index) in filterItems" :key="index">
          <div class="filter-cell-box">
            <div class="van-hairline--right">
              <div class="filter-cell">{{item.name}}</div>
              <van-icon class="filter-icon normal-icon" name="play"/>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" id="body" class="body" ref="body">
      <van-list
        v-model="loading"
        :finished="finished"
        :offset="100"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="job-list" v-if="resData">
          <ul>
            <li class="job-li" v-for="(item,index) in resData" :key="index" @click="clickJob(item.RE13_ID)">
              <JobItem :jobData="item"></JobItem>
            </li>
          </ul>
        </div>
      </van-list>
    </van-pull-refresh>
    <Footer @sendHeight="handleHeight" :active="activeNum"></Footer>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Footer from '../../../component/Footer.vue'
import Header from '../../../component/Header.vue'
import JobItem from '../../../component/JobItem.vue'

export default {
  data () {
    return {
      headerName: '职位',
      activeNum: 0,
      headerHeight: null,
      footerHeight: null,
      filterItems: [
        {name: '推荐'},
        {name: '广州'},
        {name: '公司'},
        {name: '要求'}
      ],
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
    Header,
    JobItem
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
//      this.$refs.body.style.height = WH - this.headerHeight - this.footerHeight + 'px'
      }
    },
    /**
     * 点击职位
     * @param id 职位id
     */
    clickJob (id) {
      GoToPage('jobDetail', 'jobDetail.html', {id: id})
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
//      window.location.reload()
//      setTimeout(() => {
//        this.$toast('刷新成功')
//        this.isLoading = false
//      }, 500)
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
      postData('/ReService/SearchPosition', data).then((res) => {
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
        this.isLoading = false
        this.resData = this.resData === null ? res.ReturnData : this.resData.concat(res.ReturnData)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .body {
    /*font-family: myFont, sans-serif;*/
    background-color: #F5F9FA;
    overflow-y: auto;overflow-x: hidden;
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
    .job-name {
      color: #333;
      font-weight: bold;
    }
    .job-pay {
      color: #067FCC;
      text-align: right;
      @include font-size(14px)
    }
    .job-remarks {
      @include font-size(14px);
      padding: 5px 0;
      ul {
        overflow: hidden;
      }
    }
    .job-remarks-li {
      float: left;
      margin-right: 5px;
    }
    .job-tag {
      padding: 5px 0;
      color: #999;
    }
    .job-HR {
      padding-top: 5px;
      color: #666;
      display: flex;
      align-items: center;
      @include font-size(14px)
    }
    .HR-head {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #969799;
      margin-right: 6px;
    }

  }
</style>
