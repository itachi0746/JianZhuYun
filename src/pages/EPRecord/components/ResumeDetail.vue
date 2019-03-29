<template>
  <div class="handle">
    <Header @sendHeight="handleHeight" :headerName="headerName" :canBack="true"></Header>
    <div class="body" ref="body">
      <div class="header van-hairline--bottom">
        <van-row>
          <van-col span="20">
            <div class="data-name">名字</div>
            <div class="data-item-box">
              <div class="data-item">
                <div class="data-item-label">年龄</div>
                <van-tag class="theTag" plain text-color="#333333">30</van-tag>
              </div>
              <div class="data-item">
                <div class="data-item-label">籍贯</div>
                <van-tag class="theTag" plain text-color="#333333">广州</van-tag>
              </div>
              <div class="data-item">
                <div class="data-item-label">手机</div>
                <van-tag class="theTag" plain text-color="#333333">12345678911</van-tag>
              </div>
              <div class="data-item">
                <div class="data-item-label">身份证</div>
                <van-tag class="theTag" plain text-color="#333333">4331011995212014045</van-tag>
              </div>
            </div>
          </van-col>
          <van-col span="4">
            <div class="data-head"></div>
          </van-col>
        </van-row>
      </div>
      <div class="item-box van-hairline--bottom">
        <div class="title">工作经历
          <i class="blue-point"></i>
        </div>
        <div class="item-line item-line1">
          <span>广州某某有限公司</span>
          <span>2017.6-至今</span>
        </div>
        <div class="item-line item-line2">
          <span>UI设计·开发部</span>
        </div>
        <div class="item-line item-line3">
          <span>内容:官网设计、APP设计、官网设计、APP设计官网设计、APP设计、官网设计、APP设计</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myModule from '../../../common'
import Header from '../../../component/Header.vue'

export default {
  data () {
    return {
      headerName: '简历详情'
    }
  },

  components: {
    Header
  },

  computed: {},

  methods: {
    handleHeight (height) {
      this.headerHeight = height.headerHeight
      if (this.headerHeight) {
        const WH = myModule.getClientHeight()
        this.$refs.body.style.height = WH - this.headerHeight + 'px'
      }
    },
    clickBtn () {
      this.$router.push({name: 'ResumeDetail', params: {}})
    }
  },

  created () {},

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
    @include borderBox()
  }
  .header {
    padding-bottom: 20px;
  }
  .item-box {
    padding-top: 20px;
    padding-bottom: 20px;
    .title {
      color: #323233;
      padding: 5px 0;
      position: relative;
    }
    .blue-point {
      width: 6px;
      height: 6px;
      background-color: $mainColor;
      position: absolute;
      top: 12px;
      left: -10px;
      border-radius: 50%;
    }
  }
  .item-line {
    padding: 5px 0;
    @include font-size(14px);
    color: #666;
  }
  .item-line1 {
    display: flex;
    justify-content: space-between;
    span:nth-child(1) {
      font-weight: bold;
      @include font-size(18px)
    }
  }
  .item-line2 {
    @include font-size(16px)
  }
  .item-line3 {
    line-height: 22px;
  }
  .data-head {
    width: 53px;
    height: 53px;
    background-color: #999999;
    border-radius: 50%;
  }
  .data-name {
    color: #323233;
    font-weight: bold;
    @include font-size(18px)
  }
  .data-item-box {
    display: flex;
    margin-top: 5px;
    flex-wrap: wrap
  }
  .data-item-label {
    @include defaultFlex;
    margin-right: 5px;
  }
  .data-item {
    display: flex;
    @include font-size(14px);
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .theTag {
    @include font-size(14px);
    padding: 4px 20px;
  }
  .van-tag::after {
    border-color: #666;
  }
</style>
