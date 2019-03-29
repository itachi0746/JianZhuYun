<template>
  <div class="">
    <Header @sendHeight="handleHeight" :headerName="headerName"></Header>
    <div class="body" ref="body">
      <div class="job-header van-hairline--bottom">
        <van-row type="flex" align="center">
          <van-col span="20">
            <div class="job-name">职位名</div>
          </van-col>
          <van-col span="4">
            <div class="job-pay">8k-10k</div>
          </van-col>
        </van-row>
      </div>
      <div class="job-desc">
        <div class="job-desc-title">职位详情</div>
        <div class="job-desc-main">12222</div>
      </div>
    </div>
    <footer ref="footer" class="van-hairline--top">
      <van-button class="btn" type="info" size="large">投简历</van-button>
    </footer>
  </div>
</template>

<script>
import myModule from '../../../common'
import Header from '../../../component/Header.vue'

export default {
  name: '',
  data () {
    return {
      headerName: '职位详情',
      activeNum: 0,
      headerHeight: null,
      footerHeight: null
    }
  },
  components: {
    Header
  },
  mounted () {
    console.log(myModule)
//    this.$nextTick(() => {
//      this.footerHeight = this.$refs.footer.offsetHeight
//      console.log(this.footerHeight)
//      this.handleHeight({footerHeight: this.footerHeight})
//    })
    setTimeout(() => {
      this.footerHeight = this.$refs.footer.offsetHeight
      console.log(this.footerHeight)
      this.handleHeight({footerHeight: this.footerHeight})
    }, 300)
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
        this.$refs.body.style.height = WH - this.headerHeight - this.footerHeight + 'px'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .body {
    background-color: #F5F9FA;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;/* 解决ios滑动不流畅问题 */
    padding: 0 10px;
  }
  .btn {
    @include theBtnColor;
  }
  footer {
    @include font-size(16px);
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px;
    width: 100%;
    @include borderBox()
  }
  .job-desc {
  }
  .job-desc-title {
    @include font-size(16px);
    color: #333;
    font-weight: bold;
    padding: 10px 0;
  }
  .job-desc-main {
    color: #666;
    @include font-size(16px);
  }
  .job-header {
    @include font-size(16px);
    padding: 15px 0;
  }
  .job-pay {
    color: $mainColor;
  }
  .job-name {
    @include font-size(30px);
    color: #333;
    font-weight: bold;
  }
</style>
