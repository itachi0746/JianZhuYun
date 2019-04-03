<template>
  <div class="message">
    <Header @sendHeight="handleHeight" :headerName="headerName"></Header>
    <div class="body" ref="body">
      <div class="message-list">
        <ul>
          <!--<li class="message-li">-->
            <!--<div class="msg-li-box van-hairline&#45;&#45;bottom">-->
              <!--<div class="msg-head"></div>-->
              <!--<div class="msg-data">-->
                <!--<div>黄举赫 查看了您</div>-->
                <!--<div>39位boss查看</div>-->
              <!--</div>-->
              <!--<div class="msg-time">-->
                <!--2019/3/21-->
              <!--</div>-->
            <!--</div>-->
          <!--</li>-->
        </ul>
      </div>
    </div>
    <Footer @sendHeight="handleHeight" :active="activeNum"></Footer>
  </div>
</template>

<script>
import myModule from '../../../common'
import Footer from '../../../component/Footer.vue'
import Header from '../../../component/Header.vue'

export default {
  name: 'message',
  data () {
    return {
      headerName: '消息',
      activeNum: 2,
      headerHeight: null,
      footerHeight: null
    }
  },
  components: {
    Footer,
    Header
  },
  mounted () {
    console.log(myModule)
  },
  methods: {
    /**
     * 处理header,footer的高度
     */
    handleHeight (height) {
//      console.log(height)
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
    overflow-y: auto;overflow-x: hidden;
    -webkit-overflow-scrolling: touch;/* 解决ios滑动不流畅问题 */
  }
  .message-li {
    /*display: flex;*/
    @include borderBox();
    padding: 15px 18px 0;
    @include font-size(15px);
    color: #999;
    background-color: #fff;
  }
  .msg-li-box {
    display: flex;
    padding-bottom: 13px;
  }
  .msg-head {
    margin-right: 16px;
    min-width: 47px;
    height: 47px;
    border-radius: 50%;
    background-color: #999;
  }
  .msg-data {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
  }
  .msg-data div:nth-child(1) {
    color: #333;
    @include font-size(18px);
  }
  .msg-time {
    max-width: 60px;
    @include font-size(14px);
  }
</style>
