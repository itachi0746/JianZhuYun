<template>
  <div>
    <Header @sendHeight="handleHeight" :headerName="headerName"></Header>
    <div class="body" ref="body">
      <div class="myOffer-list">
        <ul>
          <li class="myOffer-li">
            <div class="myOffer-li-box van-hairline--bottom">
              <div class="myOffer-head"></div>
              <div class="myOffer-data">
                <div>软通动力</div>
                <div>2019-3-25</div>
              </div>
              <div class="myOffer-time">
                <div class="myOffer-status">未签约</div>
                <van-icon class="" name="arrow" />
              </div>
            </div>
          </li>
          <li class="myOffer-li">
            <div class="myOffer-li-box van-hairline--bottom">
              <div class="myOffer-head"></div>
              <div class="myOffer-data">
                <div>软通动力</div>
                <div>2019-3-25</div>
              </div>
              <div class="myOffer-time">
                <div class="myOffer-status">未签约</div>
                <van-icon class="" name="arrow" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import myModule from '../../../common'
import Header from '../../../component/Header.vue'

export default {
  name: 'message',
  data () {
    return {
      headerName: '我的合同',
      headerHeight: null
    }
  },
  components: {
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
      this.headerHeight = height.headerHeight
      if (this.headerHeight) {
        const WH = myModule.getClientHeight()
        this.$refs.body.style.height = WH - this.headerHeight + 'px'
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
  }
  .myOffer-li {
    /*display: flex;*/
    @include borderBox();
    padding: 15px 18px 0;
    @include font-size(15px);
    color: #999;
    background-color: #fff;
  }
  .myOffer-li-box {
    display: flex;
    padding-bottom: 13px;
  }
  .myOffer-head {
    margin-right: 16px;
    min-width: 47px;
    height: 47px;
    border-radius: 5px;
    background-color: #999;
  }
  .myOffer-data {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
  }
  .myOffer-data div:nth-child(1) {
    color: #333;
    @include font-size(18px);
  }
  .myOffer-time {
    max-width: 90px;
    @include font-size(14px);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .myOffer-status {
    color: #F9514E;
    margin-right: 15px;
  }
</style>
