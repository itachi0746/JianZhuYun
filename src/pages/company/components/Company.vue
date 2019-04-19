<template>
  <div class="profile">
    <Header @sendHeight="handleHeight" :headerName="headerName"></Header>
    <div class="filter van-hairline--bottom" v-show="false">
      <van-row>
        <van-col :span="24/filterItems.length" v-for="(item, index) in filterItems" :key="index">
          <div class="filter-cell-box">
            <div class="van-hairline--right">
              <div class="filter-cell">{{item.name}}</div>
              <van-icon class="filter-icon normal-icon" name="play" />
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
    <!--<div class="body" ref="body">-->
    <van-pull-refresh v-model="isLoading" disabled @refresh="onRefresh" id="body" class="body" ref="body">
      <van-list
        v-model="loading"
        :finished="finished"
        :offset="100"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="company-list" v-if="resData">
          <ul>
            <li class="company-list-li" v-for="(item, index) in resData" :key="index" @click="clickCompany(item.HRA0_ENTERPRISE_ID)">
              <CompanyItem :item="item"></CompanyItem>
            </li>
          </ul>
        </div>
      </van-list>
    </van-pull-refresh>
    <!--</div>-->
    <Footer @sendHeight="handleHeight" :active="activeNum"></Footer>
  </div>
</template>

<script>
import myModule from '../../../common'
import {postData} from '../../../common/server'
import Footer from '../../../component/Footer.vue'
import Header from '../../../component/Header.vue'
import CompanyItem from '../../../component/companyItem.vue'

export default {
  name: 'profile',
  data () {
    return {
      headerName: '公司',
      activeNum: 1,
      headerHeight: null,
      footerHeight: null,
      filterItems: [
        {name: '融资'},
        {name: '规模'},
        {name: '行业'}
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
    CompanyItem
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
      }
    },
    /**
     * 点击公司
     * @param id
     */
    clickCompany (id) {
      GoToPage('', 'companyDetail.html', {id: id})
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
      postData('/ReService/SearchCompany', data).then((res) => {
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
  .company-list {
    .company-list-li {
      padding: 15px 18px;
      /*display: flex;*/
      background-color: #fff;
      margin-bottom: 8px;
      @include font-size(16px);
    }
    .li-line {
      display: flex;
    }
    .c-head {
      min-width: 46px;
      height: 46px;
      border-radius: 5px;
      /*background-color: #999999;*/
      margin-right: 10px;
    }
    .c-head-box {
      width: 46px;
      height: 46px;
    }
    .c-data {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .c-name {
      @include font-size(16px);
      font-weight: bold;
      color: #333;
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
</style>
