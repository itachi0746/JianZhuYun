<template>
  <div class="profile">
    <div v-if="pageId!==null">
      <Header @changeTab="changeTab" :back="true" :active="pageId" @sendHeight="handleHeight" :search="false"></Header>
    </div>
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
              <Item :item="item" :pageId="pageId"></Item>
            </li>
          </ul>
        </div>
        <!--<div class="job-list">-->
          <!--<ul>-->
            <!--<li class="job-li">-->
              <!--<Item :pageId="pageId"></Item>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Header from '../../../component/DBHeader.vue'
import Item from './Item.vue'

export default {
  name: 'profile',
  data () {
    return {
      headerHeight: null,
      footerHeight: null,
      PageIndex: 1, // 记录当前第几页
      PageCount: null, // 总页数
      resData: null,
      loading: false,
      finished: false,
      isLoading: false,
      curHeadItem: null, // 当前头部active的
      pageMap: { // 不同页面对应的接口
        0: '/EntService/MyResumes',
        1: '/EntService/MyResumes',
        2: '/EntService/MyResumes',
        3: '/EntService/MyResumes',
        4: '/EntService/MyResumes',
        5: '/EntService/MyResumes'
      },
      pageId: null // 页面标识
    }
  },
  components: {
    Header,
    Item
  },
  watch: {
    curHeadItem () { // 头部切换, 就请求
      const theUrl = this.pageMap[this.curHeadItem.id]
      this.pageId = this.curHeadItem.id
      const data = {}
      this.getData(theUrl, data)
    }
  },
  mounted () {
    console.log(myModule)
  },
  created () {
    const param = myModule.getUrlParams()
    if (!param.pageid) {
      console.log('没有pageid')
      this.$toast.fail('没有pageid')
      return
    }
    this.pageId = parseInt(param.pageid)
    const theUrl = this.pageMap[this.pageId]
    const data = {}
//    this.getData(theUrl, data)
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
    onLoad () {
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
    },
    /**
     * 头部切换
     * @param obj
     */
    changeTab (obj) {
      console.log(obj)
      this.curHeadItem = obj.headItem
    },
    /**
     * 请求数据
     * @param url
     * @param data
     */
    getData (url, data) {
      postData(url, data).then((res) => {
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

</style>
