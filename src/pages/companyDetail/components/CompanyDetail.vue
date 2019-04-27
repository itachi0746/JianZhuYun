<template>
  <div class="profile">
    <Header :back="true" @sendHeight="handleHeight" :headerName="headerName"></Header>
    <div class="body" ref="body">
      <div v-if="resData">
        <van-panel :title="resData.HRA0_ENT_NAME" :desc="resData.HRA0_ENT_ADDR_L1">
          <van-cell>
            <div class="note-title">公司简介</div>
            <div class="note">{{resData.HRA0_DESC}}</div>
            <div class="note-title">公司官网</div>
            <div class="note">{{resData.HRA0_WEB_URL}}</div>
          </van-cell>
        </van-panel>
        <van-panel class="mb20" title="工商信息">
          <van-cell v-for="(item,index) in detailData" :key="index" title-class="title-class" :title="item.key" :value="item.value" />
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
  data () {
    return {
      headerName: '公司详情',
      headerHeight: null,
      resData: null,
      id: null,
      dataMap: {
        HRA0_ENT_NAME: '公司全称',
        HRA0_ENT_LP: '企业法人',
        HRA0_ENT_RT: '注册时间',
        HRA0_ENT_RC: '注册资本'
//        SSA7_INDUSTRY: '所属行业',
//        SSA7_PROPERTY: '企业性质',
//        SSA7_REG_TYPE: '注册类型'
      },
      detailData: []
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
          forbidClick: false // 禁用背景点击
        })
        return
      }
      this.resData = res.ReturnData
      this.detailData = myModule.handleMapData(this.dataMap, this.resData)
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
  .note-title {
    @include font-size(22px);
    margin: 20px 0;
  }
</style>
