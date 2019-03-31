<template>
  <div class="profile">
    <Header @sendHeight="handleHeight"></Header>
    <div class="body" ref="body">
      <div class="header">
        <van-row>
          <van-col span="12">
            <div class="user-data">
              <div class="user-name">名字</div>
              <div class="user-remarks">备注</div>
            </div>
          </van-col>
          <van-col span="12">
            <div class="user-head-box">
              <div class="user-head"></div>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="tab">
        <van-row>
          <van-col span="6">
            <div class="tab-cell">
              <div class="van-hairline--right">
                <div class="tab-cell-num">1</div>
                <div class="tab-cell-name">沟通过</div>
              </div>
            </div>
          </van-col>
          <van-col span="6">
            <div class="tab-cell">
              <div class="van-hairline--right">
                <div class="tab-cell-num">1</div>
                <div class="tab-cell-name">沟通过</div>
              </div>
            </div>
          </van-col>
          <van-col span="6">
            <div class="tab-cell">
              <div class="van-hairline--right">
                <div class="tab-cell-num">1</div>
                <div class="tab-cell-name">沟通过</div>
              </div>
            </div>
          </van-col>
          <van-col span="6">
            <div class="tab-cell">
              <div class="van-hairline--right">
                <div class="tab-cell-num">1</div>
                <div class="tab-cell-name">沟通过</div>
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="item-list">
        <van-cell v-for="(item, index) in items" :key="index" :title="item.name" icon="" is-link>
          <img class="cell-icon" :src="item.img" alt="">
        </van-cell>
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
  name: 'profile',
  data () {
    return {
      headerHeight: null,
      footerHeight: null,
      activeNum: 3,
      items: [
        {name: '我的简历', img: require('../assets/home_icon_jianli.png')},
        {name: '附件简历', img: require('../assets/home_icon_fujianjianli.png')},
        {name: '我的offer', img: require('../assets/home_icon_wodeoffer.png')},
        {name: '我的合同', img: require('../assets/home_icon_hetong.png')}
      ]
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
  .header {
    @include borderBox();
    @include font-size(30px);
    color: #ffffff;
    width: 100%;
    height: 150px;
    padding: 50px 30px 0;
    background-color: $mainColor;
  }
  .user-data {
    display: flex;
    flex-direction: column;
  }
  .user-remarks {
    @include font-size(16px)
  }
  .user-head-box {
    display: flex;
    flex-direction: row-reverse;
  }
  .user-head {
    width: 57px;
    height: 57px;
    border-radius: 50%;
    background-color: #999999;
  }
  .tab {
    @include font-size(16px);
    background-color: #fff;
  }
  .tab-cell {
    height: 58px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: #666;
    @include borderBox();
    padding: 5px 0;
  }
  .tab-cell-num {
    @include font-size(18px);
    color: #333;
  }
  .tab-cell-name {
    @include font-size(15px)
  }
  .body {
    background-color: #F5F9FA;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;/* 解决ios滑动不流畅问题 */
  }
  .item-list {
    margin-top: 10px;
  }
  .cell-icon {
    position: absolute;
    left: 13px;
    top: 13px;
    height: 0.4rem;
    min-width: 1em;
  }
</style>
