<template>
  <div class="handle">
    <Header @sendHeight="handleHeight" :headerName="headerName" :back="true"></Header>
    <div class="body" ref="body">
      <div v-if="resData">
        <ResumeItem2 :resData="resData" :isEdit="true" :isEnt="false"></ResumeItem2>
      </div>
    </div>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Header from '../../../component/Header.vue'
import UserHead from '../../../component/UserHead.vue'
import ResumeItem2 from '../../../component/ResumeItem2.vue'

export default {
  data () {
    return {
      headerName: '我的简历',
      id: null,
      resData: null
    }
  },

  components: {
    Header,
    UserHead,
    ResumeItem2
  },

  computed: {},

  methods: {
    handleHeight (height) {
      this.headerHeight = height.headerHeight
      if (this.headerHeight) {
        const WH = myModule.getClientHeight()
        this.$refs.body.style.height = WH - this.headerHeight + 'px'
      }
    }
  },

  created () {
    this.$toast.loading({
      mask: false,
      message: '加载中...',
      duration: 0,
      forbidClick: true // 禁用背景点击
    })
    const param = myModule.getUrlParams()
    this.id = param.id
    postData('/ReService/ResumeDetails', {id: this.id, RequireDetail: true}).then((res) => {
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
      this.resData = res.ReturnData
//      this.handleData()
    })
  },
  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .handle {
    @include font-size(16px);
    color: #666;
  }

  .body {
    padding: 15px 18px;
    @include borderBox();
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch; /* 解决ios滑动不流畅问题 */
  }

  .header {
    padding-bottom: 20px;
    display: flex;
  }

  .line {
    margin-bottom: 20px;
  }

  .header-data-box {
    position: relative;
    flex: 1;
    @include font-size(14px);
    color: #666666;
    .line1 {
      color: #333333;
      font-weight: bold;
      display: flex;
      align-items: flex-end;
      .call {
        @include font-size(13px);
        color: #999;
      }
      .name {
        @include font-size(20px);
        color: #333;
      }
    }
  }

  .icon-box {
    position: absolute;
    top: 0;
    right: 0;
    width: 17px;
    height: 17px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .logo-box {
    min-width: 55px;
    margin-right: 11px;
  }

  .logo-box-inner {
    width: 53px;
    height: 53px;
  }

  .line2 {
    width: 100%;
    margin-bottom: 0;
    /*height: 27px;*/
    /*display: flex;*/
    /*justify-content: space-between;*/
  }

  .line2-value {
    height: 27px;
    min-width: 67px;
    border: 1px solid #E5E5E5;
    padding: 0 16px;
    margin-left: 2px;
    box-sizing: border-box;
    @include defaultFlex;
    flex: 1;
  }

  .line2-item {
    display: flex;
    /*align-items: center;*/
    flex-wrap: wrap;
    .line2-item-box {
      margin-bottom: 10px;
    }
    .line2-item-box:nth-child(2n+1) {
      margin-right: 18px;
    }
    .line2-item-box:nth-last-child(1) {
      margin-right: 0;
      width: 100%;
    }
  }

  .line3 {
    margin-bottom: 0;
    .line2-value {
      padding: 0 25px;
      white-space: nowrap;
    }
  }

  .the-padding {
    padding: 0 25px;
  }

  .line2-item-box {
    display: flex;
  }

  .label {
    @include defaultFlex
  }

  .main-item-box {
    padding: 15px 0;
    @include font-size(15px);
    color: #999999;
  }

  .title {
    position: relative;
    display: flex;
    justify-content: space-between;
    color: $mainColor;
    align-items: center;
  }

  .title-icon {
    width: 8px;
    height: 8px;
    background-color: $mainColor;
    border-radius: 50%;
    /*position: absolute;*/
    /*left: 0px;*/
    /*top: 5px;*/
  }

  .label {
    white-space: nowrap;
  }

  .title-name {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333333;
    @include font-size(16px);
    span {
      padding-left: 6px;
    }
  }

  .empty-content {
    padding-top: 29px;
  }

  .main-content {
    padding-left: 14px;
    @include font-size(13px);
  }

  .content-edit {
    width: 17px;
    height: 17px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .content-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    @include font-size(16px);
  }

  .content-line {
    margin-top: 15px;
  }

  .the-content {
    @include font-size(15px);
    color: #666666;
  }

  .content-time {
    align-items: center;
    display: flex;
    color: #999999;
    @include font-size(13px);
  }

  .job-name {
    @include font-size(16px);
    color: #333333;
  }

  .salary {
    @include font-size(14px);
    color: #333333;
  }

  .the-tag {
    float: left;
    margin-right: 24px;
    margin-bottom: 10px;
    @include font-size(15px)
  }

  .clear-fix {
    @include clearfix()
  }

  .the-mb {
    margin-bottom: 25px;
    overflow: hidden;
    margin-top: 15px;
  }

  .the-content-item {
    margin-bottom: 30px;
  }
</style>
