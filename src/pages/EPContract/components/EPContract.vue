<template>
  <div class="profile">
    <Header :back="true" @sendHeight="handleHeight" :headerName="headerName" :search="false"></Header>
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
              <Item :item="item"></Item>
            </li>
          </ul>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Header from '../../../component/Header.vue'
import Item from './Item.vue'

export default {
  name: 'profile',
  data () {
    return {
      headerName: '合同签约',
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
    Header,
    Item
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
      postData('/EntService/MyContracts', data).then((res) => {
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
        for (let obj of this.resData) {
          obj.RE33_CRT_TIME = myModule.handleTime(obj.RE33_CRT_TIME)
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

</style>
