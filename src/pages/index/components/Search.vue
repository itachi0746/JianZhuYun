<template>
  <div>
    <SearchItem @search="onSearch" @sendHeight="handleHeight"></SearchItem>
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
            <li class="job-li" v-for="(item,index) in resData" :key="index" @click="clickJob(item.RE13_ID)">
              <JobItem :jobData="item"></JobItem>
            </li>
          </ul>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import SearchItem from '../../../component/SearchItem.vue'
import JobItem from '../../../component/JobItem.vue'
import myModule from '../../../common'
import { postData } from '../../../common/server'

export default {
  data () {
    return {
      headerHeight: null,
      PageIndex: 1, // 记录当前第几页
      PageCount: null, // 总页数
      resData: null,
      loading: false,
      finished: false,
      isLoading: false,
      value: null
    }
  },

  components: {
    SearchItem,
    JobItem
  },

  computed: {},

  methods: {
    onSearch (value) {
      console.log(`搜索值: ${value}`)
      this.value = value
      this.getData()
    },
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
        PageIndex: this.PageIndex,
        CT_KEY_WORDS: this.value
      }
      postData('/ReService/SearchPosition', data).then((res) => {
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
        this.PageCount = res.PageCount
        this.PageIndex = res.PageIndex
        this.loading = false
        this.resData = this.resData === null ? res.ReturnData : this.resData.concat(res.ReturnData)
      })
    }
  },

  created () {},

  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .body {
    background-color: #F5F9FA;
    overflow-y: auto;overflow-x: hidden;
    -webkit-overflow-scrolling: touch; /* 解决ios滑动不流畅问题 */
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
      color: #000;
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
