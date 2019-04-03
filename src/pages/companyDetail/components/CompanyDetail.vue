<template>
  <div class="profile">
    <Header :back="true" @sendHeight="handleHeight" :headerName="headerName"></Header>
    <div class="body" ref="body">
      <div v-if="resData">
        <van-panel :title="resData.HRA0_ENT_NAME" :desc="resData.HRA0_ENT_ADDR_L1">
          <van-cell>
            <div class="note">{{resData.HRA0_NOTE_1}}</div>
          </van-cell>
        </van-panel>
        <van-panel class="mb20" title="工商信息">
          <van-cell title-class="title-class" title="公司全称" :value="resData.HRA0_ENT_NAME" />
          <van-cell title-class="title-class" title="企业法人" :value="resData.HRA0_ENT_LP" />
          <van-cell title-class="title-class" title="注册时间" :value="resData.HRA0_ENT_RT" />
          <van-cell title-class="title-class" title="注册资本" :value="resData.HRA0_ENT_RC" />
        </van-panel>
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
      headerName: '公司详情',
      headerHeight: null,
      resData: null,
      id: null
    }
  },
  components: {
    Header
  },
  mounted () {
    console.log(myModule)
  },
  created () {
    const param = myModule.getUrlParams()
    this.id = param.id
    postData('/ReService/CompanyDetails', {id: this.id}).then((res) => {
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
      this.$refs.body.style.height = WH - this.headerHeight + 'px'
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
    @include font-size(16px)
  }
  .van-cell__title {
    @include font-size(22px)
  }
  .note {
    @include font-size(18px)
  }
  .mb20 {
    margin-bottom: 20px;
  }
  .title-class {
    @include font-size(16px)
  }
  .van-cell__label {
    @include font-size(16px)
  }
</style>
