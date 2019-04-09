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
      pageMap: { // 不同页面对应的接口, 不同的文件夹id
        0: {url: '/EntService/MyResumes', foldId: 'RE0201'},
        1: {url: '/EntService/MyResumes', foldId: 'RE0202'},
        2: {url: '/EntService/MyResumes', foldId: 'RE0203'},
        3: {url: '/EntService/MyResumes', foldId: 'RE0204'},
        4: {url: '/EntService/MyResumes', foldId: 'RE0205'},
        5: {url: '/EntService/MyResumes', foldId: 'RE0206'}
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
      this.pageId = this.curHeadItem.id
      this.resData = null
      this.getData()
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
      this.getData()
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
     */
    getData () {
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      const theUrl = this.pageMap[this.pageId]['url']
      const foldId = this.pageMap[this.pageId]['foldId']
      const data = {Folder: foldId, PageIndex: this.PageIndex}
      postData(theUrl, data).then((res) => {
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
        this.$toast.clear()
        this.resData = this.resData === null ? res.ReturnData : this.resData.concat(res.ReturnData)
        this.PageCount = res.PageCount
        this.PageIndex = res.PageIndex
        this.loading = false
        this.formatTime()
      })
    },
    /**
     * 格式化时间
     */
    formatTime () {
      for (let obj of this.resData) {
        obj.RE01_CRT_TIME = myModule.handleTime(obj.RE01_CRT_TIME)
      }
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
